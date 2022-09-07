////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// get selected location option and listen for change
$(document).ready(function(){
	$("select").change(function(){
		var myvalue = $(this).val();
		alert("You have selected : "+myvalue);  //comment this out - do something else with value grabbed e.g. put into maps to calc distance
	});
});

// get selected location option on button click
$(document).ready(function(){
	$("button").click(function(){
		var myvalue3 = $('select').find(':selected').val();
		alert("You have selected : "+myvalue3);  //comment this out - do something else with value grabbed e.g. put into maps to calc distance
	});
});


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// date picker function
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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// hide results div by default on page load
function pageLoad() {
  $(".results").hide();
}

pageLoad();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// on submit button click, hides pics and shows results instead
$(function () {
  $("button").click(function () {
    $(".options").remove();
  });
  $("button").click(function () {
    $(".results").show();
  });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/* map initialiser */
function initMap() {
    // map options
    let mapOptions = {
        zoom: 8,
        center: {lat: -36.8509, lng: 174.7645},
        mapTypeid: google.maps.MapTypeId.ROADMAP
    };

    // new map
    let map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // add marker
    let marker = new google.maps.Marker({
        position: {lat: -36.8509, lng: 174.7645},
        map: map
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// create directions serive object to use the route method and get result
var directionsService = new google.maps.DirectionsSercice();

// create a DirectionsRender object which we will use to display the route
var directionsRenderer = new google.maps.DirectionsRenderer();

// bind the directions render to the map
directionsRenderer.setMap(map);

// function
function calcRoute() {
    // create request
    let request = {
        origin: document.getElementById("#origin").value,
        destination: document.getElementById("#destination").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    // pass request to route method
    DirectionsService.route(request, (result, status) => {
        if (status == google.maps.DirectionsStatus.OK) {

            // get distance and time
            const output = document.querySelector("#output");
            output.innerHTML = "<div class='alert-info'> from: " + document.getElementById("#origin").value + " + .<br />To: " + document.getElementById("#destination").value + ". <br /> Driving distance:" + result.routes[0].legs[0].distance.text + ".<br />Duration: " + result.routes[0].legs[0].duration.text + ". </div>";

            // display route
            directionsDisplay.setDirections(result);
        } else {
            // delete route from map
            directionsDisplay.setDirections({ routes:[]});

            // center map back to starting point
            map.setCentre({lat: -36.8509, lng: 174.7645});

            // show error message
            output.innerHTML = "<div class='alert-danger'>Could not retrieve driving distance.</div>";
        }
    });
}

