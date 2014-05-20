// ==UserScript==
// @name        iScript - 土巴兔
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @include     http://*.to8to.com/*
// ==/UserScript==

///////////////////////////////////////////////
//
// 放大图片
//
///////////////////////////////////////////////
var current_src = "";
var current_rate = 0;

function full_screen_show_img(e)
{
  //console.log(e.type);

  var x = document.getElementById( "show_img" );

  if ( x == null )
  {
     return;
  }
  
  var w = x.width;
  var h = x.height;
  var window_w = window.innerWidth;
  var window_h = window.innerHeight;

  // 记下最初的图片的比例
  if ( x.src != current_src )
  {
    current_src = x.src;
    current_rate = w / h;
  }

  if ( x.style.position != "absolute" || x.style.margin != "0px" || x.style.padding != "0px" )
  {
    x.style.position = "absolute";
    x.style.margin = "0px";
    x.style.padding = "0px";
    //console.log( "margin=%s, padding=%s, position=%s", x.style.margin, x.style.padding, x.style.position );
  }

  //console.log( "full_screen_show_img - w=%d, h=%d, window_w=%d, window_h=", w, h, window_w, window_h );

  if ( 0 == w || 0 == h ||  window_w == w || window_h == h )
  {
    var target_left = (window_w - w ) / 2 + 'px';
    var target_top = (window_h - h ) / 2 + "px";

    if ( x.style.left != target_left || x.style.top != target_top )
    {
      x.style.left = target_left;
      x.style.top = target_top;
    }

    return;
  }

  var rate = w / h;
  var window_rate = window_w / window_h;
  var new_w = 0;
  var new_h = 0;

  // 横向放大
  if ( window_rate < rate )
  {
    new_w = window_w;
    new_h = window_w / current_rate;
  }
  // 纵向放大
  else
  {
    new_w = window_h * current_rate;
    new_h = window_h;
  }

  x.style.width = new_w + "px";
  x.style.height = new_h + "px";
  x.style.left = (window_w - new_w ) / 2 + "px";
  x.style.top = (window_h - new_h ) / 2 + "px";
  x.width = new_w;
  x.height = new_h;
};

// 监听事件
function listen_events()
{
  if ( document.getElementById("show_img") == null )
  {
    return;
  }

  var dis = document.getElementById("dis");

  if ( null == dis )
  {
    return;
  }

  var window_type_list = [ "mousedown", "focus", "mouseup", "click", "beforescriptexecute", "afterscriptexecute", "load", "pageshow", "blur", "wheel", "beforeunload", "error", "pagehide", "keydown", "keypress", "resize", "keyup" ];
  for ( var i = 0; i < window_type_list.length; ++i )
  {
    window.addEventListener( window_type_list[i], full_screen_show_img, true );
    window.addEventListener( window_type_list[i], full_screen_show_img, false );
  }

  var document_type_list = ["mousedown", "focus", "mouseup", "click", "beforescriptexecute", "afterscriptexecute", "load", "readystatechange", "blur", "wheel", "keydown", "keypress", "keyup" ];
  for ( var i = 0; i < document_type_list.length; ++i )
  {
    document.addEventListener( document_type_list[i], full_screen_show_img, true );
    document.addEventListener( document_type_list[i], full_screen_show_img, false );
  }

  var dis_type_list = ["load", "wheel", "mousedown", "mouseup", "click"];
  for ( var i = 0; i < dis_type_list.length; ++i )
  {
    dis.addEventListener( dis_type_list[i], full_screen_show_img, true );
    dis.addEventListener( dis_type_list[i], full_screen_show_img, false );
  }
}

listen_events();

///////////////////////////////////////////////
//
// 打开列表 Ctrl/Shift + Left Mouse
//
///////////////////////////////////////////////
function open_all_links(e)
{
  //console.log( 'open_all_links - button=%d, ctrlKey=%d, shiftKey=%d', e.button, e.ctrlKey, e.shiftKey );

  if ( e.button != 0 )
  {
    return;
  }

  if ( !e.ctrlKey && !e.shiftKey )
  {
    return;
  }

  //console.log( "open_all_links - uRL: %s", document.URL );

  // http://xiaoguotu.to8to.com/list0-24.html
  if ( document.URL.search( "/list" ) == -1 )
  {
    return;
  }

  var x = document.getElementsByClassName( "cname" );

  for ( var i = 0; i < x.length; ++i)
  {
    var y = x[i].getElementsByTagName('a');

    if ( y[0].href )
    {
      window.open( y[0].href );
    }
  }
}

window.addEventListener("click", open_all_links, false);

///////////////////////////////////////////////
//
// 响应鼠标按下事件，如果是最后一张图片，则关闭窗口
//
///////////////////////////////////////////////
var is_close_window = false;

function update_is_close_window()
{
  var x = document.getElementById( "small_num" );

  if ( null == x )
  {
    return;
  }

  var info = x.innerHTML.split("/");

  if ( x.innerHTML.length < 3 || info.length != 2 )
  {
    return;
  }

  var cur = info[0];
  var total = info[1];

  if ( cur == total )
  {
    is_close_window = true;
  }
  else
  {
    is_close_window = false;
  }

  //console.log( 'update_is_close_window - innerHTML=%s, cur=%s, total=%s, is_close_window=%d', x.innerHTML, cur, total, is_close_window );
}

document.addEventListener( "load", update_is_close_window, true );

function close_window_on_click_or_wheel(e)
{
  //console.trace(e.type);

  if ( e.type == 'mousedown' && e.button == 2 ) // 右键单击 左0中1右2
  {
    return;
  }
  else if ( "wheel" == e.type && e.deltaY < 0 ) // scroll up
  {
    return;
  }

  if ( is_close_window == true )
  {
    window.opener = null;
    window.open('', '_self');
    window.close();
  }
}

window.addEventListener("mousedown", close_window_on_click_or_wheel, true);
window.addEventListener("wheel", close_window_on_click_or_wheel, true);
////////////////////////////////////////////////////////////////////////////
