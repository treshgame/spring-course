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
                console.log(data);
            },error: function (data){
               console.log(data);
            }
        })
        $("#addNewAnimal")[0].reset();
    });
    $(".delete").click(function (event) {
        event.preventDefault()
        let id = $(this).data("id");
        $.ajax({
            type: "delete",
            url: "http://localhost:8080/animals/delete/" + id,
            contentType: "application/json",
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
                console.log("Animal updated successfully");
                // Здесь вы можете обновить таблицу или выполнить другие действия
            },
            error: function () {
                console.log("Error updating animal");
            }
        });
    });
})