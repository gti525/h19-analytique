let ___infos={};function ___startAnalytics(){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(e){___infos.location=e.coords.latitude+"X"+e.coords.longitude,postClientInfos(___analyticsToken)},function(e){postClientInfos(___analyticsToken)}):postClientInfos(___analyticsToken)}function postClientInfos(e){let t=new XMLHttpRequest;t.open("POST","https://gti525-analitycs.herokuapp.com/api/v1/analytics/client",!0),t.onload=function(e){4===t.readyState&&200===t.status&&t.responseText&&(setclientId(t.responseText),getAdvertisment(t.responseText))},t.setRequestHeader("x-access-token",e),t.send(JSON.stringify(___infos))}function ___arrayToString(e,t,n){let o="";for(let i of e)o+=(n?i[n]:i)+t;return o.slice(0,-1)}___infos.plugins=___arrayToString(navigator.plugins,".","name"),___infos.languages=___arrayToString(window.navigator.languages,"."),___infos.href=window.location.href,___infos.host=window.location.host,___infos.doNotTrack="undefined"!=typeof Storage,___infos.platform=window.navigator.userAgent,___infos.browser=window.opr&&opr.addons||window.opera||navigator.userAgent.indexOf(" OPR/")>=0?"Opera":"undefined"!=typeof InstallTrigger?"Firefox":/constructor/i.test(window.HTMLElement)||"[object SafariRemoteNotification]"===(!window.safari||"undefined"!=typeof safari&&safari.pushNotification).toString()?"Safari":document.documentMode?"Explorer 6-11":window.StyleMedia?"Edge":/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)?"Chrome":"Unknown",___infos.webglinfo=function(){let e=document.createElement("canvas").getContext("webgl");if(!e)return{error:"no webgl"};let t=e.getExtension("WEBGL_debug_renderer_info");return t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):"no_webgl"}(),___infos.screen=(screen.height?screen.height:-1)+"."+(screen.width?screen.width:-1)+"."+(screen.colorDepth?screen.colorDepth:-1),___infos.canvas=function(){let e=document.createElement("canvas"),t=e.getContext("2d"),n="i9asdm..$#po((^@KbXrww!~cz";t.textBaseline="top",t.font="16px 'Arial'",t.textBaseline="alphabetic",t.rotate(.05),t.fillStyle="#f60",t.fillRect(125,1,62,20),t.fillStyle="#069",t.fillText(n,2,15),t.fillStyle="rgba(102, 200, 0, 0.7)",t.fillText(n,4,17),t.shadowBlur=10,t.shadowColor="blue",t.fillRect(-20,10,234,5);let o=e.toDataURL();var r=0;if(0==o.length)return"nothing!";for(i=0;i<o.length;i++)char=o.charCodeAt(i),r=(r<<5)-r+char,r&=r;return r}();