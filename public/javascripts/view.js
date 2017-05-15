$('.datepicker').pickadate({
  min: true,
   selectMonths: true, // Creates a dropdown to control month
   selectYears: 5 // Creates a dropdown of 15 years to control year
 });
 $('.FUCpicker').pickadate({
   max: true,
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
 $('.birthpicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 40, // Creates a dropdown of 15 years to control year
    max: true
  });
 $(document).ready(function(){
   
   $('#date').change(function(){
    if ($('#date').val() == '' || null) {
       $('#date').addClass('invalid');
       $('#citar').prop( "disabled", true );
     } else {
       $('#date').removeClass('invalid');
       $('#citar').prop( "disabled", false );
     }
   });

   // API
   var id = $('#id').val();
   var client, index;

   fetch(`/doctor/getToken?id=${id}`)
   .then((token) => {
        return token.json();
   }).then(token => {
     client = algoliasearch('MEZ3TXMHN8', token.token);
     index = client.initIndex('test_ExpedienteMed');
     autocomplete('#search', { hint: false }, [
       {
         source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
         displayKey: 'informacion.nombre_completo',
         templates: {
           suggestion: function(suggestion) {
             return suggestion._highlightResult.informacion.nombre_completo.value;
           }
         }
       }
     ]).on('autocomplete:selected', function(event, suggestion, dataset) {
       window.location.href = '/doctor/'+suggestion._id;
     });
   });


     // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
     $('#nueva_cita').modal({
       dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '0', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
     });
     $('input.timepicker').timepicker({
        timeFormat: 'h:mm p',
        interval: 30,
        minTime: '8',
        maxTime: '8:00pm',
        defaultTime: '12',
        startTime: '8:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });
    $('.button-collapse').sideNav();
    $('select').material_select();
    function appendHijo() {
        var txt1 = "<p>Text.</p>";              // Create text with HTML
        $("body").append(txt1);     // Append new elements
    }
    $('#Dismenorrea').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Disme_cant").show()
        }
        else{
        $("#Disme_cant").hide()
        }
    });
    $('#Dispareunia').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Dispa_cant").show()
        }
        else{
        $("#Dispa_cant").hide()
        }
    });

    $('#Sangrado_Postcoito').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Sang_cant").show()
        }
        else{
        $("#Sang_cant").hide()
        }
    });

    $('#Micciones').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Micciones_cuant").show()
        }
        else{
        $("#Micciones_cuant").hide()
        }
    });

    $('#Nicturia').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Nicturia_cuant").show()
        }
        else{
        $("#Nicturia_cuant").hide()
        }
    });

    $('#Urgencia').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Urgencia_cuant").show()
        }
        else{
        $("#Urgencia_cuant").hide()
        }
    });

    $('#Inc_Urgencias').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Inc_Urgencias_cuant").show()
        }
        else{
        $("#Inc_Urgencias_cuant").hide()
        }
    });

    $('#Tenesmo').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Tenesmo_cuant").show()
        }
        else{
        $("#Tenesmo_cuant").hide()
        }
    });

    $('#IUE').on('change',function(){
        if( $(this).val()==="Si"){
        $("#IUE_cuant").show()
        }
        else{
        $("#IUE_cuant").hide()
        }
    });

    $('#Disuria').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Disuria_cuant").show()
        }
        else{
        $("#Disuria_cuant").hide()
        }
    });


        var Dismenorrea = document.getElementById('Dismenorrea_done');
        var Dispareunia = document.getElementById('Dispareunias_done');
        var Sangrado = document.getElementById('Sangrado_done');
        var Micciones = document.getElementById('Micciones_done');
        var Nicturia = document.getElementById('Nicturia_done');
        var Urgencia = document.getElementById('Urgencia_done');
        var Inc_Urgencias = document.getElementById('Inc_Urgencias_done');
        var Tenesmo = document.getElementById('Tenesmo_done');
        var IUE = document.getElementById('IUE_done');
        var Disuria = document.getElementById('Disuria_done');


        if(Dismenorrea.value.length == 0)
        Dismenorrea.value = "0";
        if(Dispareunia.value.length == 0)
        Dispareunia.value = "0";
        if(Sangrado.value.length == 0)
        Sangrado.value = "0";
        if(Micciones.value.length == 0)
        Micciones.value = "0";
        if(Nicturia.value.length == 0)
        Nicturia.value = "0";
        if(Urgencia.value.length == 0)
        Urgencia.value = "0";
        if(Inc_Urgencias.value.length == 0)
        Inc_Urgencias.value = "0";
        if(Tenesmo.value.length == 0)
        Tenesmo.value = "0";
        if(IUE.value.length == 0)
        IUE.value = "0";
        if(Disuria.value.length == 0)
        Disuria.value = "0";
});
