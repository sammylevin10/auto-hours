console.log("THE DEBUG SCRIPT HAS BEEN INVOKED");

console.log("ELEMENTS: " + document.getElementsByTagName("*").length);

autoFill();

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
