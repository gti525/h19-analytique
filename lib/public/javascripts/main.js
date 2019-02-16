$(function(){
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
    $('.super-select2').select2({
        width: '100%'
    });
});


let ___analyticsToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";const storageKey="gti525clientId";function setclientId(t){localStorage.setItem(storageKey,t)}function getClientId(){if("undefined"!=typeof Storage&&"undefined"!==localStorage.getItem(storageKey))return localStorage.getItem(storageKey)}function ___getAdvertisment(clientId){const url="http://localhost:3000/api/v1/banners/code";let xmlHttp=new XMLHttpRequest;xmlHttp.open("GET",url,!0),xmlHttp.onload=function(e){4===xmlHttp.readyState&&200===xmlHttp.status&&(eval(xmlHttp.responseText),___getBanners(clientId))},xmlHttp.setRequestHeader("x-access-token",___analyticsToken),xmlHttp.send(null)}document.addEventListener("DOMContentLoaded",function gti525Analyze(){const url="http://localhost:3000/api/v1/analytics/code";function getAnalyticsCode(){let xmlHttp=new XMLHttpRequest;xmlHttp.open("GET",url,!0),xmlHttp.onload=function(e){4===xmlHttp.readyState&&200===xmlHttp.status&&(eval(xmlHttp.responseText),___startAnalytics())},xmlHttp.setRequestHeader("x-access-token",___analyticsToken),xmlHttp.send(null)}const clientId=getClientId();clientId?___getAdvertisment(clientId):getAnalyticsCode()},!1);