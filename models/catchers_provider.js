class CatchersProvider {

  constructor() {
    this.resetCache();
  }

  saveCatcherStrings(catcherStrings, done) {
    const _this = this;

    chrome.storage.sync.set({
      catchers: catcherStrings.map(function(catcherString) {
        return new Catcher(catcherString);
      })
    }, unlessError(function() {
      _this.resetCache();
      done();
    }));
  }

  getCatchers(done) {
    const _this = this;

    // Return cache if it is already present
    if (_this.cachedCatchers != undefined) {
      return done(_this.cachedCatchers);
    }

    // Otherwise, update cache and return values
    chrome.storage.sync.get('catchers', unlessError(function(response) {
      _this.setCache(response.catchers);
      _this.getCatchers(done);
    }));
  }

  getCatchersAsStrings(done) {
    this.getCatchers(function(catchers) {
      const catcherStrings = catchers.map(function(catcher) {
        return catcher.regExpString;
      });
      done(catcherStrings);
    });
  }

  setCache(dehydratedCatchers = []) {
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
