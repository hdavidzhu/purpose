const TMP_BLOCK_SITES = [
  'youtube.com',
  'facebook.com',
  'news.google.com'
];

const catchers = TMP_BLOCK_SITES.map(function(site) {
  return new Catcher(site);
});

var blockMessage = {};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'loading') {
    const intendedUrl = changeInfo.url;
    const appliedCatchers = catchers.filter(function(catcher) {
      if (catcher.isEnabled()) {
        return catcher.regExp.test(intendedUrl);
      }
    });

    if (appliedCatchers.length > 0) {
      blockMessage = {
        type: 'catchers-and-intent',
        catchers: appliedCatchers,
        url: intendedUrl
      };
      blockMessage.intendedUrl = intendedUrl;
      chrome.tabs.update(tabId, {url: 'index.html'});
    }
  }

  if (changeInfo.status == 'complete') {
    chrome.runtime.sendMessage(blockMessage);
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == 'continue-to-url') {
    const catcher = catchers.find(function(catcher) {
      return catcher.regExpString == request.catcher.regExpString;
    });

    catcher.setEnabled(false);
    sendResponse(true);
  }
});
