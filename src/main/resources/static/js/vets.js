$(document).ready(function () {
    $('#addVetForm').submit(function (event) {
        event.preventDefault();
        let fullName = $("#fullName").val();
        let mainSpecialization = $("#mainSpecialization").val();
        let secondSpecialization = $("#secondSpecialization").val();
        let position = $("#position").val();
        let data = JSON.stringify({
            fullName: fullName,
            mainSpecialization: mainSpecialization,
            secondSpecialization: secondSpecialization,
            position: position
        });
        console.log(data)
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/vets/add',
            contentType: 'application/json',
            data: JSON.stringify({
                fullName: fullName,
                mainSpecialization: mainSpecialization,
                secondSpecialization: secondSpecialization,
                position: position
            }),
            success: function (data) {
                // Add a new row to the table with the data returned from the server
                let newRow = $("<tr>").attr("id", "row_" + data.id);

                // Add hidden input with vet ID
                newRow.append($("<input>").attr({
                    type: "hidden",
                    value: data.id
                }));

                // Add input fields for vet information
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "vetFullName_" + data.id,
                    value: data.fullName,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "vetMainSpecialization_" + data.id,
                    value: data.mainSpecialization,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "vetSecondSpecialization_" + data.id,
                    value: data.secondSpecialization,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "vetPosition_" + data.id,
                    value: data.position,
                    class: "form-control"
                })));

                // Add update and delete buttons
                newRow.append($("<td>").append($("<input>").attr({
                    type: "submit",
                    value: "Обновить",
                    class: "btn btn-success update",
                    "data-id": data.id
                })));
                newRow.append($("<td>").append($("<a>").attr({
                    href: "#",
                    class: "btn btn-danger delete",
                    "data-id": data.id
                }).text("Удалить")));

                // Append the new row to the table
                $("tbody").append(newRow);
            },
            error: function (xhr) {
                alert("Произошла ошибка");
            }
        });
        $('#addVetForm')[0].reset();
    });
    $(".delete").click(function (event) {
        event.preventDefault()
        let id = $(this).data("id");
        $.ajax({
            type: "delete",
            url: "http://localhost:8080/vets/delete/" + id,
            contentType: "applications/json",
            success: function (){
                $("#row_" + id).hide();
            },
            error: function () {
                alert("Произошла ошибка");
            }
        })
    });
    $(".update").click(function (event) {
        event.preventDefault();

        let id = $(this).data("id");
        let fullName = $("#vetFullName_" + id).val();
        let mainSpecialization = $("#vetMainSpecialization_" + id).val();
        let secondSpecialization = $("#vetSecondSpecialization_" + id).val();
        let position = $("#vetPosition_" + id).val();

        let data = JSON.stringify({
            id: id,
            fullName: fullName,
            mainSpecialization: mainSpecialization,
            secondSpecialization: secondSpecialization,
            position: position
        });
        console.log(data)
        $.ajax({
            type: "put",
            url: "http://localhost:8080/vets/update",
            contentType: "application/json",
            data: data,
            success: function () {
                alert("Запись успешно обновленам")
            },
            error: function () {
                console.log("Error updating vet");
            }
        });
    });
});