//show or hide account number field based on selected dropdown
$(document).ready(function(){
    $('#role_dropdown').on('change', function() {
        if ( $( this ).val() === 'Gestionnaire de site web')

        {
            $("#accountNumber").show();
            $("#accountId").prop('required',true);
        }
        else
        {
            $("#accountNumber").hide();
            $("#accountId").prop('required',false);
        }
    });
});