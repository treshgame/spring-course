$(document).ready(function(){
   $("#addNewMedication").submit(function (event){
       event.preventDefault()
       $.ajax({
           url: "http://localhost:8080/medications/add",
           method: "post",
           contentType: 'application/json',
           data: JSON.stringify({
               name: $("#name").val(),
               supplier: {
                   id: $("#supplier").val()
               },
               amount: $("#amount").val()
           }),
           success: function (){
               console.log("Успех")
           },
           error: function (){
               console.log("Ошибка")
           }
       })
   });
    $(".delete").click(function (event) {
        event.preventDefault()
        let id = $(this).data("id");
        $.ajax({
            type: "delete",
            url: "http://localhost:8080/medications/delete/" + id,
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

        let medicationId = $(this).data("id");
        let name = $("#name_" + medicationId).val();
        let supplierId = $("#supplier_" + medicationId).val();
        let amount = $("#amount_" + medicationId).val();

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/medications/update",
            contentType: "application/json",
            data: JSON.stringify({
                id: medicationId,
                name: name,
                supplier: {id: supplierId},
                amount: amount
            }),
            success: function () {
                console.log("Medication updated successfully");
                // Здесь вы можете обновить таблицу или выполнить другие действия
            },
            error: function () {
                console.log("Error updating medication");
            }
        });
    });

});