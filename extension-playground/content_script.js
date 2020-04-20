packet = new Array(2);
strings = new Array(10);

console.log("The content script has been invoked");
retrieveData();

function retrieveData() {
  try {
    console.log("retrieveData() was invoked");
    chrome.storage.sync.get(['key'], function(result) {
      console.log('Value currently is ' + result.key);
      packet = result.key;
      generateStrings();
    });
    } catch(error) {
      console.error(error);
    }
}

function generateStrings() {
  for (let i = 0; i<10; i++) {
    let number = packet[0][i];
    while (number>12) {
      number=number/10;
    }
    if(packet[1][i]=="") {
      strings[i] = "";
      console.log("null");
    }
    else {
      let myString = Math.floor(number).toString() + ":00 " + packet[1][i];
      strings[i] = myString;
      console.log(myString);
    }
  }
  autoFill();
}

function autoFill() {
  var iframe = document.getElementById("EntryFrame");
  inputs = iframe.contentWindow.document.getElementsByTagName("input");
  console.log(inputs.length);
  changeValue(3, strings[0]);
  changeValue(4, strings[1]);
  changeValue(8, strings[2]);
  changeValue(9, strings[3]);
  changeValue(13, strings[4]);
  changeValue(14, strings[5]);
  changeValue(18, strings[6]);
  changeValue(19, strings[7]);
  changeValue(23, strings[8]);
  changeValue(24, strings[9]);
}

function changeValue(index, cell) {
  var iframe = document.getElementById("EntryFrame");
  inputs = iframe.contentWindow.document.getElementsByTagName("input");
  inputs[index].style.background = "#ffcc99";
  inputs[index].value = cell;
}
