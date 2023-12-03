$(document).ready(function () {
    $("#addNewSupplier").submit(function (event) {
        event.preventDefault()
        $.ajax({
            type: "post",
            url: "http://localhost:8080/suppliers/add",
            contentType: 'application/json',
            data:JSON.stringify({
                name: $("#name").val(),
                phoneNum: $("#phoneNum").val(),
                email: $("#email").val()
            }),
            success: function () {
                console.log("Успех")
            },
            error: function () {
                console.log("Ошибка")
            }

        });
        $("#addNewSupplier")[0].reset();
    });
    $(".delete").click(function (event) {
        event.preventDefault()
        let id = $(this).data("id");
        $.ajax({
            type: "delete",
            url: "http://localhost:8080/suppliers/delete/" + id,
            contentType: "applications/json",
            success: function (){
                console.log("Успех")
            },
            error: function () {
                console.log("Ошибка")
            }
        })
    });
})