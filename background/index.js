Raven
  .config('https://0e9bdfe64d284a4a91f284636a538703@sentry.io/212625')
  .install();

 // Wraps in try/catch
Raven.context(function() {
  const purposeApp = new PurposeApp();
});
