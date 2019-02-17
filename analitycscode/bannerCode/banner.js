
function ___getBanners(clientId){
    function setImageToBanner(bannerType,url,img,size,bannerId){
        document.getElementById(`${bannerType}`).innerHTML = `<a href="${url}"><img id=${bannerType+bannerId} src="${img}" width="${size.width}" height="${size.height}"></a>`
        document.getElementById(`${bannerType+bannerId}`).addEventListener("mouseup", function(){
            bannerClick(clientId,bannerId);
        });
    }
    // Pour les banners
    function getBanner(bannerType){
        let xmlHttp = new XMLHttpRequest();
        const url =`http://localhost:3000/api/v1/banner/${bannerType}/${clientId}`
        xmlHttp.open( "GET", url, true );
        xmlHttp.onload = function(e){
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                const imgData = JSON.parse(xmlHttp.responseText);
                setImageToBanner(imgData.bannerType,imgData.url,imgData.img,imgData.size,imgData.bannerId);
            }
        };
        xmlHttp.setRequestHeader('x-access-token', ___analyticsToken)
        xmlHttp.setRequestHeader('Content-type', "application/json;charset=UTF-8");
        xmlHttp.send();
    }
    // Pour les clics
    function bannerClick(clientId,bannerId){
        let xmlHttp = new XMLHttpRequest();
        const url =`http://localhost:3000/api/v1/banner/click/${bannerId}/${clientId}`
        xmlHttp.open( "POST", url, true );
        xmlHttp.setRequestHeader('x-access-token', ___analyticsToken)
        xmlHttp.setRequestHeader('Content-type', "application/json;charset=UTF-8");
        xmlHttp.send();
    }
    if (document.getElementById("mobile-analityc-banner")){
        getBanner("mobile-analityc-banner")
        return;
    }
    if (document.getElementById("horizontal-analytic-banner")){
        getBanner("horizontal-analytic-banner")
    }
    if (document.getElementById("vertical-analytic-banner")){
        getBanner("vertical-analytic-banner")
    }
}