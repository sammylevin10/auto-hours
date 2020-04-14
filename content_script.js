// The code in this file will load:
//   * after the document is ready
//   * after any previous content scripts (e.g., jquery.js)
//
// So you can safely use jQuery (the `$`) in the code below

'use strict';

var inputs;
var debugString = "Nothing found";
var times;

function getFromPopup() {

}

function save() {
  chrome.tabs.executeScript(null,
      {code:"debugSave()"});
  // window.close();
}

function retrieve() {
  chrome.tabs.executeScript(null,
      {code:"debugRetrieve()"});
  // window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var saveButton = document.querySelector('#saveButton');
  saveButton.addEventListener('click', save);
});

document.addEventListener('DOMContentLoaded', function () {
  var autoFillButton = document.querySelector('#autoFillButton');
  autoFillButton.addEventListener('click', retrieve);
});

console.log('The content script is running');

setInterval(autoFill, 1000);

function autoFill() {
  console.log('Autofilled!');
  var iframe = document.getElementById("EntryFrame");
  inputs = iframe.contentWindow.document.getElementsByTagName("input");

  debugFill(3, debugString);
  debugFill(4, "Mon evening");
  debugFill(8, "Tue morning");
  debugFill(9, "Tue evening");
  debugFill(13, "Wed morning");
  debugFill(14, "Wed evening");
  debugFill(18, "Thu morning");
  debugFill(19, "Thu evening");
  debugFill(23, "Fri morning");
  debugFill(24, "Fri evening");

  for (var i = 0; i < inputs.length; i++) {
    // inputs[i].value = "Definitely not a robot";
    // inputs[2].style.border = "3px solid red";
    // console.log("replaced");
  }
}

function debugFill(index, cell) {
  inputs[index].style.border = "2px solid #FF0000";
  inputs[index].value = cell;
}

function debugSave() {
  localStorage.setItem("myData", "Success");
  console.log("You hit the save button");
  if (typeof(Storage) !== "undefined") {
    if (localStorage.clickcount) {
      localStorage.clickcount = "This is stored locally.";
    } else {
      localStorage.clickcount = "Local storage was just created";
    }
  } else {
    console.log("Sorry, your browser does not support web storage...");
  }
}

function debugRetrieve() {
  console.log("You hit the autofill button");
  if (typeof(Storage) !== "undefined") {
    if (localStorage.clickcount) {
    } else {
      localStorage.clickcount = "Local storage was just created";
    }
  } else {
    console.log("Sorry, your browser does not support web storage...");
  }
  console.log(localStorage.clickcount);
}
