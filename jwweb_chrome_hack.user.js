// ==UserScript==
// @name       JWWeb Chrome Hack
// @version    0.1
// @description  A hack for JWWeb of JSIE to support chrome browser
// @match     http://jw.jsie.edu.cn/jwweb/*
// @copyright  2014, Kai Ryu
// ==/UserScript==

var script = document.createElement('script');
script.type = "text/javascript";
script.innerHTML = ' \
    window.ToLink = function(Tcase) { \
        var vHref; var t; \
        var objSpan = eval(Tcase); \
        var objLast = lastModID; \
        var lastTag = lastModID.substring(1,2); \
        var thisTag = Tcase.getAttribute("tag"); \
         \
        if (objSpan.style.color == RGB_NONE || objSpan.getAttribute("value").length < 18) return false; \
        window.top.frames["frmHomeShow"].location.href = objSpan.getAttribute("value"); \
         \
        document.getElementById(objLast).style.color = RGB_LINK; \
        if (lastTag != thisTag) document.getElementById("bgM" + lastTag).background = "images/_m" + lastTag + "0.gif"; \
         \
        objSpan.style.color = RGB_CHECK; \
        document.getElementById("bgM" + thisTag).background = "images/_" + objSpan.id + ".gif"; \
        lastModID = objSpan.id; \
    }; \
    window.onLoad = function() { \
        var sPC=window.navigator.userAgent+window.navigator.cpuClass+window.navigator.appMinorVersion+" SN:NULL"; \
        try{document.all.pcInfo.value=sPC;}catch(err){} \
        try{document.all.UserID.focus();}catch(err){} \
        try{document.all.typeName.value=document.all.Sel_Type.options[document.all.Sel_Type.selectedIndex].text;}catch(err){} \
    } \
';
if (document.getElementsByTagName('head')[0]) {
    document.getElementsByTagName('head')[0].appendChild(script);
}
