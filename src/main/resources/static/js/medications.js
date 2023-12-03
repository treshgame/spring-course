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
});