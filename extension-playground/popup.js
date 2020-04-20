let inputs = new Array(10);
let dropdowns = new Array(10);
let packet = new Array(2);

// THIS IS THE EVENT LISTENER AREA. LET THEM SLEEP. DO NOT DISTURB THEM

document.addEventListener('DOMContentLoaded', function () {
  var saveButton = document.querySelector('#saveButton');
  saveButton.addEventListener('click', save);
});

document.addEventListener('DOMContentLoaded', function () {
  var saveButton = document.querySelector('#autoFillButton');
  saveButton.addEventListener('click', autoFill);
});

// THIS IS THE EVENT LISTENER AREA. LET THEM SLEEP. DO NOT DISTURB THEM

recall();

function autoFill() {
  chrome.tabs.executeScript({
    file: 'content_script.js'
  });
}

function recall() {
  console.log("Memory is recalled");
  chrome.storage.sync.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
    let value = result.key;
    console.log("The second element is " + value[0][1]);
    for (let i = 1; i<11; i++) {
      let myId1 = "input"+i.toString();
      let myId2 = "dropdown"+i.toString();
      // console.log(value[0][i-1]);
      document.getElementById(myId1).value = value[0][i-1];
      document.getElementById(myId2).value = value[1][i-1];
    }
  });
}

function populateArrays() {
  for (let i = 1; i<11; i++) {
    let myId1 = "input"+i.toString();
    let myId2 = "dropdown"+i.toString();
    inputs[i-1] = document.getElementById(myId1).value;
    dropdowns[i-1] = document.getElementById(myId2).value;
  }
  packet[0] = inputs;
  packet[1] = dropdowns;
}

function save() {
  console.log("You pressed the save button");
  populateArrays();
  let value = packet;
  chrome.storage.sync.set({key: value}, function() {
          console.log('Value is set to ' + value);
  });
}
// 
// function retrieve() {
//   console.log("You pressed the autofill button");
//   chrome.storage.sync.get(['key'], function(result) {
//     console.log('Value currently is ' + result.key);
//     let value = result.key;
//     console.log(value[0][1]);
//   });
// }
