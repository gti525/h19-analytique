let ___analyticsToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";
const storageKey = "gti525userId";
(function gti525Analyze(){
    console.log("staring the user script")
    const url ="http://localhost:3000/api/analytics/code"
    function getAnalyticsCode(token){
        console.log("creating xmlthttp request")
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, true ); // false for synchronous request
        xmlHttp.onload = function(e){
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                console.log("Code came in")
                eval(xmlHttp.responseText);
                console.log("Startinganalytics")
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
    const userId = getUserId();
    console.log("NOT IMPLEMENTED YET");
}

