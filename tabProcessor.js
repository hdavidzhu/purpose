"use strict";

class TabProcessor {
  constructor(visitIntentBank) {
    this.visitIntentBank = visitIntentBank;
  }

  test(tab, catchers) {
    var _this = this;
    catchers.find(function(catcher) {
      if (!catcher.isEnabled())
        return false;

      const isCaught = catcher.test(tab.url);

      // TODO: This may be a code smell to run code in a `find`
      if (isCaught) {
        // TODO: Would we get into a race condition here?
        _this.block(tab, catcher);
      }

      return isCaught;
    });
  }

  block(tab, catcher) {
    const intent = new VisitIntent(tab.url, tab.id, catcher);
    this.visitIntentBank.deposit(intent);
    chrome.tabs.update(tab.id, { url: 'index.html' });
  }
}
