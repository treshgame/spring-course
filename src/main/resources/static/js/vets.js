$(document).ready(function () {
    $('#addVetForm').submit(function (event) {
        event.preventDefault();
        $('#addVetForm')[0].reset();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/vets/add',
            contentType: 'application/json',
            data: JSON.stringify({
                fullName: $('#fullName').val(),
                mainSpecialization: $('#mainSpecialization').val(),
                secondSpecialization: $('#secondSpecialization').val(),
                position: $("#position").val()
            }),
            success: function (data) {

            },
            error: function (xhr) {

            }
        });
    });
    $(".delete").click(function (event) {
        event.preventDefault()
        let id = $(this).data("id");
        $.ajax({
            type: "delete",
            url: "http://localhost:8080/vets/delete/" + id,
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

        let id = $(this).data("id");
        let fullName = $("#vetForm_" + id + " input[type='text']:nth-of-child(1)").val();
        let mainSpecialization = $("#vetForm_" + id + " input[type='text']:nth-of-child(2)").val();
        let secondSpecialization = $("#vetForm_" + id + " input[type='text']:nth-of-child(3)").val();
        let position = $("#vetForm_" + id + " input[type='text']:nth-of-child(4)").val();

        $.ajax({
            type: "put",
            url: "http://localhost:8080/vets/update",
            contentType: "application/json",
            data: JSON.stringify({
                id: id,
                fullName: fullName,
                mainSpecialization: mainSpecialization,
                secondSpecialization: secondSpecialization,
                position: position
            }),
            success: function () {
                console.log("Vet updated successfully");
            },
            error: function () {
                console.log("Error updating vet");
            }
        });
    });
});