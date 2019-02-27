$(function(){
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
    $('.super-select2').select2({
        width: '100%'
    });
});

let ___analyticsToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";
const storageKey = "gti525clientId";
document.addEventListener('DOMContentLoaded', 
function gti525Analyze(){
    const url ="http://localhost:3000/api/v1/analytics/code"
    function getAnalyticsCode(){
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, true ); // false for synchronous request
        xmlHttp.onload = function(e){
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                eval(xmlHttp.responseText);
                ___startAnalytics();
            }
        };
        xmlHttp.setRequestHeader('x-access-token', ___analyticsToken)
        xmlHttp.send();
    }

    // PROGRAM STARTS HERE.
    const clientId = getClientId();
    if (!clientId){
        getAnalyticsCode();
    }
    else{
        ___getAdvertisment(clientId);
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

function ___getAdvertisment(clientId){
    const url =`http://localhost:3000/api/v1/banners/code`
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, true ); // false for synchronous request
    xmlHttp.onload = function(e){
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            eval(xmlHttp.responseText);
            ___getBanners(clientId);
        }
    };
    xmlHttp.setRequestHeader('x-access-token', ___analyticsToken)
    xmlHttp.send();
}