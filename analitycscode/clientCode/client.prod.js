function ___startAnalytics(e){const t="gti525clientId",n="gti525date";let o={};function a(a){let r=new XMLHttpRequest;r.open("POST","https://gti525-analitycs.herokuapp.com/api/v1/analytics/client",!0),r.onload=function(o){4===r.readyState&&200===r.status&&r.responseText&&(function(e){localStorage.setItem(t,e);const o=new Date;localStorage.setItem(n,o.setHours(0,0,0,0))}(r.responseText),function(e,t){let n=new XMLHttpRequest;n.open("GET","https://gti525-analitycs.herokuapp.com/api/v1/banners/code",!0),n.onload=function(o){if(4===n.readyState&&200===n.status)Function(`return (${n.responseText})`)()(e,t)},n.setRequestHeader("x-access-token",t),n.send()}(r.responseText,e))},r.setRequestHeader("Content-type","application/json;charset=UTF-8"),r.setRequestHeader("x-access-token",a),r.send(JSON.stringify(o))}function r(e,t,n){let o="";for(let a of e)o+=(n?a[n]:a)+t;return o.slice(0,-1)}navigator.geolocation?navigator.geolocation.getCurrentPosition(function(t){o.location=t.coords.latitude+"X"+t.coords.longitude,a(e)},function(t){a(e)}):a(e),o.plugins=r(navigator.plugins,".","name"),o.languages=r(window.navigator.languages,"."),o.href=window.location.href,o.host=window.location.host,o.doNotTrack="undefined"!=typeof Storage,o.platform=window.navigator.userAgent,o.browser=window.opr&&opr.addons||window.opera||navigator.userAgent.indexOf(" OPR/")>=0?"Opera":"undefined"!=typeof InstallTrigger?"Firefox":/constructor/i.test(window.HTMLElement)||"[object SafariRemoteNotification]"===(!window.safari||"undefined"!=typeof safari&&safari.pushNotification).toString()?"Safari":document.documentMode?"Explorer 6-11":window.StyleMedia?"Edge":/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)?"Chrome":"Unknown",o.webglinfo=function(){let e=document.createElement("canvas").getContext("webgl");if(!e)return{error:"no webgl"};let t=e.getExtension("WEBGL_debug_renderer_info");return t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):"no_webgl"}(),o.screen=(screen.height?screen.height:-1)+"."+(screen.width?screen.width:-1)+"."+(screen.colorDepth?screen.colorDepth:-1),o.canvas=function(){let e=document.createElement("canvas"),t=e.getContext("2d"),n="i9asdm..$#po((^@KbXrww!~cz";t.textBaseline="top",t.font="16px 'Arial'",t.textBaseline="alphabetic",t.rotate(.05),t.fillStyle="#f60",t.fillRect(125,1,62,20),t.fillStyle="#069",t.fillText(n,2,15),t.fillStyle="rgba(102, 200, 0, 0.7)",t.fillText(n,4,17),t.shadowBlur=10,t.shadowColor="blue",t.fillRect(-20,10,234,5);let o=e.toDataURL(),a=0;if(0==o.length)return"nothing!";for(let e=0;e<o.length;e++){a=(a<<5)-a+o.charCodeAt(e),a&=a}return a}()}