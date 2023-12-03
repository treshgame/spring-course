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
});