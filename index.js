var continueButton = document.getElementById('btn-continue');
continueButton.onclick = function onContinueButtonClick() {
  // TODO: Redirect to actual page.
  alert('Continuing');
}


var closeButton = document.getElementById('btn-close');
closeButton.onclick = function onCloseButtonClick() {
  // TODO: Save the text here.
  window.close();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  alert(request.regex);
});
