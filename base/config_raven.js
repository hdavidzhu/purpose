Raven
  .config('https://0e9bdfe64d284a4a91f284636a538703@sentry.io/212625')
  .install();

// https://github.com/simon-weber/Autoplaylists-for-Google-Music/blob/f3f2040b793d55442f144ac3ebd1bf7d6aa61471/src/js/utils.js
function unlessError(func, onError) {
  // Decorate chrome callbacks to notice errors.
  // If an error occurs, call onError.

  return function unlessErrorWrapper() {
    // can't use an arrow function here because we need our own `this`.
    if (chrome.runtime.lastError) {
      console.error('unlessError:', chrome.runtime.lastError.message);
      Raven.captureMessage(chrome.runtime.lastError.message, {
        tags: {
          funcName: func.name,
        },
        extra: {
          func,
          location: 'unlessError',
          error: chrome.runtime.lastError,
          this: this,
          arguments: arguments,  // eslint-disable-line object-shorthand
        },
        stacktrace: true,
      });
      if (typeof onError !== 'undefined') {
        onError(chrome.runtime.lastError);
      }
    } else {
      try {
        func.apply(this, arguments);
      } catch (err) {
        Raven.captureException(err);
        throw err;        
      }
    }
  };
}
