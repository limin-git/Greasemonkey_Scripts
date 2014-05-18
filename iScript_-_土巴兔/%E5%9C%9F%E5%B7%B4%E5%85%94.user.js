// ==UserScript==
// @name        iScript - 土巴兔
// @grant       none
// @include     http://*.to8to.com/*
// ==/UserScript==

///////////////////////////////////////////////
//
// 放大图片
//
///////////////////////////////////////////////
window.full_screen_show_img = function(e)
{
  //console.log(e.type);

  var x = document.getElementById("show_img");

  if ( x == null )
  {
     return;
  }

  var w = x.width;
  var h = x.height;
  var window_w = window.innerWidth;
  var window_h = window.innerHeight;

  if (x.style.position != "absolute" || x.style.margin != "0px" || x.style.padding != "0px")
  {
    x.style.position = "absolute";
    x.style.margin = "0px 0px 0px 0px";
    x.style.padding = "0px 0px 0px 0px";
    //console.log( "margin=%s, padding=%s, position=%s", x.style.margin, x.style.padding, x.style.position );
  }

  //console.log( "full_screen_show_img - w=%d, h=%d, window_w=%d, window_h=", w, h, window_w, window_h );

  if ( 0 == w || 0 == h ||  window_w == w || window_h == h )
  {
    x.style.left = (window_w - w ) / 2 + "px";
    x.style.top = (window_h - h ) / 2 + "px";
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

  x.style.width =new_w + "px";
  x.style.height = new_h + "px";
  x.style.left = (window_w - new_w ) / 2 + "px";
  x.style.top = (window_h - new_h ) / 2 + "px";
  x.width = new_w;
  x.height = new_h;
};

( function()
 {   
   if ( document.getElementById("show_img") == null )
   {
      return;
   }

   var window_type_list = ["wheel", "devicemotion", "deviceorientation", "deviceproximity", "userproximity", "devicelight", "abort", "blur", "focus", "canplay", "canplaythrough", "change", "click", "contextmenu", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "input", "invalid", "keydown", "keypress", "keyup", "load", "loadeddata", "loadedmetadata", "loadstart", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "pause", "play", "playing", "progress", "ratechange", "reset", "scroll", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", "timeupdate", "volumechange", "waiting", "pointercancel", "pointerdown", "pointerup", "pointermove", "pointerout", "pointerover", "pointerenter", "pointerleave", "gotpointercapture", "lostpointercapture", "mozfullscreenchange", "mozfullscreenerror", "mozpointerlockchange", "mozpointerlockerror", "error", "afterprint", "beforeprint", "beforeunload", "hashchange", "languagechange", "message", "offline", "online", "pagehide", "pageshow", "popstate", "resize", "unload", "copy", "cut", "paste", "beforescriptexecute", "afterscriptexecute"];
   for ( var i = 0; i < window_type_list.length; ++i )
   {
     window.addEventListener( window_type_list[i], full_screen_show_img, true );
   }

   var document_type_list = ["readystatechange", "wheel", "copy", "cut", "paste", "beforescriptexecute", "afterscriptexecute", "abort", "blur", "focus", "canplay", "canplaythrough", "change", "click", "contextmenu", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "input", "invalid", "keydown", "keypress", "keyup", "load", "loadeddata", "loadedmetadata", "loadstart", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "pause", "play", "playing", "progress", "ratechange", "reset", "scroll", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", "timeupdate", "volumechange", "waiting", "mozfullscreenchange", "mozfullscreenerror", "mozpointerlockchange", "mozpointerlockerror", "error"];
   for ( var i = 0; i < document_type_list.length; ++i )
   {
     document.addEventListener( document_type_list[i], full_screen_show_img, true );
   }

   var dis = document.getElementById("dis");
   var div_type_list = ["copy", "cut", "paste", "abort", "blur", "focus", "canplay", "canplaythrough", "change", "click", "contextmenu", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "input", "invalid", "keydown", "keypress", "keyup", "load", "loadeddata", "loadedmetadata", "loadstart", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "pause", "play", "playing", "progress", "ratechange", "reset", "scroll", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", "timeupdate", "volumechange", "waiting", "mozfullscreenchange", "mozfullscreenerror", "mozpointerlockchange", "mozpointerlockerror", "error", "wheel"];
   for ( var i = 0; i < div_type_list.length; ++i )
   {
     dis.addEventListener( div_type_list[i], full_screen_show_img, true );
   }
 }
)();
///////////////////////////////////////////////
//
// 打开效果图列表 Ctrl/Shift + Left Mouse
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
    close_window();
  }
}

window.addEventListener("mousedown", close_window_on_click_or_wheel, true);
window.addEventListener("wheel", close_window_on_click_or_wheel, true);
////////////////////////////////////////////////////////////////////////////
