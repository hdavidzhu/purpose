const expireButton = document.getElementById("btn-expire");
const optionsButton = document.getElementById("btn-options");

expireButton.onclick = function onExpireButtonClick() {
  browser.runtime.sendMessage(
    { type: EVENTS.EXPIRE_SESSION },
    unlessError(exitPopup)
  );
};

optionsButton.onclick = function onOptionsButtonClick() {
  browser.runtime.openOptionsPage();
  exitPopup();
};

function exitPopup() {
  window.close();
}
