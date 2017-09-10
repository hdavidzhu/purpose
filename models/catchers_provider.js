class CatchersProvider {

  constructor() {
    this.resetCache();
  }

  saveCatcherStrings(catcherStrings, handleSyncSetCompletion) {
    const _this = this;

    chrome.storage.sync.set({
      catchers: catcherStrings.map(function(catcherString) {
        return new Catcher(catcherString);
      })
    }, function() {
      _this.resetCache();
      handleSyncSetCompletion();
    });
  }

  getCatchers(handleGetResult) {
    const _this = this;

    // Return cache if it is already present
    if (_this.cachedCatchers != undefined) {
      return handleGetResult(_this.cachedCatchers);
    }

    // Otherwise, update cache and return values
    chrome.storage.sync.get('catchers', function(response) {
      _this.setCache(response.catchers);
      _this.getCatchers(handleGetResult);
    });
  }

  getCatchersAsStrings(handleGetResult) {
    this.getCatchers(function(catchers) {
      const catcherStrings = catchers.map(function(catcher) {
        return catcher.regExpString;
      });
      handleGetResult(catcherStrings);
    });
  }

  setCache(dehydratedCatchers) {
    this.cachedCatchers = dehydratedCatchers.map(function(dehydratedCatcher) {
      return new Catcher(
        dehydratedCatcher.regExpString,
        dehydratedCatcher.enabledAfter
      );
    })
  }

  resetCache() {
    this.cachedCatchers = undefined;
  }
}
