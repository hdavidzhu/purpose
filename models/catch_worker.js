'use strict';

const REFRESH_RATE = 60 * 1000; // 1 minute

class CatchWorker {

  constructor(tabProcessor) {
    this.pendingCatchersQueue = [];
    this.tabProcessor = tabProcessor;
  }

  start() {
    setInterval(this.check.bind(this), REFRESH_RATE);
  }

  check() {
    var _this = this;
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        _this.tabProcessor.test(tab, _this.pendingCatchersQueue);
      });
    });
  }

  addPendingCatcher(catcher, delay) {
    catcher.setEnabledAfter(Date.now() + delay);
    this.pendingCatchersQueue.push(catcher);
  }
}
