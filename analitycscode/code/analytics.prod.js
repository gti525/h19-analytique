let ___infos={};function ___startAnalytics(){console.log("starting analytics in code"),navigator.geolocation?(console.log("got geo"),navigator.geolocation.getCurrentPosition(function(e){___infos.location=e.coords.latitude+"X"+e.coords.longitude,postUserInfos(___analyticsToken)})):(console.log("no geo"),postUserInfos(___analyticsToken))}function postUserInfos(e){console.log("posting pos geo");let n=new XMLHttpRequest;n.open("POST","https://gti525-analitycs.herokuapp.com/api/analytics/client",!0),n.onload=function(e){4===n.readyState&&200===n.status&&(console.log("got request"),n.responseText&&(console.log("setting id"),setUserId(n.responseText),getAdvertisment()))},n.setRequestHeader("x-access-token",e),n.setRequestHeader("Content-type","application/json;charset=UTF-8"),n.send(JSON.stringify(___infos))}function ___arrayToString(e,n,o){let t="";for(let i of e)t+=(o?i[o]:i)+n;return t.slice(0,-1)}___infos.plugins=___arrayToString(navigator.plugins,".","name"),___infos.languages=___arrayToString(window.navigator.languages,"."),___infos.href=window.location.href,___infos.host=window.location.host,___infos.doNotTrack="undefined"!=typeof Storage,___infos.platform=-1!=window.navigator.userAgent.indexOf("Windows NT 10.0")?"Windows 10":-1!=window.navigator.userAgent.indexOf("Windows NT 6.2")?"Windows 8":-1!=window.navigator.userAgent.indexOf("Windows NT 6.1")?"Windows 7":-1!=window.navigator.userAgent.indexOf("Windows NT 6.0")?"Windows Vista":-1!=window.navigator.userAgent.indexOf("Windows NT 5.1")?"Windows XP":-1!=window.navigator.userAgent.indexOf("Windows NT 5.0")?"Windows 2000":-1!=window.navigator.userAgent.indexOf("Mac")?"Mac/iOS":-1!=window.navigator.userAgent.indexOf("X11")?"UNIX":-1!=window.navigator.userAgent.indexOf("Linux")?"Linux":"Unkown",___infos.browser=window.opr&&opr.addons||window.opera||navigator.userAgent.indexOf(" OPR/")>=0?"Opera":"undefined"!=typeof InstallTrigger?"Firefox":/constructor/i.test(window.HTMLElement)||"[object SafariRemoteNotification]"===(!window.safari||"undefined"!=typeof safari&&safari.pushNotification).toString()?"Safari":document.documentMode?"Explorer 6-11":window.StyleMedia?"Edge":/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)?"Chrome":"Unknown",___infos.webglinfo=function(){let e=document.createElement("canvas").getContext("webgl");if(!e)return{error:"no webgl"};let n=e.getExtension("WEBGL_debug_renderer_info");return n?e.getParameter(n.UNMASKED_RENDERER_WEBGL):"no_webgl"}(),___infos.screen=(screen.height?screen.height:-1)+"."+(screen.width?screen.width:-1)+"."+(screen.colorDepth?screen.colorDepth:-1),___infos.canvas=function(){let e=document.createElement("canvas"),n=e.getContext("2d"),o="i9asdm..$#po((^@KbXrww!~cz";n.textBaseline="top",n.font="16px 'Arial'",n.textBaseline="alphabetic",n.rotate(.05),n.fillStyle="#f60",n.fillRect(125,1,62,20),n.fillStyle="#069",n.fillText(o,2,15),n.fillStyle="rgba(102, 200, 0, 0.7)",n.fillText(o,4,17),n.shadowBlur=10,n.shadowColor="blue",n.fillRect(-20,10,234,5);let t=e.toDataURL();var r=0;if(0==t.length)return"nothing!";for(i=0;i<t.length;i++)char=t.charCodeAt(i),r=(r<<5)-r+char,r&=r;return r}();