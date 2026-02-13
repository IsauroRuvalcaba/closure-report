export default class EntryList {
  constructor() {
    this.entries = [];
  }

  add(amount) {
    this.entries.push(amount);
  }

  grandTotal() {
    return this.entries.reduce((acc, currentValue) => acc + currentValue, 0);
  }
}
