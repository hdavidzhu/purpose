class Catcher {
  constructor(regExpString) {
    this.setRegExp(regExpString);
    this.enabled = true;
  }

  setRegExp(regExpString) {
    this.regExpString = regExpString;
    this.regExp = new RegExp(this.regExpString);
  }

  isEnabled() {
    return this.enabled;
  }

  setEnabled() {
    this.enabled = false;
  }
}
