let ___infos = {};
function ___startAnalytics() {
    console.log("starting analytics in code")
    if (navigator.geolocation){
        // TODO utiliser ca a la place : https://ip-api.io/#!
        console.log("got geo")
        navigator.geolocation.getCurrentPosition(getPosition,function(e){
            console.log(e);
            postUserInfos(___analyticsToken);
        });
    }
    else  {
        console.log("no geo")
        postUserInfos(___analyticsToken);
    }

    // In the callback function, it does all the logic
    function getPosition(position) {
        ___infos.location = position.coords.latitude + 'X' + position.coords.longitude;
        postUserInfos(___analyticsToken);
    }
}

function postUserInfos(token) {
    console.log("posting pos geo")
    const url = "http://localhost:3000/api/analytics/client"
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true); // false for synchronous request
    xmlHttp.onload = function(e){
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            console.log("got request")
            if(xmlHttp.responseText){
                console.log("setting id")
                setUserId(xmlHttp.responseText);
                getAdvertisment();
            }
        }
    };
    xmlHttp.setRequestHeader('x-access-token', token);
    xmlHttp.setRequestHeader('Content-type', "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(___infos));
}

___infos.plugins = ___arrayToString(navigator.plugins, ".", 'name');

___infos.languages = ___arrayToString(window.navigator.languages, ".");

___infos.href = window.location.href;

___infos.host = window.location.host;

___infos.doNotTrack = typeof (Storage) !== "undefined";

___infos.platform = (function getOs(){
    if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) return "Windows 10";
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) return "Windows 8";
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) return "Windows 7";
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) return "Windows Vista";
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) return "Windows XP";
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) return "Windows 2000";
    if (window.navigator.userAgent.indexOf("Mac")            != -1) return "Mac/iOS";
    if (window.navigator.userAgent.indexOf("X11")            != -1) return "UNIX";
    if (window.navigator.userAgent.indexOf("Linux")          != -1) return "Linux";
    else return "Unkown";
})();

//https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769
___infos.browser = (function getBrowserName() {
    // Opera 8.0+
    if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0)
        return "Opera";

    // Firefox 1.0+
    if (typeof InstallTrigger !== 'undefined')
        return "Firefox";

    // Safari 3.0+ "[object HTMLElementConstructor]"
    if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)))
        return "Safari";

    // Internet Explorer 6-11
    if (/*@cc_on!@*/false || !!document.documentMode)
        return "Explorer 6-11";

    // Edge 20+
    if (!!window.StyleMedia)
        return "Edge";

    // Chrome 1 - 71
    if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor))
        return "Chrome";

    return "Unknown"
})();

// https://stackoverflow.com/questions/49267764/how-to-get-the-video-card-driver-name-using-javascript-browser-side
___infos.webglinfo = (function getVideoCardInfo() {
    let gl = document.createElement('canvas').getContext('webgl');
    if (!gl) {
        return {
            error: "no webgl",
        };
    }
    let debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "no_webgl";
})()

___infos.screen = (function () {
    return (screen.height ? screen.height : -1) + '.' +
        (screen.width ? screen.width : -1) + '.' +
        (screen.colorDepth ? screen.colorDepth : -1);
})();

// https://jsfiddle.net/pitasato/dppqhtg3/1/
___infos.canvas = (function fingerprint() {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let txt = 'i9asdm..$#po((^@KbXrww!~cz';
    ctx.textBaseline = "top";
    ctx.font = "16px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.rotate(.05);
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(102, 200, 0, 0.7)";
    ctx.fillText(txt, 4, 17);
    ctx.shadowBlur = 10;
    ctx.shadowColor = "blue";
    ctx.fillRect(-20, 10, 234, 5);
    let strng = canvas.toDataURL();


    var hash = 0;
    if (strng.length == 0) return 'nothing!';
    for (i = 0; i < strng.length; i++) {
        char = strng.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
})();

/*UTILS */
function ___arrayToString(array, separator, subValue) {
    let res = ""; // store the total no of plugin stored 
    for (let item of array) {
        res += (subValue ? item[subValue] : item) + separator;
    }
    return res.slice(0, -1);;
}