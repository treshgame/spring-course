$(document).ready(function (){
    $("#addNewAnimal").submit(function (event){
        event.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/animals/add',
            contentType: 'application/json',
            data: JSON.stringify({
                name: $("#name").val(),
                kind: $("#kind").val(),
                breed: $("#breed").val(),
                age: $("#age").val(),
                owner: {
                    id: $("#owner").val()
                },
                attendingVet: {
                    id: $("#vet").val()
                }
            }),
            success: function (data) {
                // Access Animal, Owners, and Vets from the response
                let savedAnimal = data.animal;
                let owners = data.owners;
                let vets = data.vets;

                // Add a new row to the table with the data returned from the server
                let newRow = $("<tr>").attr("id", "row" + savedAnimal.id);

                newRow.append($("<input>").attr({
                    type: "text",
                    value: savedAnimal.id,
                    hidden: true
                }));

                // Add input fields for animal information
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "animal_name_" + savedAnimal.id,
                    value: savedAnimal.name,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "animal_kind_" + savedAnimal.id,
                    value: savedAnimal.kind,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<input>").attr({
                    type: "text",
                    id: "animal_breed_" + savedAnimal.id,
                    value: savedAnimal.breed,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<input>").attr({
                    type: "number",
                    id: "animal_age_" + savedAnimal.id,
                    value: savedAnimal.age,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<select>").attr({
                    id: "animal_owner_" + savedAnimal.id,
                    class: "form-control"
                })));
                newRow.append($("<td>").append($("<select>").attr({
                    id: "animal_vet_" + savedAnimal.id,
                    class: "form-control"
                })));

                // Populate owner dropdown
                owners.forEach(function (owner) {
                    newRow.find("#animal_owner_" + savedAnimal.id).append(
                        $("<option>").attr({
                            value: owner.id,
                            selected: savedAnimal.owner.id == owner.id
                        }).text(owner.fullName)
                    );
                });

                // Populate vet dropdown
                vets.forEach(function (vet) {
                    newRow.find("#animal_vet_" + savedAnimal.id).append(
                        $("<option>").attr({
                            value: vet.id,
                            selected: savedAnimal.attendingVet.id == vet.id
                        }).text(vet.fullName)
                    );
                });

                // Add update and delete buttons
                newRow.append($("<td>").append($("<a>").attr({
                    href: "#",
                    class: "btn btn-success update",
                    "data-id": savedAnimal.id
                }).text("Обновить")));
                newRow.append($("<td>").append($("<a>").attr({
                    href: "#",
                    class: "btn btn-danger delete",
                    "data-id": savedAnimal.id
                }).text("Удалить")));

                // Append the new row to the table
                $("tbody").append(newRow);
                $("#addNewAnimal")[0].reset();
            },error: function (error){
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
            url: "http://localhost:8080/animals/delete/" + id,
            contentType: "application/json",
            success: function (){
                $("row_" + id).hide();
            },
            error: function () {
                alert("Произошла ошибка");
            }
        })
    });

    $(".update").click(function (event) {
        event.preventDefault();

        let id = $(this).data("id");
        let name = $("#animal_name_" + id).val();
        let kind = $("#animal_kind_" + id).val();
        let breed = $("#animal_breed_" + id).val();
        let age = $("#animal_age_" + id).val();
        let owner = $("#animal_owner_" + id).val();
        let vet = $("#animal_vet_" + id).val();

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/animals/update",
            contentType: "application/json",
            data: JSON.stringify({
                id: id,
                name: name,
                kind: kind,
                breed: breed,
                age: age,
                owner: {
                    id: owner
                },
                attendingVet: {
                    id: vet
                }
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