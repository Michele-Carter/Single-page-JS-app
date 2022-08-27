//declare varibles and tell them where to get thier values from
const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn");
options = wrapper.querySelector(".options");

//create an array for the locations and give it values
let locations = [
  "Auckland",
  "Hamilton",
  "Palmerston North",
  "Wellington",
  "Picton",
  "Nelson",
  "Christchurch",
  "Dunedin",
  "Queenstown",
  "Invercargill",
];

/* 
create function to add each location inside li tags and insert the option into the tag once selected
*/
function addLocation() {
  locations.forEach((location) => {
    let li = `<li onclick="updateName(this)">${location}</li>`;
    options.insertAdjacentHTML("beforeend", li);
  });
}

//insert selected location
addLocation();

//fuction to shift active element focus
function updateName(selectedLi) {
  wrapper.classList.remove("active");
  selectBtn.firstElementChild.innerText = selectedLi.innerText;
}

// click event listener
selectBtn.addEventListener("click", () => {
  wrapper.classList.toggle("active");
});


// *** DATE PICKER *** //

// declare variables 
const datePickerEle = document.querySelector(".date-picker-wrapper");
const selectedDateEle = document.querySelector(".selected-date");
const dateEle = document.querySelector(".dates-container");
const monthEle = document.querySelector(".month .month-item");
const nextMonthEle = document.querySelector(".month .next-month");
const prevMonthEle = document.querySelector(".month .prev-month");
const daysEle = document.querySelector(".days-container");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

// display the month
monthEle.textContent = months[month] + " " + year;

selectedDateEle.textContent = formatDate(date);

populateDates();

/* 
add a click event listener to the date picker wrapper to toggle date selector visibility and the the arrows to select either next or previous month 
*/
datePickerEle.addEventListener("click", toggleDatePicker);
nextMonthEle.addEventListener("click", goToNextMonth);
prevMonthEle.addEventListener("click", goToPreviousMonth);

/* 
toggle dates container and prevent month element from being active so it can't be hidden when clicked on, because we don't want the dates to hide whenever we click on a month or date 
*/
function toggleDatePicker(e) {
  // check if path for dates-container element exists
  if (!checkClassExist(e.path, "dates-container")) {  
    // if not false, allow toggle of the active class
    dateEle.classList.toggle("active");
  }
}

function checkClassExist(path, element) {
  // loop through all the paths to the element dates-container
  for (let i = 0; i < path.length; i++) {  
    // if able to find dates container path, return true and stop toggle
    if (path[i].classList && path[i].classList.contains(element)) {
      return true;
    }
  }
  return false;
}

// creates function to populate dates
function populateDates() {
  daysEle.innerHTML = "";
  let totalDays;
}

  // sets days for each month
  if (month === 1) {
    totalDays = 28;
  } else if (month % 2 === 0) {
    totalDays = 31;
  } else {
    totalDays = 30;
  }

  for (let i = 0; i < totalDays; i++) {
    const dayEle = document.createElement("div");
    dayEle.classList.add("day");
    dayEle.textContent = i + 1;

    if(selectedDay === i + 1 && selectedYear === year && selectedMonth === month) {
      dayEle.classList.add("selected");
    }

    dayEle.addEventListener("click", function() {
      selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;

      selectedDateEle.textContent = formatDate(selectedDate);

      populateDates();
    });

    daysEle.appendChild(dayEle);
  }


function formatDate(selectedDate) {
  let day = selectedDate.getDate()
  if(day < 10) {
    day = "0" + day;
  }
}

  let month = selectedDate.getMonth() + 1;
  if(month < 10) {
    month = "0" + month;
  }

  let year = selectedDate.getFullYear()

  return day + " / " + month + " / " + year;



/*
creates function to go to next month and return to january of the next year once december has been reached
*/
function goToNextMonth() {
  month++;
  if(month > 11){
    month = 0;
    year++;
  }
  monthEle.textContent = months[month] + " " + year;
  populateDates();
}

/*
creates function to go to previous month and return to december of the previous year once january has been reached
*/
function goToPreviousMonth() {
  month--;
  if(month < 0){
    month = 11;
    year--;
  }
  monthEle.textContent = months[month] + " " + year;
  populateDates();
}

