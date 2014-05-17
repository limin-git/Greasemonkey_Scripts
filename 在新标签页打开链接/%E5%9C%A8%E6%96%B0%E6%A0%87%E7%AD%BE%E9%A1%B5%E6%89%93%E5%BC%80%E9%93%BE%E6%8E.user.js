// ==UserScript==
// @name        iScript - 在新窗口打开链接
// @grant       none
// @include     *
// ==/UserScript==

/*****************************************
HTML <a> 标签的 target 属性
_blank 	在新窗口中打开被链接文档。
_self 	默认。在相同的框架中打开被链接文档。
_parent 	在父框架集中打开被链接文档。
_top 	在整个窗口中打开被链接文档。
framename 	在指定的框架中打开被链接文档。

超链接的 URL。可能的值：
    绝对 URL - 指向另一个站点（比如 href="http://www.example.com/index.htm"）
    相对 URL - 指向站点内的某个文件（href="index.htm"）
    锚 URL - 指向页面中的锚（href="#top"）
*****************************************/

function open_link_in_new_window(new_target = "_blank")
{  
  var links = document.getElementsByTagName('a');
  
  for (var i = 0; i < links.length; ++i)
  {    
    var a = links[i];
    
    if ( ! a.host )
    {
      continue;
    }

    // 如果是 '锚URL'， 即：其 href 属性以 '#' 打头，则不处理

    for ( var j = 0; j < a.attributes.length; ++j )
    {
      if ( a.attributes[j].name != 'href' )
      {
        continue;
      }

      if ( a.attributes[j].nodeValue[0] != '#' )
      {
        a.target = new_target;
        //console.log( 'limin - open in new window for url: ' + a.href );
      }
    }
  }
}

open_link_in_new_window();
