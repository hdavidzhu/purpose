const TMP_BLOCK_SITES = [
  'youtube.com',
  'facebook.com',
  'news.google.com'
];

const siteCatchers = TMP_BLOCK_SITES.map(function(site) {
  return new RegExp(site);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'loading') {
    const intendedUrl = changeInfo.url;
    const appliedCatchers = siteCatchers.filter(function(catcher) {
      return catcher.test(intendedUrl);
    });

    if (appliedCatchers.length > 0) {
      chrome.tabs.update(tabId, {url: 'index.html'}, function() {
        chrome.runtime.sendMessage({
          catchers: appliedCatchers,
          url: intendedUrl
        });
      });
    }
  }
});
