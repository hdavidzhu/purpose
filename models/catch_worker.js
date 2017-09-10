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
        _this.tabProcessor.process(
          tab,
          _this.pendingCatchersQueue,
          _this.removePendingCatcher.bind(_this));
      });
    });
  }

  addPendingCatcher(catcher, delay) {
    catcher.setEnabledAfter(Date.now() + delay);
    this.pendingCatchersQueue.push(catcher);
  }

  removePendingCatcher(chosenCatcher) {
    const index = this.pendingCatchersQueue.findIndex(function(catcher) {
      return catcher.regExpString == chosenCatcher.regExpString;
    });
    this.pendingCatchersQueue.splice(index, 1);
  }

  clearPendingCatchers() {
    // Enable all catchers
    this.pendingCatchersQueue.map(function(catcher) {
      catcher.setEnabledAfter(0);
    });
    this.pendingCatchersQueue = [];
  }
}
