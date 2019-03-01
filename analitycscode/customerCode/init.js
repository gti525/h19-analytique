
document.addEventListener('DOMContentLoaded',
    function gti525Analyze() {
        const ___analyticsToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";
        const url = "http://localhost:3000/api/v1/analytics/code"
        function getAnalyticsCode() {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, true); // false for synchronous request
            xmlHttp.onload = function (e) {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    Function(`return (${xmlHttp.responseText})`)()(___analyticsToken);
                }
            };
            xmlHttp.setRequestHeader('x-access-token', ___analyticsToken)
            xmlHttp.send();
        }

        // PROGRAM STARTS HERE.
        const clientId = getClientId();
        if (!clientId) {
            getAnalyticsCode();
        }
        else {
            ___getAdvertisment(clientId);
        }

        function getClientId() {
            const storageKeyClient = "gti525clientId";
            const storageKeyDate = "gti525date";
            if (typeof (Storage) !== "undefined" && localStorage.getItem(storageKeyClient) && localStorage.getItem(storageKeyDate)) {
                console.log(localStorage.getItem(storageKeyDate))
                const date = localStorage.getItem(storageKeyDate);
                console.log(date)
                if (new Date(date).getTime() < new Date().getTime())
                    return localStorage.getItem(storageKeyClient);
            }
            return undefined;
        }

        function ___getAdvertisment(clientId) {
            console.log('ici');
            const url = `http://localhost:3000/api/v1/banners/code`
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, true); // false for synchronous request
            xmlHttp.onload = function (e) {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    Function(`return (${xmlHttp.responseText})`)()(clientId, ___analyticsToken);
                }
            };
            xmlHttp.setRequestHeader('x-access-token', ___analyticsToken)
            xmlHttp.send();
        }

    }, false);
