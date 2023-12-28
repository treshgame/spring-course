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
                },
                medication: {id: $("#medication").val()},
                amount: $("#amount").val()
            }),
            success: function (data) {
                let procedure = data.procedure;
                let animals = data.animals;
                let vets = data.vets;
                let medications = data.medications;

                let newRow = $("<tr>").attr("id", "row" + procedure.id);
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "name_" + procedure.id,
                    value: procedure.name,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<select>").attr({
                    id: "animal_" + procedure.id,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "date_" + procedure.id,
                    value: procedure.procedureDate,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<select>").attr({
                    id: "vet_" + procedure.id,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<select>").attr({
                    id: "medication_" + procedure.id,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<input>").attr({
                    type: "number",
                    id: "amount_" + procedure.id,
                    value: procedure.amount,
                    class: "form-control"
                })));
                vets.forEach(function (vet) {
                    newRow.find("#vet_" + procedure.id).append(
                        $("<option>").attr({
                            value: vet.id,
                            selected: procedure.vet.id == vet.id
                        }).text(vet.fullName)
                    );
                });
                animals.forEach(function (animal) {
                    newRow.find("#animal_" + procedure.id).append(
                        $("<option>").attr({
                            value: animal.id,
                            selected: procedure.animal.id == animal.id
                        }).text(animal.name + " " + animal.kind)
                    );
                });
                medications.forEach(function (medication) {
                    newRow.find("#medication_" + procedure.id).append(
                        $("<option>").attr({
                            value: medication.id,
                            selected: procedure.medication.id == medication.id
                        }).text('Лекарство ' + medication.name + ' от поставщика ' + medication.supplier.name)
                    );
                })
                
                newRow.append($("<td>").append($("<a>").attr({
                    class: "btn btn-success update",
                    "data-id": procedure.id
                }).text("Обновить")));
                newRow.append($("<td>").append($("<a>").attr({
                    class: "btn btn-danger delete",
                    "data-id": procedure.id
                }).text("Удалить")));

                $("tbody").append(newRow);
                $("#message_box").text("")
                $("#addNewProcedure")[0].reset();
            },
            error: function (error){
                let message_box = $("#message_box")
                message_box.text("");
                for(var key in error.responseJSON){
                    message_box.text(message_box.text() + " - " + error.responseJSON[key]);
                }
                message_box.css("color","red");
                message_box.css("font-size", "14pt");
            }
        })

    });
    $(".delete").click(function (event) {
        event.preventDefault()
        let id = $(this).data("id");
        $.ajax({
            type: "delete",
            url: "http://localhost:8080/procedures/delete/" + id,
            contentType: "applications/json",
            success: function (){
                $("#row_" + id).hide();
            },
            error: function () {
                alert("Ошибка")
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
                vet: { id: vetId },
                medication: {id: $("#medication_" + procedureId).val()},
                amount: $("#amount_" + procedureId).val()
            }),
            success: function () {
                let message_box = $("#message_box");
                message_box.text("Запись успешно обновлена")
                message_box.css('color', 'green')
                message_box.css('font-size', '14pt')
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
})