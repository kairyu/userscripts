// ==UserScript==
// @name       JWWeb Chrome Hack
// @version    0.2
// @description  A hack for JWWeb of JSIE to support chrome browser
// @match     http://jw.jsie.edu.cn/jwweb/*
// @copyright  2014, Kai Ryu
// ==/UserScript==

function patch_for_navigation() {
    window.ToLink = function(Tcase) {
        var vHref; var t;
        var objSpan = eval(Tcase);
        var objLast = lastModID;
        var lastTag = lastModID.substring(1,2);
        var thisTag = Tcase.getAttribute("tag");

        if (objSpan.style.color == RGB_NONE || objSpan.getAttribute("value").length < 18) return false;
        window.top.frames["frmHomeShow"].location.href = objSpan.getAttribute("value");

        document.getElementById(objLast).style.color = RGB_LINK;
        if (lastTag != thisTag) document.getElementById("bgM" + lastTag).background = "images/_m" + lastTag + "0.gif";

        objSpan.style.color = RGB_CHECK;
        document.getElementById("bgM" + thisTag).background = "images/_" + objSpan.id + ".gif";
        lastModID = objSpan.id;
    };
}

function patch_for_login() {
    window.ChkValue = function() {
        var vU = document.all.UID.innerText;
        vU = vU.substring(0,1) + vU.substring(2,3);
        var vcFlag = "YES";
        try{
            if (document.all.UserID.value == '') {
                alert('须录入' + vU + '！');
                document.all.UserID.focus();
                return false;
            }
            else if (document.all.PassWord.value == '') {
                alert('须录入密码！');
                document.all.PassWord.focus();
                return false;
            }
                else if (document.all.cCode.value=='' && vcFlag == "YES") {
                    alert('须录入验证码！');
                    document.all.cCode.focus();
                    return false;
                }
                else {
                    document.all.divLogNote.innerHTML='正在通过身份验证...请稍候!';
                    return true;
                }
        }
        catch(e) {
        }
    };
    window.SelType = function(obj) {
        var s = obj.options[obj.selectedIndex].getAttribute("usrID");
        document.all.UID.innerHTML = s;
        selTypeName();
    };
    window.openWinLog = function(theURL, w, h) {
        var Tform, retStr;
        eval("Tform='width=" + w + ",height=" + h + ",scrollbars=no,resizable=no'");
        pop = window.open(theURL, 'winKPT', Tform); //pop.moveTo(0,75);
        eval("Tform='dialogWidth:" + w + "px;dialogHeight:" + h + "px;status:no;scrollbars=no;help:no'");
        if (typeof(retStr) != 'undefined') alert(retStr);
    };
    window.showLay = function(divId) {
        var objDiv = eval(divId);
        if (objDiv.style.display == "none") {
            bjDiv.style.display = "";
        }
        else {
            objDiv.style.display = "none";
        }
    };
    (window.selTypeName = function() {
        document.all.typeName.value = document.all.Sel_Type.options[document.all.Sel_Type.selectedIndex].text;
    })();
    window.onload = function() {
        var sPC = window.navigator.userAgent + window.navigator.cpuClass + window.navigator.appMinorVersion + " SN:NULL";
        try {
            document.all.pcInfo.value = sPC;
        }
        catch (err) {
        }
        try {
            document.all.UserID.focus();
        }
        catch (err) {
        }
        try {
            document.all.typeName.value = document.all.Sel_Type.options[document.all.Sel_Type.selectedIndex].text;
        }
        catch (err) {
        }
    };
    window.openWinDialog = function(url, scr, w, h) {
        var Tform;
        eval("Tform='dialogWidth:" + w + "px;dialogHeight:" + h + "px;status:" + scr + ";scrollbars=no;help:no'");
        window.showModalDialog(url, 1, Tform);
    }
    window.openWin = function(theURL) {
        var Tform, w, h;
        try {
            w = window.screen.width - 10;
        }
        catch (e) {
        }
        try {
            h = window.screen.height - 30;
        }
        catch (e) {
        }
        try {
            eval("Tform='width=" + w + ",height=" + h + ",scrollbars=no,status=no,resizable=yes'");
            pop=parent.window.open(theURL, '', Tform);
            pop.moveTo(0, 0);
            parent.opener = null;
            parent.close();
        }
        catch (e) {
        }
    }
    window.changeValidateCode = function(Obj) {
        var dt = new Date();
        Obj.src = "../sys/ValidateCode.aspx?t=" + dt.getMilliseconds();
    }
}

// patch for navigation
if (window == window.parent) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.appendChild(document.createTextNode("(" + patch_for_navigation + ")()"));
    document.body.appendChild(script);
}

// patch for login
if (window != window.parent) {
    if (document.getElementById("Logon")) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.appendChild(document.createTextNode("(" + patch_for_login + ")()"));
        document.body.appendChild(script);
    }
}

// patch for post-login
if (window != window.parent) {
    if (document.getElementById("divLogNote")) {
        if (document.getElementById("divLogNote").childNodes[0].innerHTML == "正在加载权限数据...") {
            var script = document.createElement("script");
       		script.setAttribute("type", "text/javascript");
            script.appendChild(document.createTextNode('window.top.document.location.replace("../MAINFRM.aspx");'));
        	document.body.appendChild(script);
        }
    }
}
