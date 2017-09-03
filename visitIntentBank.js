"use strict";

class VisitIntentBank {

  constructor() {
    this.visitIntents = {};
  }

  read(tabId) {
    return this.visitIntents[tabId];
  }

  withdraw(tabId) {
    const intent = this.read(tabId);
    delete this.visitIntents[tabId];
    return intent;
  }

  deposit(visitIntent) {
    this.visitIntents[visitIntent.tabId] = visitIntent;
  }
}
