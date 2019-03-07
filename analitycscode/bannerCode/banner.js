
function getBanners(clientId,___analyticsToken){
    findHtml();
    history.pushState = function () {
        findHtml();
    };
    function setImageToBanner(bannerType,url,img,size,clientStatisticId){
        document.getElementById(`${bannerType}`).innerHTML = `<a href="${url}"><img id=${bannerType+clientStatisticId} src="${img}" width="${size.width}" height="${size.height}"></a>`
        document.getElementById(`${bannerType+clientStatisticId}`).addEventListener("mouseup", function(){
            bannerClick(clientStatisticId);
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
                setImageToBanner(imgData.bannerType,imgData.url,imgData.img,imgData.size,imgData.clientStatisticId);
            }
        };
        xmlHttp.setRequestHeader('x-access-token', ___analyticsToken)
        xmlHttp.setRequestHeader('Content-type', "application/json;charset=UTF-8");
        xmlHttp.send();
    }
    // Pour les clics
    function bannerClick(clientStatisticId){
        let xmlHttp = new XMLHttpRequest();
        const url =`http://localhost:3000/api/v1/banner/click/${clientStatisticId}`
        xmlHttp.open( "POST", url, true );
        xmlHttp.setRequestHeader('x-access-token', ___analyticsToken)
        xmlHttp.setRequestHeader('Content-type', "application/json;charset=UTF-8");
        xmlHttp.send();
    }
    function findHtml(){
        for (const bid of ["mobile-analityc-banner","horizontal-analytic-banner","vertical-analytic-banner"]){
            if (document.getElementById(bid)){
                getBanner(bid)
                if (bid === "mobile-analityc-banner"){
                    return;
                }
            }
        }
    }
}