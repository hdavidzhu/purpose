"use strict";

class Catcher {
  constructor(regExpString) {
    this.setRegExp(regExpString);
    this.enabledAfter = 0;
  }

  test(url) {
    return this.regExp.test(url);
  }

  getRegExpString() {
    return this.regExpString;
  }

  setRegExp(regExpString) {
    this.regExpString = regExpString;
    this.regExp = new RegExp(this.regExpString);
  }

  isEnabled() {
    return Date.now() > this.enabledAfter;
  }

  /**
  * @param {millisecond} time Timestamp of when to re-enable feature
  **/
  setEnabledAfter(time) {
    this.enabledAfter = time;
  }
}
