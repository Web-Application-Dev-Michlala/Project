$(document).ready(function() {
  $('.datepicker').datepicker({
    weekdaysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    showMonthsShort: true
  });
});
/*
document.addEventListener('DOMContentLoaded', function() {
  console.log("new birthday:",body.newBirthday)
  const customDateInput = document.getElementById('newBirthday');
  const today = new Date().toISOString().split('T')[0];
  customDateInput.setAttribute('max', today);
});
*/document.addEventListener('DOMContentLoaded', function() {
  const customDateInput = document.getElementById('newBirthday');
  
  if (customDateInput) {
    const today = new Date().toISOString().split('T')[0];
    customDateInput.setAttribute('max', today);
    console.log("new birthday:", customDateInput);
  } else {
    console.log("newBirthday element not found");
  }
});
