// ==UserScript==
// @name        Test
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @include     *
// ==/UserScript==

////////////////////////////////////////////
//
// 在 FireBug 命令行窗口执行
// 获取事件列表
//
////////////////////////////////////////////
/*
(function(obj)
{
  clear();
  var x = keys(obj);
  var type_list = "";
  for (var i = 0; i < x.length; ++i)
  {
    if ( x[i].startsWith("on") )
    {
      type_list = type_list + '"' + x[i].substr(2) + '", ';
    }
  }
  console.log(type_list);
})(window);
*/
////////////////////////////////////////////
//
// listen_all_window_events
//
////////////////////////////////////////////
function listen_all_window_events(cap = true)
{
  var log_event = function(e)
  {
    console.log(e.type);
  }
  
  var window_type_list = ["wheel", "devicemotion", "deviceorientation", "deviceproximity", "userproximity", "devicelight", "abort", "blur", "focus", "canplay", "canplaythrough", "change", "click", "contextmenu", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "input", "invalid", "keydown", "keypress", "keyup", "load", "loadeddata", "loadedmetadata", "loadstart", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "pause", "play", "playing", "progress", "ratechange", "reset", "scroll", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", "timeupdate", "volumechange", "waiting", "pointercancel", "pointerdown", "pointerup", "pointermove", "pointerout", "pointerover", "pointerenter", "pointerleave", "gotpointercapture", "lostpointercapture", "mozfullscreenchange", "mozfullscreenerror", "mozpointerlockchange", "mozpointerlockerror", "error", "afterprint", "beforeprint", "beforeunload", "hashchange", "languagechange", "message", "offline", "online", "pagehide", "pageshow", "popstate", "resize", "unload", "copy", "cut", "paste", "beforescriptexecute", "afterscriptexecute"];
  for ( var i = 0; i < window_type_list.length; ++i )
  {
    window.addEventListener( window_type_list[i], log_event, cap );
  }
}

////////////////////////////////////////////
//
// listen_all_document_events
//
////////////////////////////////////////////
function listen_all_document_events(cap = true)
{
  var log_event = function(e)
  {
    console.log(e.type);
  }
  
  var document_type_list = ["readystatechange", "wheel", "copy", "cut", "paste", "beforescriptexecute", "afterscriptexecute", "abort", "blur", "focus", "canplay", "canplaythrough", "change", "click", "contextmenu", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "input", "invalid", "keydown", "keypress", "keyup", "load", "loadeddata", "loadedmetadata", "loadstart", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "pause", "play", "playing", "progress", "ratechange", "reset", "scroll", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", "timeupdate", "volumechange", "waiting", "mozfullscreenchange", "mozfullscreenerror", "mozpointerlockchange", "mozpointerlockerror", "error"];
  for ( var i = 0; i < document_type_list.length; ++i )
  {
    //console.log( document_type_list[i] );
    document.addEventListener( document_type_list[i], log_event, cap );
  }
}

//listen_all_window_events();
//listen_all_document_events();

////////////////////////////////////////////
//
// window_events
//
////////////////////////////////////////////
function window_events()
{
  var name = "window_events";
  
  console.log( name + ":" + GM_getValue(name) );
  
  window.save_window_events = function(e)
  {
    var value = GM_getValue( name, "" );

    if ( value.search( e.type ) == -1 )
    {
      value = value + ", " + e.type;
      GM_setValue( name, value );
      console.log( "%s: %s", name, value );
    }
  }
  
  var window_type_list = ["wheel", "devicemotion", "deviceorientation", "deviceproximity", "userproximity", "devicelight", "abort", "blur", "focus", "canplay", "canplaythrough", "change", "click", "contextmenu", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "input", "invalid", "keydown", "keypress", "keyup", "load", "loadeddata", "loadedmetadata", "loadstart", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "pause", "play", "playing", "progress", "ratechange", "reset", "scroll", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", "timeupdate", "volumechange", "waiting", "pointercancel", "pointerdown", "pointerup", "pointermove", "pointerout", "pointerover", "pointerenter", "pointerleave", "gotpointercapture", "lostpointercapture", "mozfullscreenchange", "mozfullscreenerror", "mozpointerlockchange", "mozpointerlockerror", "error", "afterprint", "beforeprint", "beforeunload", "hashchange", "languagechange", "message", "offline", "online", "pagehide", "pageshow", "popstate", "resize", "unload", "copy", "cut", "paste", "beforescriptexecute", "afterscriptexecute"];
  for ( var i = 0; i < window_type_list.length; ++i )
  {
    window.addEventListener( window_type_list[i], save_window_events, true );
  }
}

//window_events();

////////////////////////////////////////////
//
// document_events
//
////////////////////////////////////////////
function document_events()
{
  var name = "document_events";
  
  console.log( name + ":" + GM_getValue(name) );
  
  window.save_document_events = function(e)
  {
    var value = GM_getValue( name, "" );

    if ( value.search( e.type ) == -1 )
    {
      value = value + ", " + e.type;
      GM_setValue( name, value );
      console.log( "%s: %s", name, value );
    }
  }

  var document_type_list = ["readystatechange", "wheel", "copy", "cut", "paste", "beforescriptexecute", "afterscriptexecute", "abort", "blur", "focus", "canplay", "canplaythrough", "change", "click", "contextmenu", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "input", "invalid", "keydown", "keypress", "keyup", "load", "loadeddata", "loadedmetadata", "loadstart", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "pause", "play", "playing", "progress", "ratechange", "reset", "scroll", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", "timeupdate", "volumechange", "waiting", "mozfullscreenchange", "mozfullscreenerror", "mozpointerlockchange", "mozpointerlockerror", "error"];
  for ( var i = 0; i < document_type_list.length; ++i )
  {
    document.addEventListener( document_type_list[i], save_document_events, true );
  }  
}

//document_events();

////////////////////////////////////////////
//
// list_GM_values
//
////////////////////////////////////////////
function list_GM_values()
{
  var values = GM_listValues();
  for ( var i = 0; i < values.length; ++i )
  {
    console.log( values[i] + ": " + GM_getValue( values[i] ) );
  }
}

//list_GM_values();

////////////////////////////////////////////
//
// delete_GM_values
//
////////////////////////////////////////////
function delete_GM_values()
{
  var values = GM_listValues();
  for ( var i = 0; i < values.length; ++i )
  {
    GM_deleteValue( values[i] );
  }
  console.assert( 0 == GM_listValues().length );
}

//delete_GM_values();

