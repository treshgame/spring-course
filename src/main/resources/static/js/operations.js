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
});
