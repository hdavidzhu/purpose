"use strict";

var continueButton = document.getElementById('btn-continue');
continueButton.onclick = function onContinueButtonClick() {
  chrome.runtime.sendMessage({
    type: 'continue-to-url',
    reason: getReason(),
    checkoutDuration: getCheckoutDuration()
  });
}

var closeButton = document.getElementById('btn-close');
closeButton.onclick = function onCloseButtonClick() {
  window.close();
}

function getReason() {
  return document.getElementById("txtarea-reason").value;
}

/**
* @return {millisecond} How long we want in milliseconds
**/
function getCheckoutDuration() {
  const input = document.getElementById("input-checkout-duration").value;
  return input * 60 * 1000;
}
