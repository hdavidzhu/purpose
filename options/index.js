
var saveButton = document.getElementById('btn-save');
saveButton.onclick = function onSaveButtonClick(event) {
  event.preventDefault();
  const catchersTextArea = document.getElementById('txtarea-catchers');
  const catcherStrings = catchersTextArea.value.split('\n');
  chrome.runtime.sendMessage({
    type: "save-catcher-strings",
    catcherStrings: catcherStrings
  });
}
