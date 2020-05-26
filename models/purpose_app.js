"use_strict";

class PurposeApp {
  constructor() {
    // Declare dependencies
    this.visitIntentBank = new VisitIntentBank();
    this.catchersProvider = new CatchersProvider();
    this.tabProcessor = new TabProcessor(this.visitIntentBank);
    this.catchWorker = new CatchWorker(this.tabProcessor);

    // Start services
    this.initListeners();
    this.catchWorker.start();
  }

  initListeners() {
    const _this = this;
    browser.tabs.onUpdated.addListener(
      unlessError(function (tabId, changeInfo, tab) {
        switch (changeInfo.status) {
          case EVENTS.LOADING:
            _this.processTab(tab);
            break;
        }
      })
    );

    browser.tabs.onRemoved.addListener(
      unlessError(function (tabId, removeInfo) {
        _this.onTabRemoved(tabId);
      })
    );

    browser.runtime.onMessage.addListener(
      unlessError(function (request, sender, sendResponse) {
        switch (request.type) {
          case EVENTS.SAVE_CATCHER_STRINGS:
            _this.onSaveCatcherStrings(request.catcherStrings, sendResponse);
            break;
          case EVENTS.GET_CATCHER_STRINGS:
            _this.onGetCatchersAsStrings(sendResponse);
            break;
          case EVENTS.GET_VISIT_INTENT:
            _this.onGetVisitIntent(sender.tab.id, sendResponse);
            break;
          case EVENTS.CONTINUE_TO_URL:
            _this.onContinueToUrl(request, sender.tab.id);
            break;
          case EVENTS.EXPIRE_SESSION:
            _this.onExpireSession(sendResponse);
            break;
        }
      })
    );
  }

  processTab(tab) {
    const _this = this;
    _this.catchersProvider.getCatchers(function (catchers) {
      _this.tabProcessor.process(tab, catchers);
    });
  }

  processAllTabs() {
    const _this = this;
    browser.tabs.query(
      {},
      unlessError(function (tabs) {
        tabs.forEach(_this.processTab.bind(_this));
      })
    );
  }

  onTabRemoved(tabId) {
    this.visitIntentBank.withdraw(tabId);
  }

  onSaveCatcherStrings(catcherStrings, sendResponse) {
    this.catchersProvider.saveCatcherStrings(catcherStrings, function () {
      sendResponse(true);
    });
  }

  onGetCatchersAsStrings(sendResponse) {
    this.catchersProvider.getCatchersAsStrings(function (catcherStrings) {
      sendResponse(catcherStrings);
    });
  }

  onGetVisitIntent(tabId, sendResponse) {
    var intent = this.visitIntentBank.read(tabId);
    sendResponse(intent);
  }

  onContinueToUrl(request, tabId) {
    var intent = this.visitIntentBank.withdraw(tabId);
    if (!intent) {
      return;
    }
    this.catchWorker.addPendingCatcher(
      intent.getCatcher(),
      request.checkoutDuration
    );
    browser.tabs.update(tabId, { url: intent.intendedUrl });
  }

  onExpireSession(sendResponse) {
    this.catchWorker.clearPendingCatchers();
    this.processAllTabs();
    sendResponse(true);
  }
}
