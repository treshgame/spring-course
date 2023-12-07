$(document).ready(function () {
    $("#date").datetimepicker()
    $("#addNewProcedure").submit(function (event) {
        event.preventDefault()

        $.ajax({
            type: "post",
            url: "http://localhost:8080/procedures/add",
            contentType: "application/json",
            data: JSON.stringify({
                name: $("#name").val(),
                procedureDate: $("#date").val(),
                animal: {
                    id: $("#animal").val()
                },
                vet: {
                    id: $("#vet").val()
                }
            }),
            success: function (data) {
                console.log("Успех: " + data)
            },
            error: function (error){
                console.log("Ошибка:" + error)
            }
        })
        $("#addNewProcedure")[0].reset();
    });
    $(".delete").click(function (event) {
        event.preventDefault()
        let id = $(this).data("id");
        $.ajax({
            type: "delete",
            url: "http://localhost:8080/procedures/delete/" + id,
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

        let procedureId = $(this).data("id");
        let name = $("#name_" + procedureId).val();
        let procedureDate = $("#date_" + procedureId).val();
        let animalId = $("#animal_" + procedureId).val();
        let vetId = $("#vet_" + procedureId).val();

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/procedures/update",
            contentType: "application/json",
            data: JSON.stringify({
                id: procedureId,
                name: name,
                procedureDate: procedureDate,
                animal: { id: animalId },
                vet: { id: vetId }
            }),
            success: function () {
                console.log("Procedure updated successfully");
            },
            error: function () {
                console.log("Error updating procedure");
            }
        });
    });
})