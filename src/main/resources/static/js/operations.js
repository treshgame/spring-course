// Инициализация datetimepicker
$('#datetimepicker').datetimepicker();
$(document).ready(function (){
    $("#addNewOperation").submit(function (event){
        event.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/operations/add',
            contentType: 'application/json',
            data: JSON.stringify({
                name: $("#name").val(),
                operationDate: $("#datetimepicker").val(),
                animal: {
                  id: $("#animal").val()
                },
                vet: {
                    id: $("#vet").val()
                },
                assistant: {
                    id: $("#assistant").val()
                }
            }),
            success: function (data) {
                console.log("Успех")
                console.log(data)
            },
            error: function (error) {
                console.log("Ошибка при добавлении операции: " + error.responseText);
            }
        });
    });
    $(".delete").click(function (event) {
        event.preventDefault()
        let id = $(this).data("id");
        $.ajax({
            type: "delete",
            url: "http://localhost:8080/operations/delete/" + id,
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

        let operationId = $(this).data("id");
        let name = $("#name_" + operationId).val();
        let operationDate = $("#datetimepicker_" + operationId).val();
        let animalId = $("#animal_" + operationId).val();
        let vetId = $("#vet_" + operationId).val();
        let assistantId = $("#assistant_" + operationId).val();

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/operations/update",
            contentType: "application/json",
            data: JSON.stringify({
                id: operationId,
                name: name,
                operationDate: operationDate,
                animal: { id: animalId },
                vet: { id: vetId },
                assistant: { id: assistantId }
            }),
            success: function () {
                console.log("Operation updated successfully");
                // Здесь вы можете обновить таблицу или выполнить другие действия
            },
            error: function () {
                console.log("Error updating operation");
            }
        });
    });
});
