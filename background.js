const TMP_BLOCK_SITES = [
  'youtube.com',
  'facebook.com',
  'news.google.com'
];

const tmpBlockSitesRegexes = TMP_BLOCK_SITES.map(function(site) {
  return new RegExp(site);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'loading') {
    const isOnBlacklist = tmpBlockSitesRegexes.some(function(regex) {
      return regex.test(changeInfo.url);
    });

    if (isOnBlacklist) {
      chrome.tabs.update(tabId, {url: 'index.html'});
      // chrome.tabs.remove(tabId, function() {
      //   chrome.tabs.create({ url: "index.html" }, function() {
      //     chrome.runtime.sendMessage({regex: "hello"});
      //   });
      // });
    }
  }
});
