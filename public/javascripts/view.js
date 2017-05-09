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
   var client = algoliasearch('MEZ3TXMHN8', '89b9a2a470865ef255679c64161dcb34');
     var index = client.initIndex('test_ExpedienteMed');
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
    var Dismenorrea = document.getElementById('Dismenorrea_done');

    if(Dismenorrea.value.length == 0)
        Dismenorrea.value = "0";
    $('#Dispareunia').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Dispa_cant").show()
        }
        else{
        $("#Dispa_cant").hide()
        }
    });
    var Dispareunia = document.getElementById('Dispareunias_done');

    if(Dispareunia.value.length == 0)
        Dispareunia.value = "0";
    $('#Sangrado_Postcoito').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Sang_cant").show()
        }
        else{
        $("#Sang_cant").hide()
        }
    });
    var Sangrado = document.getElementById('Sangrado_done');
    if(Sangrado.value.length == 0)
        Sangrado.value = "0";
    $('#Micciones').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Micciones_cuant").show()
        }
        else{
        $("#Micciones_cuant").hide()
        }
    });
    var Micciones = document.getElementById('Micciones_done');
    if(Micciones.value.length == 0)
        Micciones.value = "0";
    $('#Nicturia').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Nicturia_cuant").show()
        }
        else{
        $("#Nicturia_cuant").hide()
        }
    });
    var Nicturia = document.getElementById('Nicturia_done');
    if(Nicturia.value.length == 0)
        Nicturia.value = "0";
    $('#Urgencia').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Urgencia_cuant").show()
        }
        else{
        $("#Urgencia_cuant").hide()
        }
    });
    var Urgencia = document.getElementById('Urgencia_done');
    if(Urgencia.value.length == 0)
        Urgencia.value = "0";
    $('#Inc_Urgencias').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Inc_Urgencias_cuant").show()
        }
        else{
        $("#Inc_Urgencias_cuant").hide()
        }
    });
    var Inc_Urgencias = document.getElementById('Inc_Urgencias_done');
    if(Inc_Urgencias.value.length == 0)
        Inc_Urgencias.value = "0";
    $('#Tenesmo').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Tenesmo_cuant").show()
        }
        else{
        $("#Tenesmo_cuant").hide()
        }
    });
    var Tenesmo = document.getElementById('Tenesmo_done');
    if(Tenesmo.value.length == 0)
        Tenesmo.value = "0";
    $('#IUE').on('change',function(){
        if( $(this).val()==="Si"){
        $("#IUE_cuant").show()
        }
        else{
        $("#IUE_cuant").hide()
        }
    });
    var IUE = document.getElementById('IUE_done');
    if(IUE.value.length == 0)
        IUE.value = "0";
    $('#Disuria').on('change',function(){
        if( $(this).val()==="Si"){
        $("#Disuria_cuant").show()
        }
        else{
        $("#Disuria_cuant").hide()
        }
    });
    var Disuria = document.getElementById('Disuria_done');
    if(Disuria.value.length == 0)
        Disuria.value = "0";
});
