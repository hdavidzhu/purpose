const expireButton = document.getElementById('btn-expire');
const optionsButton = document.getElementById('btn-options');

expireButton.onclick = function onExpireButtonClick() {
  chrome.runtime.sendMessage({ type: EVENTS.EXPIRE_SESSION }, exitPopup);
}

optionsButton.onclick = function onOptionsButtonClick() {
  chrome.runtime.openOptionsPage();
  exitPopup();
}

function exitPopup() {
  window.close();
}
