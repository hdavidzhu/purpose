// DATA ========================================================================

var message = {};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  message = request;
});

// BUTTONS =====================================================================

var continueButton = document.getElementById('btn-continue');
continueButton.onclick = function onContinueButtonClick() {
  chrome.runtime.sendMessage({
    type: 'continue-to-url',
    catcher: message.catchers[0]
  }, function onResponse(success) {
    if (success == true) {
      window.location.replace(message.url);
    }
  });
}

var closeButton = document.getElementById('btn-close');
closeButton.onclick = function onCloseButtonClick() {
  // TODO: Save the text here.
  window.close();
}
