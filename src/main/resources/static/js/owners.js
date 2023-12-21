$(document).ready(function () {
    console.log("It is working")
    $('#addOwnerForm').submit(function (event) {
        // Предотвращаем стандартное поведение формы (перезагрузка страницы)
        event.preventDefault();

        // Отправляем AJAX-запрос
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/owners/add',
            contentType: 'application/json',
            data: JSON.stringify({
                fullName: $('#fullName').val(),
                phoneNumber: $('#phoneNumber').val(),
                email: $('#email').val()
            }),
            success: function (data) {
                let newRow = $("<tr>").attr("id", "row" + data.id);

                // Add hidden input with owner ID
                newRow.append($("<input>").attr({
                    type: "hidden",
                    value: data.id
                }));

                // Add input fields for owner information
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "fullName_" + data.id,
                    value: data.fullName,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "phoneNumber_" + data.id,
                    value: data.phoneNumber,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "email_" + data.id,
                    value: data.email,
                    class: "form-control"
                })));

                // Add update and delete buttons
                newRow.append($("<td>").append($("<a>").attr({
                    href: "#",
                    class: "btn btn-success update",
                    "data-id": data.id
                }).text("Обновить")));
                newRow.append($("<td>").append($("<a>").attr({
                    href: "#",
                    class: "btn btn-danger delete",
                    "data-id": data.id
                }).text("Удалить")));

                // Append the new row to the table
                $("tbody").append(newRow);
                $('#addOwnerForm')[0].reset()
            },
            error: function (error) {
                let message_box = $("#message_box")
                message_box.text("");
                for(var key in error.responseJSON){
                    message_box.text(message_box.text() + " - " + error.responseJSON[key]);
                }
                message_box.css("color","red");
                message_box.css("font-size", "14pt");
            }
        });

    });
    $(".delete").click(function (event) {
        event.preventDefault()
        let id = $(this).data("id");
        $.ajax({
            type: "delete",
            url: "http://localhost:8080/owners/delete/" + id,
            contentType: "applications/json",
            success: function (){
                $("#row_" + id).hide();
            },
            error: function () {

            }
        })
    });

    $(".update").click(function (event) {
        event.preventDefault();

        let ownerId = $(this).data("id");
        let fullName = $("#fullName_" + ownerId).val();
        let phoneNumber = $("#phoneNumber_" + ownerId).val();
        let email = $("#email_" + ownerId).val();

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/owners/update",
            contentType: "application/json",
            data: JSON.stringify({
                id: ownerId,
                fullName: fullName,
                phoneNumber: phoneNumber,
                email: email
            }),
            success: function () {
                let message_box = $("#message_box");
                message_box.text("Запись успешно обновлена")
                message_box.css('color', 'green')
                message_box.css('font-size', '14pt')
            },
            error: function (error) {
                let message_box = $("#message_box")
                message_box.text("");
                for(var key in error.responseJSON){
                    message_box.text(message_box.text() + " - " + error.responseJSON[key]);
                }
                message_box.css("color","red");
                message_box.css("font-size", "14pt");
            }
        });
    });
});