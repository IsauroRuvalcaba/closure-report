import EntryList from "./EntryList.js";

export default class ClosureReport {
  constructor(grossSales, creditCardTotal, actualCash) {
    this.grossSales = grossSales;
    this.creditCardTotal = creditCardTotal;
    this.actualCash = actualCash;

    // Composition happens here
    this.overRings = new EntryList();
    this.expenses = new EntryList();
  }

  getNetSales() {
    return this.grossSales - this.overRings.grandTotal();
  }

  getExpectedTotal() {
    return this.getNetSales() - this.expenses.grandTotal();
  }

  getActualTotal() {
    return this.creditCardTotal + this.actualCash;
  }

  getDiscrepancy() {
    return this.getActualTotal() - this.getExpectedTotal();
  }

  getState() {
    return {
      grossSales: this.grossSales,
      creditCardTotal: this.creditCardTotal,
      actualCash: this.actualCash,
      overRings: { entries: this.overRings.getList() },
      expenses: { entries: this.expenses.getList() },
    };
  }

  loadState(data) {
    this.overRings.resetArray();
    this.expenses.resetArray();
    this.grossSales = data.grossSales;
    this.creditCardTotal = data.creditCardTotal;
    this.actualCash = data.actualCash;

    // optional chaining to make sure properties always exist
    data.overRings?.entries?.forEach((entry) =>
      this.overRings.add(entry.amount, entry.id),
    );
    data.expenses?.entries?.forEach((entry) =>
      this.expenses.add(entry.amount, entry.id),
    );
  }

  resetAll() {
    this.grossSales = 0;
    this.creditCardTotal = 0;
    this.actualCash = 0;

    this.overRings.resetArray();
    this.expenses.resetArray();
  }
}
