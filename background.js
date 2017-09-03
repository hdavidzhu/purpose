"use strict";

const visitIntentBank = new VisitIntentBank();

const tabProcessor = new TabProcessor(visitIntentBank);
const catchWorker = new CatchWorker(tabProcessor);
catchWorker.start();

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
  switch (changeInfo.status) {

    case 'loading':
      tabProcessor.test(tab, catchers);
      break;
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  const tabId = sender.tab.id;

  switch (request.type) {

    case 'get-visit-intent':
      var intent = visitIntentBank.read(tabId);
      sendResponse(intent);
      break;

    case 'continue-to-url':
      var intent = visitIntentBank.withdraw(tabId);
      catchWorker.addPendingCatcher(intent.getCatcher(), request.checkoutDuration || 5 * 60 * 1000);
      chrome.tabs.update(tabId, { url: intent.intendedUrl });
      break;
  }
});
