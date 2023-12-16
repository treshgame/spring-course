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
            success: function (data) {
                let savedSupplier = data;

                // Add a new row to the table with the data returned from the server
                let newRow = $("<tr>").attr("id", "row_" + savedSupplier.id);

                // Add input fields to the new row
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "name_" + savedSupplier.id,
                    value: savedSupplier.name,
                    class: "form-control",
                    required: true
                })));
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "phoneNum_" + savedSupplier.id,
                    value: savedSupplier.phoneNum,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<input>").attr({
                    type: "email",
                    id: "email_" + savedSupplier.id,
                    value: savedSupplier.email,
                    class: "form-control"
                })));

                // Add update and delete buttons
                newRow.append($("<td>").append($("<a>").attr({
                    href: "#",
                    class: "btn btn-success update",
                    "data-id": savedSupplier.id
                }).text("Обновить")));
                newRow.append($("<td>").append($("<a>").attr({
                    href: "#",
                    class: "btn btn-danger delete",
                    "data-id": savedSupplier.id
                }).text("Удалить")));

                // Append the new row to the table
                $("tbody").append(newRow);
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
            type: "DELETE",
            url: "http://localhost:8080/suppliers/delete/" + id,
            success: function (){
                $("#raw_" + id).hide();
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