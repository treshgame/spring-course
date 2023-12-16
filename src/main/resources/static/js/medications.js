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
           success: function (data){
               let medication = data.medication
               let suppliers = data.suppliers

               let newRow = $("<tr>").attr("id", "row" + medication.id)
               newRow.append($("<td>").append($("<input>").attr({
                   type: "text",
                   id: "name_" + medication.id,
                   value: medication.name,
                   class: "form-control"
               })));
               newRow.append($("<td>").append($("<select>").attr({
                   id: "supplier" + medication.id,
                   class: "form-control"
               })));
               newRow.append($("<td>").append($("<input>").attr({
                   type: "text",
                   id: "amount_" + medication.id,
                   value: medication.amount,
                   class: "form-control"
               })));

               suppliers.forEach(function (supplier) {
                   newRow.find("#supplier" + medication.id).append(
                       $("<option>").attr({
                           value: supplier.id,
                           selected: medication.supplier.id == supplier.id
                       }).text(supplier.name )
                   );
               });

               newRow.append($("<td>").append($("<a>").attr({
                   href: "#",
                   class: "btn btn-success update",
                   "data-id": medication.id
               }).text("Обновить")));
               newRow.append($("<td>").append($("<a>").attr({
                   href: "#",
                   class: "btn btn-danger delete",
                   "data-id": medication.id
               }).text("Удалить")));
               $("tbody").append(newRow);
           },
           error: function (err){
               console.log(err)
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
                $("#row_" + id).hide()
            },
            error: function () {

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