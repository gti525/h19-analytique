$(function(){
    $(".card-body").each(function() {
        uploadBanner($(this));
    });
});

function uploadBanner(card) {
    var container = card.find(".banner-container");

    function cropImage(){
        container.croppie('result', {
            type: 'base64'
        }).then(function (resp) {
            card.find('.banner64').val(resp)
        });
    }

    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                card.addClass('ready');
                container.croppie('bind', {
                    url: e.target.result
                }).then(function(){
                    cropImage();
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

    $('.crop-image', card).on('click', function() { cropImage(); });
    $('.file-upload', card).on('change', function() { readFile(this);});
    $('.upload-image', card).on('click', function () { $(this).prev().click(); });
}
