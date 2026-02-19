import ClosureReport from "./ClosureReport.js";
export default class AppInterface {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.report = new ClosureReport(0, 0, 0);
    this.grossSales = document.getElementById("sales");
    this.overRingsList = document.getElementById("overring-list");
    this.btnAddOverring = document.getElementById("add-overring");
    this.netSales = document.getElementById("net-sales");
    this.expenseList = document.getElementById("expense-list");
    this.btnAddExpense = document.getElementById("add-expense");
    this.netCash = document.getElementById("net-cash");
    this.creditCards = document.getElementById("credit-cards");
    this.totalCash = document.getElementById("total-cash");
    this.totalDrawer = document.getElementById("total-drawer");
    this.discrepancy = document.getElementById("discrepancy");
  }

  setupEventListeners() {
    this.grossSales.addEventListener("input", (e) => {
      this.report.grossSales = parseFloat(e.target.value);

      this.render();
    });

    this.netCash.addEventListener("input", (e) => {
      this.report.actualCash = parseFloat(e.target.value);

      this.render();
    });

    this.creditCards.addEventListener("input", (e) => {
      this.report.creditCardTotal = parseFloat(e.target.value);

      this.render();
    });

    this.btnAddOverring.addEventListener("click", (e) => {
      let overRing = prompt("Add overring amount");
      let overRingNum = Number(overRing);
      if (overRingNum > 0 && !Number.isNaN(overRingNum)) {
        this.report.overRings.add(overRingNum);
      } else {
        alert("Please enter a number greater than zero");
      }
    });

    this.btnAddExpense.addEventListener("click", (e) => {
      let expense = prompt("Add expense amount");
      let expenseValue = Number(expense);
      if (expenseValue > 0 && !Number.isNaN(expenseValue)) {
        this.report.expenses.add(expenseValue);
      } else {
        alert("Please enter a number greater than zero");
      }
    });
  }
}
