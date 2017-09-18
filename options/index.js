const catchersTextArea = document.getElementById('txtarea-catchers');
const saveButton = document.getElementById('btn-save');

chrome.runtime.sendMessage(
  { type: EVENTS.GET_CATCHER_STRINGS },
  unlessError(function(catcherStrings) {
    catchersTextArea.value = catcherStrings.join('\n');
  }));

saveButton.onclick = function onSaveButtonClick(event) {
  event.preventDefault();

  // TODO: Provide better sanitation of data
  const catcherStrings = catchersTextArea.value.split('\n')
    .filter(function(catcherString) {
      const isEmptyString = catcherString == '';
      const isUndefined = catcherString == undefined;
      return !(isEmptyString || isUndefined);
    });

  chrome.runtime.sendMessage({
    type: EVENTS.SAVE_CATCHER_STRINGS,
    catcherStrings: catcherStrings
  });
}
