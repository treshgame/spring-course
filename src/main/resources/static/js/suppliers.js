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
    $(".update").click(function (event) {
        event.preventDefault();

        let supplierId = $(this).data("id");
        let name = $("#name_" + supplierId).val();
        let phoneNum = $("#phoneNum_" + supplierId).val();
        let email = $("#email_" + supplierId).val();

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/suppliers/update",
            contentType: "application/json",
            data: JSON.stringify({
                id: supplierId,
                name: name,
                phoneNum: phoneNum,
                email: email
            }),
            success: function () {
                console.log("Supplier updated successfully");
                // Здесь вы можете обновить таблицу или выполнить другие действия
            },
            error: function () {
                console.log("Error updating supplier");
            }
        });
    });
})