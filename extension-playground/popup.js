let inputs = new Array(10);

// THIS IS THE EVENT LISTENER AREA. LET THEM SLEEP. DO NOT DISTURB THEM

document.addEventListener('DOMContentLoaded', function () {
  var saveButton = document.querySelector('#testButton');
  saveButton.addEventListener('click', populateArray);
});

document.addEventListener('DOMContentLoaded', function () {
  var saveButton = document.querySelector('#saveButton');
  saveButton.addEventListener('click', save);
});

document.addEventListener('DOMContentLoaded', function () {
  var saveButton = document.querySelector('#autoFillButton');
  saveButton.addEventListener('click', retrieve);
});

// THIS IS THE EVENT LISTENER AREA. LET THEM SLEEP. DO NOT DISTURB THEM

function populateArray() {
  for (let i = 1; i<11; i++) {
    let myId = "input"+i.toString();
    inputs[i-1] = document.getElementById(myId).value
  }
}

function save() {
  console.log("You pressed the save button");
  populateArray();
  let value = inputs;
  chrome.storage.sync.set({key: value}, function() {
          console.log('Value is set to ' + value);
  });
}

function retrieve() {
  console.log("You pressed the autofill button");
  let key = "myKey";
  chrome.storage.sync.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
    let value = result.key;
    console.log(value[1]);
  });
}
