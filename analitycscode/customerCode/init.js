let ___analyticsToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";
const storageKey = "gti525clientId";
document.addEventListener('DOMContentLoaded', 
function gti525Analyze(){
    const url ="http://localhost:3000/api/analytics/code"
    function getAnalyticsCode(token){
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, true ); // false for synchronous request
        xmlHttp.onload = function(e){
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                eval(xmlHttp.responseText);
                ___startAnalytics();
            }
        };
        xmlHttp.setRequestHeader('x-access-token', token)
        xmlHttp.send( null );
    }

    // PROGRAM STARTS HERE.
    const clientId = getClientId();
    if (!clientId){
        getAnalyticsCode(___analyticsToken);
    }
    else{
        getAdvertisment(clientId);
    }
    
},false);

// used by analytics.js
function setclientId(clientId){
    localStorage.setItem(storageKey,clientId)
}

function getClientId(){
    if(typeof(Storage) !== "undefined" && localStorage.getItem(storageKey) !== "undefined"){
         return localStorage.getItem(storageKey);
    }
    return undefined;
}

function getAdvertisment(clientId){
    function setImageToBanner(id,url,img,size,bannerId){
        document.getElementById(`${id}`).innerHTML = `<a href="${url}"><img src="${img}" width="${size.width}" height="${size.height}"></a>`;
        document.getElementById(`${id}`).setAttribute('bannerId',bannerId);
    }
    // Pour les banners
    function getBanner(bannerId){
        let xmlHttp = new XMLHttpRequest();
        const url ="http://localhost:3000/api/analytics/banner"
        xmlHttp.open( "POST", url, true );
        xmlHttp.onload = function(e){
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                const imgData = JSON.parse(xmlHttp.responseText);
                setImageToBanner(imgData.bannerId,imgData.url,imgData.img,imgData.size,imgData.id);
            }
        };
        xmlHttp.setRequestHeader('x-access-token', ___analyticsToken)
        xmlHttp.setRequestHeader('Content-type', "application/json;charset=UTF-8");
        const body = JSON.stringify({bannerId,clientId});
        xmlHttp.send(body);
    }
    // Pour les clics
    function bannerClick(clientId){
        let xmlHttp = new XMLHttpRequest();
        const url ="http://localhost:3000/api/analytics/banner/click/"
        xmlHttp.open( "POST", url, true );
        xmlHttp.setRequestHeader('x-access-token', ___analyticsToken)
        xmlHttp.setRequestHeader('Content-type', "application/json;charset=UTF-8");
        url+=document.getElementById(`${id}`).getAttribute('bannerId');
        const body = JSON.stringify({clientId});
        xmlHttp.send(body);
    }
    if (document.getElementById("mobile-analityc-banner")){
        getBanner("mobile-analityc-banner")
        document.getElementById("mobile-analytic-banner").addEventListener("mouseup", function(){
            bannerClick(clientId);
        });
        return;
    }
    if (document.getElementById("horizontal-analytic-banner")){
        getBanner("horizontal-analytic-banner")
        document.getElementById("horizontal-analytic-banner").addEventListener("mouseup", function(){
            bannerClick(clientId);
        });
    }
    if (document.getElementById("vertical-analytic-banner")){
        getBanner("vertical-analytic-banner")
        document.getElementById("vertical-analytic-banner").addEventListener("mouseup", function(){
            bannerClick(clientId);
        });
    }
}