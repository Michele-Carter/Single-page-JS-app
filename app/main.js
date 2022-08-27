$(document).ready(function () {
    let minDate = new Date();
    $("#depart").datepicker ({
        showAnim: 'drop',
        numberOfMonth: 1,
        minDate: minDate,
        dateFormat: 'dd/mm/yy',
        onClose: function (selectedDate) {
            $('#return').datepicker("option", "minDate", selectedDate);
        }
    })

    $("#return").datepicker ({
        showAnim: 'drop',
        numberOfMonth: 1,
        minDate: minDate,
        dateFormat: 'dd/mm/yy',
        onClose: function (selectedDate) {
            $('#depart').datepicker("option", "maxDate", selectedDate);
        }
    })
})