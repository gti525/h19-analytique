$(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
    $('.super-select2').select2({
        width: '100%'
    });
    $('.data-grid').DataTable({
        "language": {
            "search": "Rechercher",
            "info": "Page _PAGE_ sur _PAGES_",
            "infoEmpty": "Aucune donnée disponible.",
            "lengthMenu": "Afficher _MENU_",
            "paginate": {
                "previous": "Précédent",
                "next": "Suivant"
            }
        }
    });
});

document.addEventListener("DOMContentLoaded",function(){const e="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";const t=function(){if("undefined"!=typeof Storage&&localStorage.getItem("gti525analytic")){const e=JSON.parse(localStorage.getItem("gti525analytic"));if(new Date(e.expiration).getTime()>(new Date).getTime())return e.clientId}return}();t?function(t){let n=new XMLHttpRequest;n.open("GET","http://localhost:3000/api/v1/banners/code",!0),n.onload=function(o){4===n.readyState&&200===n.status&&Function(`return (${n.responseText})`)()(t,e)},n.setRequestHeader("x-access-token",e),n.send()}(t):function(){let t=new XMLHttpRequest;t.open("GET","http://localhost:3000/api/v1/analytics/code",!0),t.onload=function(n){4===t.readyState&&200===t.status&&Function(`return (${t.responseText})`)()(e)},t.setRequestHeader("x-access-token",e),t.send()}()},!1);