////////////////////////////////////////////////////////////////////////////////
/////////////////////// Date Picker Function (jQuery) //////////////////////////
////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
  let minDate = new Date();
  $("#departdate").datepicker({
    showAnim: "drop",
    numberOfMonth: 1,
    minDate: minDate,
    dateFormat: "dd/mm/yy",
    onClose: function (selectedDate) {
      $("#returndate").datepicker("option", "minDate", selectedDate);
    },
  });

  $("#returndate").datepicker({
    showAnim: "drop",
    numberOfMonth: 1,
    minDate: minDate,
    dateFormat: "dd/mm/yy",
    onClose: function (selectedDate) {
      $("#departdate").datepicker("option", "maxDate", selectedDate);
    },
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////// Itinery Section /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// const addStopBtn = document.querySelector('#AddStopButton');
// const itineraryContainer = document.querySelector('#itinery-grid-left');
// const dropDownCloseIcons = document.querySelectorAll('.location .close');
// let numLocFields = 0;

// window.addEventListener('load', (evt) => {
//     const fieldWidth = itineraryContainer.children[0].querySelector('.chosen-container').offsetWidth;
//     addStopBtn.addEventListener('click', ()=>{
//         numLocFields ++;
//         const targetLoc = itineraryContainer.children[numLocFields];
//         targetLoc.classList.remove('hide');
//         targetLoc.querySelector('.chosen-container').style.width = fieldWidth + 'px';
//     });
//     dropDownCloseIcons.forEach((closeIcon, index) => {
//         closeIcon.addEventListener('click', ()=>{
//             const targetLoc = itineraryContainer.children[index+1];
//             targetLoc.querySelector('.location-field').children[0].setAttribute('selected', 'selected');
//             targetLoc.classList.add('hide');
//             setLocationArray();
//             if($('#ResultContainer').is(':visible')){
//                 setTimeout(() => { //wait for Direction API to update the distance value
//                       getValShowResult();
//                 }, "2000");
//             }
//         });
//     });
// });

//////////////////////////////////////////////////////////////////////////////////////////////////// show results container on click ///////////////////////////
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
///////// form value change event (* below is in jQuery format) ////////////////
////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////// Get values from itinery input fields and display the results ///////////
////////////////////////////////////////////////////////////////////////////////

function getValShowResult() {
  // get values from the form and call showResultContainer function
  const passengers = $('#passengers').val();
  const departDate = $('#departdate').val();
  const returnDate = $('#returndate').val();

  //change format to 'YYYY/M/D 00:00:00' (calling convertDateTime function below)
  const departDateTime = new Date(convertDateTime(departDate, '10:00'));
  const returnDateTime = new Date(convertDateTime(returnDate, '10:00'));

  //calculate rental period from those dates
  let duration = (returnDateTime - departDateTime)/(1000*60*60*24);
  duration = Math.ceil(duration);

  //distance
  let distance = document.getElementById('distanceText').innerHTML;
  distance = parseInt(distance.replace(' km',''));

  console.log(`
      Departing: ${departDateTime}
      Returning: ${returnDateTime}
      Duration: ${duration} Days
      Passengers: ${passengers}
      Distance: ${distance} km
  `);
  //get results
 
  showResultContainer(passengers, duration, distance);
}

//////////////////////////////////////////////////////////////////////////////////////////// convert date from date picker to YYYY/MM/DD  //////////////////////
////////////////////////////////////////////////////////////////////////////////

function convertDateTime(date, time){
  const dateArr = date.split('/');
  const day = dateArr[0];
  const month = dateArr[1];
  const year = dateArr[2];
  return year + '/' + month + '/' + day + ' ' + time;
}

//////////////////////////////////////////////////////////////////////////////////////////////////// Transport options /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const transport = [
	{
        id: 0,
        Vehicle: 'Motorbike',
        MinPassengers: 1,
        MaxPassengers: 1,
        PricePerDay: 109,
        MinRentalPeriod: 1,
        MaxRentalPeriod: 5,
        Fuel: 3.7,
        Image: './images/motorbike.png'
	},
	{
        id: 1,
        Vehicle: 'Small car',
        MinPassengers: 1,
        MaxPassengers: 2,
        PricePerDay: 129,
        MinRentalPeriod: 1,
        MaxRentalPeriod: 10,
        Fuel: 8.5,
        Image: './images/smallcar.png'
	},
	{
        id: 2,
        Vehicle: 'Large car',
        MinPassengers: 1,
        MaxPassengers: 5,
        PricePerDay: 144,
        MinRentalPeriod: 3,
        MaxRentalPeriod: 10,
        Fuel: 9.7,
        Image: './images/largecar.png'
	},
	{
        id: 3,
        Vehicle: 'Motor home',
        MinPassengers: 2,
        MaxPassengers: 6,
        PricePerDay: 200,
        MinRentalPeriod: 2,
        MaxRentalPeriod: 15,
        Fuel: 17,
        Image: './images/motorhome.png'
	}
];

// Add elements (under '#ResultContainer') using the above data object 
const results = document.querySelector('#ResultContainer');
for (let index in transport){
   const option = transport[index];
   const optionContainer = document.createElement('div');
   const vehicle = `<strong>${option.Vehicle}</strong>`;
   const capacity = `Capacity: ${option.MinPassengers}-${option.MaxPassengers} people`;
   const period = `min ${option.MinRentalPeriod} days / max ${option.MaxRentalPeriod} days`;
   const price = `$${option.PricePerDay} / day` ;
   const fuel = `Fuel: ${option.Fuel}L / 100km`;
   const imagePath = option.Image;

   let inner = '';
   //add image
   const image = document.createElement('img');
   image.setAttribute('src', imagePath);
   image.setAttribute('alt', option.Vehicle);
   optionContainer.appendChild(image);
   //add info
   const infoArr = [vehicle, capacity, period, price, fuel];
   infoArr.forEach((arrayItem) => {inner += arrayItem + '<br>'});
   const info = document.createElement('p');
   info.innerHTML = inner;
   optionContainer.appendChild(info);
   //add id
   optionContainer.setAttribute('id', `transport${option.id}`);
   //add cost info
   const totalPrice = document.createElement('p');
   totalPrice.setAttribute('id', 'TotalPrice');
   const totalFuel = document.createElement('p');
   totalFuel.setAttribute('id', 'TotalFuel');
   const totalCost = document.createElement('p');
   totalCost.setAttribute('id', 'Total');
   optionContainer.appendChild(totalPrice);
   optionContainer.appendChild(totalFuel);
   optionContainer.appendChild(totalCost);
   //append the whole thing
   results.appendChild(optionContainer);
    
}

////////////////////////////////////////////////////////////////////////////////
///////////// Show results (passengers, duration & distance) ///////////////////
////////////////////////////////////////////////////////////////////////////////

function showResultContainer(passengers, duration, distance){
    //filter results
    for (let index in transport) {
        const option = transport[index];
        const minPassengers = option.MinPassengers;
        const maxPassengers = option.MaxPassengers;
        const price = option.PricePerDay;
        const minPeriod = option.MinRentalPeriod;
        const maxPeriod = option.MaxRentalPeriod;
        const fuel = option.Fuel;
        //filter results
        if (passengers < minPassengers || passengers > maxPassengers || duration < minPeriod || duration > maxPeriod){
            document.querySelector(`#transport${option.id}`).style.display = 'none';
        } else {  
            document.querySelector(`#transport${option.id}`).style.removeProperty('display');
        }

        //calculate & show total price & fuel consumption
        const totalPrice = price * duration;
        const totalFuel = Math.round(fuel * distance/100);
        const totalFuelCost = Math.round(2.8 * totalFuel);
        const total = totalPrice + totalFuelCost;
        document.querySelector(`#transport${option.id}`).querySelector('#TotalPrice').textContent = `Price (${duration} days): $${totalPrice}`;
        document.querySelector(`#transport${option.id}`).querySelector('#TotalFuel').textContent = `Fuel: $${totalFuelCost} approx. (${totalFuel}L)`;
        document.querySelector(`#transport${option.id}`).querySelector('#Total').textContent = `Total cost: $ ${total} approx.`;
    }
    $('.results').show();
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
    componentRestrictions: { country: 'NZ' },
    types: ['(cities)']
};
let input1 = document.getElementById("from");
let autocomplete1;
let input2 = document.getElementById("to");
let autocomplete2;

// wait for page to load and once ready initialise google maps
$(document).ready(function() {
  initMap()
  // bind directions render to the map
    directionsDisplay.setMap(map);
});


// create a function to initialise a new map with some map options and set a starting marker on the map
function initMap() {
  
  // new map
  map = new google.maps.Map(document.getElementById('googleMap'), {
    // map options
    zoom: 5.2,
    center: {lat: -41.2924, lng: 174.7787},
    mapTypeid: google.maps.MapTypeId.ROADMAP
  });

  // add marker to the location of Auckland
  // let marker = new google.maps.Marker({
  //     position: {lat: -36.8509, lng: 174.7645},
  //     map: map
  // });

  // set the google maps directions service and display 
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  // add autocomplete functions to the location input boxes
  autocomplete1 = new google.maps.places.Autocomplete(input1, options);
  autocomplete2 = new google.maps.places.Autocomplete(input2, options); 
}


// function to calc distance
function calcRoute() {
    let distance;
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
            let distance = '<span id="distanceText">' + result.routes[0].legs[0].distance.text + '</span>';
            let duration = result.routes[0].legs[0].duration.text;
            let fromVal = document.getElementById('from').value;
            let toVal = document.getElementById('to').value;
            let outputContent = "<div class='alert-info'> From: " + fromVal + ".<br/> To: " + toVal;
            outputContent += ". <br/> Driving distance <i class='fa-sharp fa-solid fa-road'></i>:" + distance + ".<br />Duration <i class='fa-solid fa-hourglass-start'></i> : " + duration + ". </div>";
            document.querySelector('#output').innerHTML = outputContent;
             // display route 
             directionsDisplay.setDirections(result);
             getValShowResult();
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



