chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log(tab.url);  
});
