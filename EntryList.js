export default class EntryList {
  constructor() {
    this.entries = [];
  }

  add(amount, id = undefined) {
    const expId = id === undefined || id === null ? Date.now() : id;
    this.entries.push({ id: expId, amount });
  }

  resetArray() {
    this.entries = [];
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
