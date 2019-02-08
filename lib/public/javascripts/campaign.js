$(function(){
    $('#campaignGrid').DataTable();
    uploadBanner();
});

function uploadBanner() {
    var $uploadCrop;

    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.campaign-wrapper').addClass('ready');
                $uploadCrop.croppie('bind', {
                    url: e.target.result
                }).then(function(){
                    $uploadCrop.croppie('result', {
                        type: 'canvas',
                        size: 'viewport'
                    }).then(function (resp) {
                        $("input#banner64").val(resp);
                    });
                });
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    $uploadCrop = $('#banner-container').croppie({
        viewport: {
            width: 400,
            height: 200
        },
        enableExif: true
    });

    $('#upload').on('change', function () { readFile(this); });
}
