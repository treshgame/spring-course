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
                let assistants = data.assistants;

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

                // ... (Rest of the code to populate dropdowns)
                // Populate animal dropdown
                animals.forEach(function (animal) {
                    newRow.find("#animal_" + savedOperation.id).append(
                        $("<option>").attr({
                            value: animal.id,
                            selected: savedOperation.animal.id == animal.id
                        }).text(animal.name + ' ' + animal.kind)
                    );
                });

                // Populate vet dropdown
                vets.forEach(function (vet) {
                    newRow.find("#vet_" + savedOperation.id).append(
                        $("<option>").attr({
                            value: vet.id,
                            selected: savedOperation.vet.id == vet.id
                        }).text(vet.fullName + ' ' + vet.mainSpecialization)
                    );
                });

                // Populate assistant dropdown
                assistants.forEach(function (assistant) {
                    newRow.find("#assistant_" + savedOperation.id).append(
                        $("<option>").attr({
                            value: assistant.id,
                            selected: savedOperation.assistant.id == assistant.id
                        }).text(assistant.fullName + ' ' + assistant.mainSpecialization)
                    );
                });

                // Add update and delete buttons
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

                // Append the new row to the table
                $("tbody").append(newRow);
            },
            error: function (error) {
                console.log("Ошибка при добавлении операции: " + error.responseText);
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
                console.log("Operation updated successfully");
                // Здесь вы можете обновить таблицу или выполнить другие действия
            },
            error: function () {
                console.log("Error updating operation");
            }
        });
    });
});
