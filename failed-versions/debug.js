console.log("THE DEBUG SCRIPT HAS BEEN INVOKED");

console.log("ELEMENTS: " + document.getElementsByTagName("*").length);

function hello(myNumber) {
  console.log("Hello there! " + myNumber);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });
