////////////////////////////////////////////////////////////////////////////////
/////////////////////// Date Picker Function (jQuery) //////////////////////////
////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////
//////////////////////// Hide Ads/Show Results Div /////////////////////////////
////////////////////////////////////////////////////////////////////////////////

$(function () {
  $("button").click(function () {
    $(".options").remove();
  });
  $("button").click(function () {
    $("#results").show();
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////// Itinery Section /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* get values from location input fields when submit btn is clicked */
  function getLoc() {
    let startLoc = document.getElementById('location0').value;
    let finishLoc = document.getElementById('location1').value;
    // this works - the below line of code was just a test to make 
    // sure it was grabbing the values from the location input 
    // fields so I can do something with it when I get the Distance
    // Matrix API working
    document.getElementById('locResult').innerHTML = startLoc + " " + finishLoc;
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////  Google Maps  ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// create map 
let map;

// create directionsService;
let DirectionsRenderer;

// create directions service object
let directionsService;

// create render used to display services
let directionsDisplay;

// create autocomplete objects for all inputs
let options = {
    types: ['(cities)']
};
let input1 = document.getElementById("from");
let autocomplete1;
let input2 = document.getElementById("to");
let autocomplete2;

// create a function to initialise a new map with some map options and set a starting marker on the map
function initMap() {
  // new map
  map = new google.maps.Map(document.getElementById('googleMap'), {
    // map options
    zoom: 8,
    center: {lat: -36.8509, lng: 174.7645},
    mapTypeid: google.maps.MapTypeId.ROADMAP
  });

  // add marker to the location of Auckland
  let marker = new google.maps.Marker({
      position: {lat: -36.8509, lng: 174.7645},
      map: map
  });

  // create the google maps directions service and display 
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  // add autocomplete functions to the location input boxes
  autocomplete1 = new google.maps.places.Autocomplete(input1, options);
  autocomplete2 = new google.maps.places.Autocomplete(input2, options);
}

// wait for page to load and once ready initialise google maps
$(document).ready(function() {
  initMap()
  // bind directions render to the map
    directionsDisplay.setMap(map);
});

// function to calc distance
function calcRoute() {
    // create request
    let request = {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode: google.maps.TravelMode.DRIVING, 
        unitSystem: google.maps.UnitSystem.METRIC
    }
    // pass request to route method
    directionsService.route(request, (result, status) => {
        if(status == google.maps.DirectionsStatus.OK) {
            // get distance and time
            let output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'> From: " + document.getElementById('from').value + ".<br/> To: " + document.getElementById('to').value + ". <br/> Driving distance <i class='fa-sharp fa-solid fa-road'></i>:" + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fa-solid fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ". </div>";
             // display route 
             directionsDisplay.setDirections(result);
        } else {
            // delete route from map
            directionsDisplay.setDirections({ routes: []});
            // center map back to auckland
            map.setCenter({lat: -36.8509, lng: 174.7645});
            // show error message
            output.innerHTML = "<div class='alert-danger'><i class='fa-solid fa-triangle-exclamation'></i> Could not retrieve driving distance. </div>";
        }    
    });
}
