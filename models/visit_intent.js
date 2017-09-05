'use strict';

class VisitIntent {
  constructor(intendedUrl, tabId, catcher) {
    this.intendedUrl = intendedUrl;
    this.tabId = tabId;
    this.catcher = catcher;
  }

  getCatcher() {
    return this.catcher;
  }

  setCatcher(catcher) {
    this.catcher = catcher;
  }
}
