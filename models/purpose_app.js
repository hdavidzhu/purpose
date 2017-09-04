class PurposeApp {

  constructor() {
    // Declare dependencies
    this.visitIntentBank = new VisitIntentBank();
    this.tabProcessor = new TabProcessor(this.visitIntentBank);
    this.catchWorker = new CatchWorker(this.tabProcessor);
    this.catchersProvider = new CatchersProvider();

    // Start services
    this.initListeners();
    this.catchWorker.start();
  }

  initListeners() {
    const _this = this;

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      switch (changeInfo.status) {
        case 'loading':
          _this.onTabLoading(tab);
          break;
      }
    });

    chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
      _this.onTabRemoved(tabId);
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      const tabId = sender.tab.id;
      switch (request.type) {
        case 'save-catcher-strings':
          _this.onSaveCatcherStrings(request, sendResponse);
          break;
        case 'get-visit-intent':
          _this.onGetVisitIntent(tabId);
          break;
        case 'continue-to-url':
          _this.onContinueToUrl(request, tabId);
          break;
      }
    });
  }

  onTabLoading(tab) {
    this.tabProcessor.test(tab, this.catchersProvider.getCatchers());
  }

  onTabRemoved(tabId) {
    this.visitIntentBank.withdraw(tabId);
  }

  onSaveCatcherStrings(request, sendResponse) {
    this.catchersProvider.saveCatcherStrings(request.catcherStrings);
    sendResponse(true);
  }

  onGetVisitIntent(tabId) {
    var intent = visitIntentBank.read(tabId);
    sendResponse(intent);
  }

  onContinueToUrl(request, tabId) {
    var intent = this.visitIntentBank.withdraw(tabId);
    catchWorker.addPendingCatcher(intent.getCatcher(), request.checkoutDuration);
    chrome.tabs.update(tabId, { url: intent.intendedUrl });
  }
}
