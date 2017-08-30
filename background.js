chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'loading') {
    var testRegex = new RegExp('youtube.com');
    var isYoutube = testRegex.test(changeInfo.url);
    if (isYoutube) {
      chrome.tabs.remove(tabId, function() {
        chrome.tabs.create({ url: "index.html" });
      });
    }
  }
});
