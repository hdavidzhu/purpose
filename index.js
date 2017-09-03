// BUTTONS =====================================================================

var continueButton = document.getElementById('btn-continue');
continueButton.onclick = function onContinueButtonClick() {
  chrome.runtime.sendMessage({ type: 'continue-to-url' });
}

var closeButton = document.getElementById('btn-close');
closeButton.onclick = function onCloseButtonClick() {
  // TODO: Save the text here.
  window.close();
}
