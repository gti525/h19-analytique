$(function(){
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});

let ___analyticsToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";const storageKey="gti525userId";function setUserId(e){localStorage.setItem(storageKey,e)}function getUserId(){if("undefined"!=typeof Storage&&"undefined"!==localStorage.getItem(storageKey))return localStorage.getItem(storageKey)}function getAdvertisment(){getUserId();console.log("NOT IMPLEMENTED YET")}!function gti525Analyze(){const localUrl="https://gti525-analitycs.herokuapp.com/api/analytics/code",devUrl="https://gti525-analitycs.herokuapp.com/api/analytics/code";function getAnalyticsCode(e){var t=new XMLHttpRequest;return t.open("GET",localUrl,!1),t.setRequestHeader("x-access-token",e),t.send(null),t.responseText}const userId=getUserId();userId?getAdvertisment():(eval(getAnalyticsCode(___analyticsToken)),___startAnalytics())}();