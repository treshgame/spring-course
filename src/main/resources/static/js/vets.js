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
        })
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/vets/add',
            contentType: 'application/json',
            data: data,
            success: function (data, code) {
                console.log(data, code)
                let newRow = $("<tr>").attr("id", "row_" + data.id);

                newRow.append($("<input>").attr({
                    type: "hidden",
                    value: data.id
                }));

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

                newRow.append($("<td>").append($("<input>").attr({
                    type: "submit",
                    value: "Обновить",
                    class: "btn btn-success update",
                    "data-id": data.id
                })));
                newRow.append($("<td>").append($("<a>").attr({
                    class: "btn btn-danger delete",
                    "data-id": data.id
                }).text("Удалить")));

                $("tbody").append(newRow);
                $('#addVetForm')[0].reset();

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
            url: "http://localhost:8080/vets/delete/" + id,
            contentType: "applications/json",
            success: function (){
                $("#row_" + id).hide();
                let message_box = $("#message_box")
                message_box.text("Запись успешно удалена");
                message_box.css("color","green");
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
        $.ajax({
            type: "put",
            url: "http://localhost:8080/vets/update",
            contentType: "application/json",
            data: data,
            success: function () {
                let message_box = $("#message_box")
                message_box.text("Запись успешно обновлена");
                message_box.css("color", "green")
                message_box.css("font-size", "16pt")

            },
            error: function (error) {
                let message_box = $("#message_box")
                message_box.text();
                for(var key in error.responseJSON){
                    message_box.text(message_box.text() + " - " + error.responseJSON[key]);
                }
                message_box.css("color","red");
                message_box.css("font-size", "14py");
            }
        });
    });
});