$(document).ready(function () {
  let minDate = new Date();
  $("#depart").datepicker({
    showAnim: "drop",
    numberOfMonth: 1,
    minDate: minDate,
    dateFormat: "dd/mm/yy",
    onClose: function (selectedDate) {
      $("#return").datepicker("option", "minDate", selectedDate);
    },
  });

  $("#return").datepicker({
    showAnim: "drop",
    numberOfMonth: 1,
    minDate: minDate,
    dateFormat: "dd/mm/yy",
    onClose: function (selectedDate) {
      $("#depart").datepicker("option", "maxDate", selectedDate);
    },
  });
});

/* hides results div by default on page load */
function pageLoad() {
  $(".results").hide();
}

pageLoad();

/* on submit button click, hides pics and shows results instead */
$(function () {
  $("button").click(function () {
    $(".options").remove();
  });
  $("button").click(function () {
    $(".results").show();
  });
});
