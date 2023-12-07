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
            success: function (data, textStatus, xhr) {

            },
            error: function (xhr, textStatus, errorThrown) {

            }
        });
        $('#addOwnerForm')[0].reset()
    });
    $(".delete").click(function (event) {
        event.preventDefault()
        let id = $(this).data("id");
        $.ajax({
            type: "delete",
            url: "http://localhost:8080/owners/delete/" + id,
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
                console.log("Owner updated successfully");
                // Здесь вы можете обновить таблицу или выполнить другие действия
            },
            error: function () {
                console.log("Error updating owner");
            }
        });
    });
});