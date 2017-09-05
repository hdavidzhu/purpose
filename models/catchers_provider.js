"use strict";

class CatchersProvider {

  constructor() {
    this.catchers = [];
  }

  saveCatcherStrings(catcherStrings) {
    this.catchers = catcherStrings.map(function(catcherString) {
      return new Catcher(catcherString);
    });
  }

  getCatchers() {
    return this.catchers;
  }

  getCatcherStrings() {
    return this.catchers.map(function(catcher) {
      return catcher.regExpString;
    });
  }
}
