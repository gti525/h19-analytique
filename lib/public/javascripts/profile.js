$(function(){
    $('#profileGrid').DataTable();

    var counter = 1;
    $(".add-url").on("click", function () {
        var newRow = $("<tr>");
        var cols = "";

        cols += '<td><input type="text" class="form-control" name="urls[' + counter + ']"/></td>';
        cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger"  value="Supprimer"></td>';
        newRow.append(cols);

        $("table#url-table").append(newRow);

        counter++;
    });

    $("table#url-table").on("click", ".ibtnDel", function () {
        $(this).closest("tr").remove();
        counter -= 1
    });
});