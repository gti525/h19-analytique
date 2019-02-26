$(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
    $('.super-select2').select2({
        width: '100%'
    });
});

let ___analyticsToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";const storageKeyClient="gti525clientId",storageKeyDate="gti525date";function setclientId(t){localStorage.setItem(storageKeyClient,t);const e=new Date;localStorage.setItem(storageKeyDate,e.setHours(0,0,0,0))}function getClientId(){if("undefined"!=typeof Storage&&localStorage.getItem(storageKeyClient)&&localStorage.getItem(storageKeyDate)){console.log(localStorage.getItem(storageKeyDate));const t=localStorage.getItem(storageKeyDate);if(console.log(t),new Date(t).getTime()<(new Date).getTime())return localStorage.getItem(storageKeyClient)}}function ___getAdvertisment(clientId){const url="http://localhost:3000/api/v1/banners/code";let xmlHttp=new XMLHttpRequest;xmlHttp.open("GET",url,!0),xmlHttp.onload=function(e){4===xmlHttp.readyState&&200===xmlHttp.status&&(eval(xmlHttp.responseText),___getBanners(clientId))},xmlHttp.setRequestHeader("x-access-token",___analyticsToken),xmlHttp.send()}document.addEventListener("DOMContentLoaded",function gti525Analyze(){const url="http://localhost:3000/api/v1/analytics/code";function getAnalyticsCode(){let xmlHttp=new XMLHttpRequest;xmlHttp.open("GET",url,!0),xmlHttp.onload=function(e){4===xmlHttp.readyState&&200===xmlHttp.status&&(eval(xmlHttp.responseText),___startAnalytics())},xmlHttp.setRequestHeader("x-access-token",___analyticsToken),xmlHttp.send()}const clientId=getClientId();clientId?___getAdvertisment(clientId):getAnalyticsCode()},!1);