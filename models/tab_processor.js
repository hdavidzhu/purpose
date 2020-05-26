class TabProcessor {
  constructor(visitIntentBank, catchersProvider) {
    this.visitIntentBank = visitIntentBank;
    this.catchersProvider = catchersProvider;
  }

  process(tab, catchers, handleProcessComplete) {
    const _this = this;
    _this.testTab(tab, catchers, function (tab, catcher) {
      if (catcher) {
        _this.blockTab(tab, catcher);
        if (handleProcessComplete) {
          handleProcessComplete(catcher);
        }
      }
    });
  }

  /**
   * @param {Tab} tab
   * @param {Catcher[]} catchers
   * @param {Function<Tab, Catcher>} handleTestResult
   **/
  testTab(tab, catchers, handleTestResult) {
    const catcher = catchers.find(function (catcher) {
      return catcher.isEnabled() && catcher.test(tab.url);
    });
    handleTestResult(tab, catcher);
  }

  blockTab(tab, catcher) {
    const intent = new VisitIntent(tab.url, tab.id, catcher);
    this.visitIntentBank.deposit(intent);
    browser.tabs.update(tab.id, { url: "blocker_landing/index.html" });
  }
}
