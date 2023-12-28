$(document).ready(function(){
   $(".add").click(function (event){
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

               let newRow = $("<tr>").attr("id", "row_" + medication.id)
               newRow.append($("<td>").append($("<input>").attr({
                   type: "text",
                   id: "name_" + medication.id,
                   value: medication.name,
                   class: "form-control"
               })));
               newRow.append($("<td>").append($("<select>").attr({
                   id: "supplier_" + medication.id,
                   class: "form-control"
               })));
               newRow.append($("<td>").append($("<input>").attr({
                   type: "text",
                   id: "amount_" + medication.id,
                   value: medication.amount,
                   class: "form-control"
               })));

               suppliers.forEach(function (supplier) {
                   newRow.find("#supplier_" + medication.id).append(
                       $("<option>").attr({
                           value: supplier.id,
                           selected: medication.supplier.id == supplier.id
                       }).text(supplier.name )
                   );
               });

               newRow.append($("<td>").append($("<a>").attr({
                   class: "btn btn-success update",
                   "data-id": medication.id
               }).text("Обновить")));
               newRow.append($("<td>").append($("<a>").attr({
                   class: "btn btn-danger delete",
                   "data-id": medication.id
               }).text("Удалить")));
               $("tbody").append(newRow);
               $("#message_box").text("")
               $("#addNewMedication")[0].reset();
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

    $("#addAmountForm").submit(function (event){
        event.preventDefault()

        let medicationId = $("#medicationId").val()
        let newAmount = $("#newAmount").val()
        let data = JSON.stringify({
            medicationId: Number(medicationId),
            amount: newAmount
        })
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/medications/add/amount',
            contentType: "application/json",
            data: data,
            success: function (data) {
                $("#amount_" + medicationId).val(data.amount)
                $("#addAmountForm")[0].reset()
            },
            error: function (error) {
                let message_box = $("#message_box")
                message_box.text(error)
                message_box.css("color", "red")
                message_box.css("font-size", "14pt")
            }
        })
    });

    $("#showFromSupplier").submit(function (event) {
        event.preventDefault()
        let supplierId = $("#fromSupplier").val()
        let url
        if(supplierId == 0){
            url = "http://localhost:8080/medications/get"
        }else{
            url = "http://localhost:8080/medications/supplied_by/" + supplierId
        }

        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                console.log(data)
                var tbody = $("table tbody");
                tbody.empty();
                let suppliers = data.suppliers
                let data_iterate
                if(supplierId == 0){
                    let firstRow = $("<tr>")
                    firstRow.append($("<td>").append($("<input>").attr({
                        type: "text",
                        id: "name",
                        class: "form-control"
                    })));
                    firstRow.append($("<td>").append($("<select>").attr({
                        id: "supplier",
                        class: "form-control"
                    })));
                    firstRow.append($("<td>").append($("<input>").attr({
                        type: "number",
                        id: "amount",
                        class: "form-control"
                    })));

                    suppliers.forEach(function (supplier) {
                        firstRow.find("#supplier").append(
                            $("<option>").attr({
                                value: supplier.id
                            }).text(supplier.name )
                        );
                    });
                    firstRow.append($("<td>").append($("<input>").attr({
                        class: "btn btn-success add",
                        type: "submit",
                        value: "Добавить"
                    })))
                    $("tbody").append(firstRow);
                }
                data_iterate = data.medications
                for(var data_item in data_iterate){
                    let newRow = $("<tr>").attr("id", "row_" + data_iterate[data_item].id)
                    newRow.append($("<td>").append($("<input>").attr({
                        type: "text",
                        id: "name_" + data_iterate[data_item].id,
                        value: data_iterate[data_item].name,
                        class: "form-control"
                    })));
                    newRow.append($("<td>").append($("<select>").attr({
                        id: "supplier" + data_iterate[data_item].id,
                        class: "form-control"
                    })));
                    newRow.append($("<td>").append($("<input>").attr({
                        type: "text",
                        id: "amount_" + data_iterate[data_item].id,
                        value: data_iterate[data_item].amount,
                        class: "form-control"
                    })));

                    suppliers.forEach(function (supplier) {
                        newRow.find("#supplier" + data_iterate[data_item].id).append(
                            $("<option>").attr({
                                value: supplier.id,
                                selected: data_iterate[data_item].supplier.id == supplier.id
                            }).text(supplier.name )
                        );
                    });

                    newRow.append($("<td>").append($("<a>").attr({
                        class: "btn btn-success update",
                        "data-id": data_iterate[data_item].id
                    }).text("Обновить")));
                    newRow.append($("<td>").append($("<a>").attr({
                        class: "btn btn-danger delete",
                        "data-id": data_iterate[data_item].id
                    }).text("Удалить")));
                    $("tbody").append(newRow);
                    $("#message_box").text("")
                }
            },
            error: function (error) {
                let message_box = $("#message_box")
                message_box.text(error)
                message_box.css("color", "red")
                message_box.css("font-size", "14pt")
            }
        })
    })
});