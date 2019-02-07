let ___analyticsToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";
const storageKey = "gti525userId";
(function gti525Analyze(){
    const localUrl ="http://localhost:3000/api/analytics/code"
    const devUrl ="https://gti525-analitycs.herokuapp.com/api/analytics/code"
    
    function getAnalyticsCode(token){
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", localUrl, true ); // false for synchronous request
        xmlHttp.onload = function(e){
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                eval(xmlHttp.responseText);
                ___startAnalytics();
            }
        };
        xmlHttp.setRequestHeader('x-access-token', token)
        xmlHttp.send( null );
        return 
    }
   
    

    // PROGRAM STARTS HERE.
    const userId = getUserId();
    if (!userId){
        getAnalyticsCode(___analyticsToken);
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

