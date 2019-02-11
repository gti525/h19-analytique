$(function(){
    $('#campaignGrid').DataTable();
    $(".card-body").each(function() {
        uploadBanner($(this));
    });
});

function uploadBanner(card) {
    var container = card.find(".banner-container");
    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                card.addClass('ready');
                container.croppie('bind', {
                    url: e.target.result
                }).then(function(){
                    container.croppie('result', {
                        type: 'canvas',
                        size: 'viewport'
                    }).then(function (resp) {
                        card.find('.banner64').val(resp)
                    });
                });
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    var width, height, type;
    switch(container.data("type")){
        case 0:
            width = 400;
            height = 200;
            type = "rectangle";
            break;
        case 1:
            width = 200;
            height = 300;
            type = "rectangle";
            break;
        case 2:
            width = 200;
            height = 200;
            type = "circle";
    }

    container.croppie({
        viewport: {
            width: width,
            height: height,
            type: type
        },
        enableExif: true,
        showZoomer: false
    });

    if(container.data("image")){
        card.addClass('ready');
        container.croppie('bind', {
            zoom: 0,
            url: container.data("image")
        });
    }

    $('.upload-image', card).on('change', function () { readFile(this); });
}
