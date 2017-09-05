'use strict';

class CatchersProvider {

  constructor() {
    this.resetCache();
  }

  saveCatcherStrings(catcherStrings, onSyncSetComplete) {
    const _this = this;

    chrome.storage.sync.set({
      catchers: catcherStrings.map(function(catcherString) {
        return new Catcher(catcherString);
      })
    }, function() {
      _this.resetCache();
      onSyncSetComplete();
    });
  }

  getCatchers(onSyncGetComplete) {
    const _this = this;

    if (_this.cachedCatchers != undefined) {
      return onSyncGetComplete(_this.cachedCatchers);
    }

    chrome.storage.sync.get('catchers', function(response) {
      _this.setCache(response.catchers);
      _this.getCatchers(onSyncGetComplete);
    });
  }

  getCatcherStrings(onGetComplete) {
    this.getCatchers(function(catchers) {
      const catcherStrings = catchers.map(function(catcher) {
        return catcher.regExpString;
      });
      onGetComplete(catcherStrings);
    });
  }

  resetCache() {
    this.cachedCatchers = undefined;
  }

  setCache(dehydratedCatchers) {
    this.cachedCatchers = dehydratedCatchers.map(function(dehydratedCatcher) {
      return new Catcher(
        dehydratedCatcher.regExpString,
        dehydratedCatcher.enabledAfter
      );
    })
  }
}
