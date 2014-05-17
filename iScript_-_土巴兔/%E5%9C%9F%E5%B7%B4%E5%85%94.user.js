// ==UserScript==
// @name        iScript - 土巴兔
// @grant       none
// @include     http://*.to8to.com/*
// ==/UserScript==

var TIMEOUT = 100;
var is_close_window = false;

///////////////////////////////////////////////
//
// 放大图片
//
///////////////////////////////////////////////
window.full_screen_show_img = function(e)
{
  console.log(e.type);
  //console.log( 'full_screen_show_img entered' );
  
  var x = document.getElementById("show_img");

  if ( x == null )
  {
     //console.log( "full_screen_show_img - x is null, URL=" + document.URL );
     //console.log( 'full_screen_show_img exited' );
     return;
  }

  var w = x.width;
  var h = x.height;
  var window_w = window.innerWidth;
  var window_h = window.innerHeight;
  
  //console.log( "full_screen_show_img - w=" + w + ', h=' + h + ', window_w=' + window_w + ', window_h=' + window_h );

  if ( 0 == w || 0 == h ||  w == window_w || h == window_h )
  {
    //window.setTimeout( "full_screen_show_img()", TIMEOUT );
    //console.log( "0 == w || 0 == h ||  w == window_w || h == window_h" );
    //console.log( 'full_screen_show_img exited' );
    return;
  }

  var rate = w / h;
  var window_rate = window_w / window_h;
  var new_w = window_w;
  var new_h = window_h;
  
  // 横向全屏
  if ( window_rate < rate )
  {
    new_h = h * (window_w / w);
  }
  // 纵向全屏
  else
  {
    new_w = w * (window_h / h);
  }
  
  x.style.position = "absolute";
  x.style.margin = "0px 0px 0px 0px";
  x.style.padding = "0px 0px 0px 0px";
  x.style.width = new_w + "px";
  x.style.height = new_h + "px";
  x.style.left = (window_w - new_w ) / 2 + "px";
  x.style.top = (window_h - new_h ) / 2 + "px";
  x.width = new_w;
  x.height = new_h;
  //console.log( 'full_screen_show_img - 全屏: width=' +  x.width + ', height=' + x.height ); 

  //window.setTimeout( "full_screen_show_img()", TIMEOUT );
  //console.log( 'full_screen_show_img exited' );
}

window.addEventListener( "resize", full_screen_show_img, true );
window.addEventListener( "load", full_screen_show_img, true );
window.addEventListener( "pageshow", full_screen_show_img, true );
window.addEventListener( "beforescriptexecute", full_screen_show_img, true );
window.addEventListener( "afterscriptexecute", full_screen_show_img, true );
window.addEventListener( "focus", full_screen_show_img, true );
window.addEventListener( "blur", full_screen_show_img, true );
document.addEventListener( "load", full_screen_show_img, true );
document.addEventListener( "beforescriptexecute", full_screen_show_img, true );
document.addEventListener( "afterscriptexecute", full_screen_show_img, true );
document.addEventListener( "readystatechange", full_screen_show_img, true );
document.addEventListener( "blur", full_screen_show_img, true );
///////////////////////////////////////////////
//
// 打开效果图列表 Ctrl/Shift + Left Mouse
//
///////////////////////////////////////////////
function open_all_links(e)
{
  console.log( 'open_all_links entered' );
  console.log( 'open_all_links - button=' + e.button + ', ctrlKey=' + e.ctrlKey + ', shiftKey=' + e.shiftKey );
  
  if ( e.button != 0 )
  {
    console.log( 'open_all_links exited' );
    return;
  }
  
  if ( !e.ctrlKey && !e.shiftKey )
  {
    console.log( 'open_all_links exited' );
    return;
  }
  
  // http://xiaoguotu.to8to.com/list0-24.html
  if ( document.URL.search( "/list" ) == -1 )
  {
    console.log( 'open_all_links - cannot find /list in uRL: ' + document.URL );
    console.log( 'open_all_links exited' );
    return;
  }
  
  console.log( 'open_all_links - uRL=' + document.URL );
  
  var x = document.getElementsByClassName( "cname" );
  
  for ( var i = 0; i < x.length; ++i)
  {
    var y = x[i].getElementsByTagName('a');

    if ( y[0].href )
    {
      console.log( 'open_all_links - opening link: ' + y[0].href );
      window.open( y[0].href );
      //var timeout = 100 * i;
      //console.log( 'open_all_links - opening link in ' + timeout + 'ms: ' + y[0].href );
      //window.setTimeout( "window.open('" + y[0].href + "')", timeout );
    }
  }
  
  console.log( 'open_all_links exited' );
}

window.addEventListener("click", open_all_links, false);
///////////////////////////////////////////////
//
// 关闭窗口
//
///////////////////////////////////////////////
function close_window()
{
  window.opener = null;
  window.open('', '_self');
  window.close();
}

///////////////////////////////////////////////
//
// 响应鼠标按下事件，如果是最后一张图片，则关闭窗口
//
///////////////////////////////////////////////
/*
浏览器 	实现方法 	事件属性 	向上滚动 	向下滚动
FireFox 	DOMMouseScroll 	detail 	-3 	3
非FireFox 	onmousewheel 	wheelDelta 	120 	-120

对于FireFox，这个变量是detail：滚轮向上滚动，detail=-3；向下滚动，detail=3。
*/
function close_window_on_last_page(e)
{
  //console.log('close_window_on_last_page entered');
  
  if ( e.type != 'load' ) // 处理 1/1 情况
  {
    if ( e.type == 'mousedown' && e.button == 2 ) // 左0中1右2
    {
      //console.log('close_window_on_last_page mousedown button=' + e.button);
      //console.log('close_window_on_last_page exited');
      return;
    }
    else if ( "DOMMouseScroll" == e.type && e.detail != 3 )
    {
      //console.log('close_window_on_last_page - DOMMouseScroll detail=' + e.detail);
      //console.log('close_window_on_last_page exited');
      return;
    }
  }

  if ( is_close_window == true )
  {
    //console.log( 'closing window...' );
    close_window();
  }
  
  var x = document.getElementById( "small_num" );
  
  if ( x == null )
  {
    //console.log('close_window_on_last_page - x is null');
    //console.log('close_window_on_last_page exited');
    return;
  }
  
  //console.log('close_window_on_last_page - x.innerHTML=' + x.innerHTML);
  
  var page_info = x.innerHTML.split('/');
  
  if ( x.innerHTML.length < 3 || page_info.length != 2 )
  {
    //console.log('close_window_on_last_page - not match format x/x' );
    //console.log('close_window_on_last_page exited');
    return;
  }
  
  var cur_page = page_info[0];
  var all_page = page_info[1];
  
  //console.log( 'close_window_on_last_page - cur_page=' + cur_page + ', all_page=' + all_page );
  
  if ( cur_page == all_page )
  {
    //console.log( 'close_window_on_last_page - last page, will close on next mousedown' );
    is_close_window = true;
  }
  else
  {
    is_close_window = false;
  }
  
  //console.log('close_window_on_last_page exited');
}

window.addEventListener("mousedown", close_window_on_last_page, false);
window.addEventListener("mousedown", close_window_on_last_page, false);
window.addEventListener("DOMMouseScroll", close_window_on_last_page, false);
////////////////////////////////////////////////////////////////////////////




