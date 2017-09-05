"use_strict";

chrome.runtime.sendMessage({ type: EVENTS.GET_CATCHER_STRINGS }, function(response) {
  console.log(response);
});

var saveButton = document.getElementById('btn-save');
saveButton.onclick = function onSaveButtonClick(event) {
  event.preventDefault();
  const catchersTextArea = document.getElementById('txtarea-catchers');
  const catcherStrings = catchersTextArea.value.split('\n');
  chrome.runtime.sendMessage({
    type: EVENTS.SAVE_CATCHER_STRINGS,
    catcherStrings: catcherStrings
  });
}
