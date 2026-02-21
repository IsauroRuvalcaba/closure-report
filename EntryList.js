export default class EntryList {
  constructor() {
    this.entries = [];
  }

  add(amount) {
    this.entries.push({ id: Date.now(), amount });
  }

  grandTotal() {
    return this.entries.reduce(
      (acc, currentValue) => acc + currentValue.amount,
      0,
    );
  }

  getList() {
    return this.entries;
  }

  remove(id) {
    const idToRemove = Number(id);
    this.entries = this.entries.filter((entry) => entry.id !== idToRemove);
  }
}
