// BINDINGS ====================================================================

const spanBlocker = document.getElementById('span-blocker');
const spanUrl = document.getElementById('span-url');

var continueButton = document.getElementById('btn-continue');
continueButton.onclick = function onContinueButtonClick(event) {
  event.preventDefault();

  const reason = getReason();
  if (reason == undefined || reason.length == 0) {
    alert("A reason is required.");
    return;
  }

  chrome.runtime.sendMessage({
    type: EVENTS.CONTINUE_TO_URL,
    reason: reason,
    checkoutDuration: getCheckoutDuration()
  });
};

var closeButton = document.getElementById('btn-close');
closeButton.onclick = function onCloseButtonClick() {
  window.close();
};

// LIFECYCLE ===================================================================

chrome.runtime.sendMessage({ type: EVENTS.GET_VISIT_INTENT }, function(intent) {
  spanBlocker.textContent = intent.catcher.regExpString;
  spanUrl.textContent = intent.intendedUrl;
});

// HELPERS =====================================================================

function getReason() {
  return document.getElementById("txtarea-reason").value;
}

/**
* @return {millisecond} How long we want in milliseconds
**/
function getCheckoutDuration() {
  var input = document.getElementById("input-checkout-duration").value;
  if (input.length == 0) {
    input = 1;
  }
  return input * 60 * 1000;
}
