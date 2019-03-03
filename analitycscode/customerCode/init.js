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
            const storageKey = "gti525analytic";
            if (typeof (Storage) !== "undefined" && localStorage.getItem(storageKey)) {
                const infos = JSON.parse(localStorage.getItem(storageKey));
                if (new Date(infos.expiration).getTime() < new Date().getTime())
                    return infos.clientId;
            }
            return undefined;
        }

        function ___getAdvertisment(clientId) {
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
