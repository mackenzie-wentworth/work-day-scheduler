// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  clickSave();

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  var dayjsHour = dayjs().hour();

  updateTimeBlock(dayjsHour);


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  populateLocalStorage();

  // TODO: Add code to display the current date in the header of the page.
  var nowDayJs = dayjs();
  $("#currentDay").text(nowDayJs); 

});

// how the click save will save work day events
function clickSave() {
  $(".saveBtn").on("click", function () {
    console.log(this);
    var description = $(this).siblings(".description").val();
    var hourId = $(this).parent().attr("id");

    localStorage.setItem(hourId, description);
  });

}

//take Day.js hour parameter and update time block
function updateTimeBlock(dayjsHour) {

  // use 24 hour time format so for loop from 9 to 17
  for (var workHour = 9; workHour <= 17; workHour++) {
    var timeBlockId = "#" + workHour;
    var timeBlockIdClass = timeBlockId + ".time-block";

    if (workHour > dayjsHour) {
      $(timeBlockIdClass).addClass("future");
    } else if (workHour === dayjsHour) {
      $(timeBlockIdClass).addClass("present");
    } else if (workHour < dayjsHour) {
      $(timeBlockIdClass).addClass("past");

    }

  }

}

function populateLocalStorage() {
  // use 24 hour time format so for loop from 9 to 17
  for (var workHour = 9; workHour <= 17; workHour++) {
    var timeBlockId = "#" + workHour;
    var timeBlockIdDescription = timeBlockId + " .description";
    // console.log(timeBlockIdDescription);

    $(timeBlockIdDescription).val(localStorage.getItem(workHour));
  }

}