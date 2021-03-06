function startAnalytics(analyticsToken) {
    let clinetInfos = {};
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition,function(e){
            postClientInfos(analyticsToken);
        });
    }
    else  {
        postClientInfos(analyticsToken);
    }

    // In the callback function, it does all the logic
    function getPosition(position) {
        clinetInfos.location = position.coords.latitude + 'X' + position.coords.longitude;
        postClientInfos(analyticsToken);
    }
    function postClientInfos(token) {
        const url = "http://localhost:3000/api/v1/analytics/client"
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", url, true); // false for synchronous request
        xmlHttp.onload = function(e){
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                if(xmlHttp.responseText){
                    setclientId(xmlHttp.responseText);                
                    getAdvertisment(xmlHttp.responseText,analyticsToken);
                }
            }
        };
        xmlHttp.setRequestHeader('Content-type', "application/json;charset=UTF-8");
        xmlHttp.setRequestHeader('x-access-token', token);
        xmlHttp.send(JSON.stringify(clinetInfos));
    }

    function setclientId(clientId) {
        const storageKey = "gti525analytic";
        const expiration = new Date().getTime()+86400000;
        localStorage.setItem(storageKey, JSON.stringify({clientId,expiration}))
    }

    function getAdvertisment(clientId,___analyticsToken) {
        const url = `http://localhost:3000/api/v1/banners/code`
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, true); // false for synchronous request
        xmlHttp.onload = function (e) {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
              const func = Function(`return (${xmlHttp.responseText})`)()(clientId,___analyticsToken);
            }
        };
        xmlHttp.setRequestHeader('x-access-token', ___analyticsToken)
        xmlHttp.send();
    }
    
    clinetInfos.plugins = arrayToString(navigator.plugins, ".", 'name');
    
    clinetInfos.languages = arrayToString(window.navigator.languages, ".");
    
    clinetInfos.href = window.location.href;
    
    clinetInfos.host = window.location.host;
    
    clinetInfos.doNotTrack = typeof (Storage) !== "undefined";
    
    clinetInfos.platform = window.navigator.userAgent;
    
    //https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769
    clinetInfos.browser = (function getBrowserName() {
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
    clinetInfos.webglinfo = (function getVideoCardInfo() {
        let gl = document.createElement('canvas').getContext('webgl');
        if (!gl) {
            return {
                error: "no webgl",
            };
        }
        let debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "no_webgl";
    })()
    
    clinetInfos.screen = (function () {
        return (screen.height ? screen.height : -1) + '.' +
            (screen.width ? screen.width : -1) + '.' +
            (screen.colorDepth ? screen.colorDepth : -1);
    })();
    
    // https://jsfiddle.net/pitasato/dppqhtg3/1/
    clinetInfos.canvas = (function fingerprint() {
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
    
    
        let hash = 0;
        if (strng.length == 0) return 'nothing!';
        for (let i = 0; i < strng.length; i++) {
            let char = strng.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    })();
    
    /*UTILS */
    function arrayToString(array, separator, subValue) {
        let res = ""; // store the total no of plugin stored 
        for (let item of array) {
            res += (subValue ? item[subValue] : item) + separator;
        }
        return res.slice(0, -1);;
    }
}