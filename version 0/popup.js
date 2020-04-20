// The code in this file will load:
//   * after the document is ready
//   * after any previous content scripts (e.g., jquery.js)
//
// So you can safely use jQuery (the `$`) in the code below

// 'use strict';

var inputs;
var debugString = "Nothing found";
var timesArray = new Array(1);

debugScript();

function debugScript() {
  chrome.tabs.executeScript({
    file: 'debug.js'
  });
  hello(2);
}

function getFromPopup() {
  var inputs = document.getElementsByTagName("*");
  // console.log
  // console.log("The algorithm found " + inputs.length + " input1s in your popup");
  // timesArray[0] = inputs.value;
  console.log(inputs.length);
  for (let i = 0; i<inputs.length; i++) {
    debugFill(i,"");
  }
}

function save() {
  // chrome.tabs.executeScript(null,
  //     {code:"debugScript();"});
  // window.close();
  // debugScript();
  // console.log("ELEMENTS: " + document.getElementsByTagName("*").length);
  console.log("You pressed the save button");
}

function retrieve() {
  console.log("You pressed the retrieve button");
  // chrome.tabs.executeScript(null,
  //     {code:"debugRetrieve()"});
  // window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var saveButton = document.querySelector('#saveButton');
  saveButton.addEventListener('click', save);
});

getElementById("saveButton").addEventListener("click", save);

document.addEventListener('DOMContentLoaded', function () {
  var autoFillButton = document.querySelector('#autoFillButton');
  autoFillButton.addEventListener('click', retrieve);
});

console.log('The content script is running');

setInterval(autoFill, 1000);
setInterval(getFromPopup, 1000);

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
  getFromPopup();
  if (typeof(Storage) !== "undefined") {
      localStorage.times = timesArray;
  }
  else {
    console.log("Sorry, your browser does not support web storage...");
  }
}

function debugRetrieve() {
  console.log("You hit the autofill button");
  console.log(localStorage.times + " is the value saved from your first input");
}
