let ___analyticsToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";
const storageKey = "gti525userId";
(function gti525Analyze(){
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
    const userId = getUserId();
    if (!userId){
        getAnalyticsCode(___analyticsToken);
    }
    else{
        getAdvertisment(userId);
    }
    
})();

// used by analytics.js
function setUserId(userId){
    localStorage.setItem(storageKey,userId)
}

function getUserId(){
    if(typeof(Storage) !== "undefined" && localStorage.getItem(storageKey) !== "undefined"){
         return localStorage.getItem(storageKey);
    }
    return undefined;
}

function getAdvertisment(userId){
    function getAdsId(){
        let banner = "";
        const mobile = document.getElementById("mobile-analityc-banner");
        const horizontal = document.getElementById("horizontal-analytic-banner");
        const vertical = document.getElementById("vertical-analytic-banner");
        if (mobile){
            getBanner("mobile-analityc-banner")
            return 
        }
        if (horizontal)
            getBanner("horizontal-analytic-banner")
        if (vertical)
            getBanner("vertical-analytic-banner")
    }
    const banners = getAdsId();
    if (!banners){
        console.log("NO VALID BANNERS IDS WERE FOUND - analytic script")
        return;
    }
    function getBanner(bannerId){
        let xmlHttp = new XMLHttpRequest();
        const url ="http://localhost:3000/api/analytics/banner"
        xmlHttp.open( "POST", url, true );
        xmlHttp.onload = function(e){
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                const imgData = JSON.parse(xmlHttp.responseText);
                setImageToBanner(imgData.bannerId,imgData.url,imgData.img,imgData.size);
            }
        };
        xmlHttp.setRequestHeader('x-access-token', ___analyticsToken)
        xmlHttp.setRequestHeader('Content-type', "application/json;charset=UTF-8");
        const body = JSON.stringify({bannerId,userId});
        xmlHttp.send(body);
    }
}

function setImageToBanner(id,url,img,size){
    document.getElementById(`${id}`).innerHTML = `<a href="${url}}"><img src="${img}" width="${size.width}" height="${size.height}"></a>`;
}