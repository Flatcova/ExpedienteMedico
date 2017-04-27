$('.datepicker').pickadate({
   selectMonths: true, // Creates a dropdown to control month
   selectYears: 15 // Creates a dropdown of 15 years to control year
 });
 $('.birthpicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: true // Creates a dropdown of 15 years to control year
  });
 $(document).ready(function(){
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
});
