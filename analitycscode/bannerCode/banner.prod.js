function ___getBanners(e){function t(e,t,n,a,i){document.getElementById(`${e}`).innerHTML=`<a href="${t}"><img id=${e+i} src="${n}" width="${a.width}" height="${a.height}"></a>`,document.getElementById(`${e+i}`).addEventListener("mouseup",function(){!function(e){let t=new XMLHttpRequest;const n=`https://gti525-analitycs.herokuapp.com/api/v1/banner/click/${e}`;t.open("POST",n,!0),t.setRequestHeader("x-access-token",___analyticsToken),t.setRequestHeader("Content-type","application/json;charset=UTF-8"),t.send()}(i)})}function n(n){let a=new XMLHttpRequest;const i=`https://gti525-analitycs.herokuapp.com/api/v1/banner/${n}/${e}`;a.open("GET",i,!0),a.onload=function(e){if(4===a.readyState&&200===a.status){const e=JSON.parse(a.responseText);t(e.bannerType,e.url,e.img,e.size,e.clientStatisticId)}},a.setRequestHeader("x-access-token",___analyticsToken),a.setRequestHeader("Content-type","application/json;charset=UTF-8"),a.send()}document.getElementById("mobile-analityc-banner")?n("mobile-analityc-banner"):(document.getElementById("horizontal-analytic-banner")&&n("horizontal-analytic-banner"),document.getElementById("vertical-analytic-banner")&&n("vertical-analytic-banner"))}