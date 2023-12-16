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
                let procedure = data.procedure;
                let animals = data.animals;
                let vets = data.vets;
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

                newRow.append($("<td>").append($("<a>").attr({
                    href: "#",
                    class: "btn btn-success update",
                    "data-id": procedure.id
                }).text("Обновить")));
                newRow.append($("<td>").append($("<a>").attr({
                    href: "#",
                    class: "btn btn-danger delete",
                    "data-id": procedure.id
                }).text("Удалить")));

                $("tbody").append(newRow);
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
                $("#row_" + id).hide();
                console.log("Успех")
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
                vet: { id: vetId }
            }),
            success: function () {
                alert("Procedure updated successfully");
            },
            error: function () {
                alert("Error updating procedure");
            }
        });
    });
})