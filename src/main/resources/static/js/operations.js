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
                let savedOperation = data.operation;
                let animals = data.animals;
                let vets = data.vets;

                // Add a new row to the table with the data returned from the server
                let newRow = $("<tr>").attr("id", "row_" + savedOperation.id);

                // Add input fields to the new row
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "name_" + savedOperation.id,
                    value: savedOperation.name,
                    class: "form-control",
                    required: true
                })));
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "datetimepicker_" + savedOperation.id,
                    value: savedOperation.operationDate,
                    class: "form-control ui-datepicker",
                    required: true
                })));

                // Add dropdowns for Animal, Vet, and Assistant to the new row
                newRow.append($("<td>").append($("<select>").attr({
                    id: "animal_" + savedOperation.id,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<select>").attr({
                    id: "vet_" + savedOperation.id,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<select>").attr({
                    id: "assistant_" + savedOperation.id,
                    class: "form-control"
                })));

                animals.forEach(function (animal) {
                    newRow.find("#animal_" + savedOperation.id).append(
                        $("<option>").attr({
                            value: animal.id,
                            selected: savedOperation.animal.id == animal.id
                        }).text(animal.name + ' ' + animal.kind)
                    );
                });

                vets.forEach(function (vet) {
                    newRow.find("#vet_" + savedOperation.id).append(
                        $("<option>").attr({
                            value: vet.id,
                            selected: savedOperation.vet.id == vet.id
                        }).text(vet.fullName + ' ' + vet.mainSpecialization)
                    );
                    newRow.find("#assistant_" + savedOperation.id).append(
                        $("<option>").attr({
                            value: vet.id,
                            selected: savedOperation.assistant.id == vet.id
                        }).text(vet.fullName + ' ' + vet.mainSpecialization)
                    );
                });

                newRow.append($("<td>").append($("<a>").attr({
                    href: "#",
                    class: "btn btn-success update",
                    "data-id": savedOperation.id
                }).text("Обновить")));
                newRow.append($("<td>").append($("<a>").attr({
                    href: "#",
                    class: "btn btn-danger delete",
                    "data-id": savedOperation.id
                }).text("Удалить")));

                $("tbody").append(newRow);
            },
            error: function (error) {
                let message_box = $("#message_box")
                message_box.text("");
                for(let key in error.responseJSON){
                    message_box.text(message_box.text() + " - " + error.responseJSON[key]);
                }
                message_box.css("color","red");
                message_box.css("font-size", "14pt");
            }
        });
        $("#addNewOperation")[0].reset();
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
                let message_box = $("#message_box");
                message_box.text("Запись успешно обновлена")
                message_box.css('color', 'green')
                message_box.css('font-size', '14pt')
            },
            error: function (error){
                let message_box = $("#message_box")
                message_box.text("");
                for(let key in error.responseJSON){
                    message_box.text(message_box.text() + " - " + error.responseJSON[key]);
                }
                message_box.css("color","red");
                message_box.css("font-size", "14pt");
            }
        });
    });
});
