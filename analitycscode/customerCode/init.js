let ___analyticsToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";
const storageKey = "gti525userId";
(function gti525Analyze(){
    const localUrl ="http://localhost:3000/api/analytics/code"
    const devUrl ="https://gti525-analitycs.herokuapp.com/api/analytics/code"
       
    function getAnalyticsCode(token){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", localUrl, false ); // false for synchronous request
        xmlHttp.setRequestHeader('x-access-token', token)
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
   
    

    // PROGRAM STARTS HERE.
    const userId = getUserId();
    if (!userId){
        eval(getAnalyticsCode(___analyticsToken));
        // from there, the code from analytics.js takes over
        ___startAnalytics();
    }
    else{
        getAdvertisment();
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
function getAdvertisment(){
    ___analyticsToken;
    const userId = getUserId();
    console.log("NOT IMPLEMENTED YET");
}

