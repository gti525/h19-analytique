$(function(){
    let ___analyticsToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";const storageKey="gti525userId";function setUserId(t){localStorage.setItem(storageKey,t)}function getUserId(){if("undefined"!=typeof Storage&&"undefined"!==localStorage.getItem(storageKey))return localStorage.getItem(storageKey)}function getAdvertisment(){getUserId();console.log("NOT IMPLEMENTED YET")}!function gti525Analyze(){const localUrl="http://localhost:3000/api/analytics/code",devUrl="https://gti525-analitycs.herokuapp.com/api/analytics/code";function getAnalyticsCode(token){let xmlHttp=new XMLHttpRequest;xmlHttp.open("GET",localUrl,!0),xmlHttp.onload=function(e){4===xmlHttp.readyState&&200===xmlHttp.status&&(eval(xmlHttp.responseText),___startAnalytics())},xmlHttp.setRequestHeader("x-access-token",token),xmlHttp.send(null)}const userId=getUserId();userId?getAdvertisment():getAnalyticsCode(___analyticsToken)}();
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});
