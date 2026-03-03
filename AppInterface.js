import ClosureReport from "./ClosureReport.js";
import NumberPad from "./NumberPad.js";
export default class AppInterface {
  constructor(rootElement) {
    this.root = rootElement;
    this.report = new ClosureReport(0, 0, 0);

    this.keypad = document.querySelector(".keypad-container");
    this.numpad = new NumberPad(this.keypad, () => {});
    this.numpad.render();

    this.grossSales = this.root.querySelector("#sales");
    this.overRingsList = this.root.querySelector("#overring-list");
    this.inputORing = this.root.querySelector("#over-ring");
    this.btnAddOverring = this.root.querySelector("#add-overring");
    this.netSales = this.root.querySelector("#net-sales");
    this.expenseList = this.root.querySelector("#expense-list");
    this.inputExpense = this.root.querySelector("#expense");
    this.btnAddExpense = this.root.querySelector("#add-expense");
    this.netCash = this.root.querySelector("#net-cash");
    this.creditCards = this.root.querySelector("#credit-cards");
    this.totalCash = this.root.querySelector("#total-cash");
    this.totalDrawer = this.root.querySelector("#total-drawer");
    this.discrepancy = this.root.querySelector("#discrepancy");
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.grossSales.addEventListener("input", (e) => {
      this.report.grossSales = parseFloat(e.target.value);

      this.render();
    });
    this.grossSales.addEventListener("focus", () => {
      this.numpad.show();
      this.numpad.setTarget(this.grossSales.value, (newVal) => {
        this.grossSales.value = newVal;

        // Manually trigger the 'input' event so the logic above runs
        this.grossSales.dispatchEvent(new Event("input"));
      });
    });

    this.totalCash.addEventListener("input", (e) => {
      this.report.actualCash = parseFloat(e.target.value);

      this.render();
    });
    this.totalCash.addEventListener("focus", () => {
      this.numpad.show();
      this.numpad.setTarget(this.totalCash.value, (newVal) => {
        this.totalCash.value = newVal;

        // these are needed when an actual program is inputing the value
        this.totalCash.dispatchEvent(new Event("input"));
      });
    });

    this.creditCards.addEventListener("input", (e) => {
      this.report.creditCardTotal = parseFloat(e.target.value);

      this.render();
    });
    this.creditCards.addEventListener("focus", () => {
      this.numpad.show();
      this.numpad.setTarget(this.creditCards.value, (newVal) => {
        this.creditCards.value = newVal;

        this.creditCards.dispatchEvent(new Event("input"));
      });
    });

    // For the Over-ring input
    this.inputORing.addEventListener("focus", () => {
      this.numpad.show();
      this.numpad.setTarget(this.inputORing.value, (newVal) => {
        this.inputORing.value = newVal;
        // We still dispatch the event just in case you add validation later!
        this.inputORing.dispatchEvent(new Event("input"));
      });
    });

    // For the Expense input
    this.inputExpense.addEventListener("focus", () => {
      this.numpad.show();
      this.numpad.setTarget(this.inputExpense.value, (newVal) => {
        this.inputExpense.value = newVal;
        this.inputExpense.dispatchEvent(new Event("input"));
      });
    });

    this.root.addEventListener("click", (e) => {
      if (e.target.classList.contains("oRing-del-btn")) {
        e.stopPropagation();
        const id = e.target.closest("li").dataset.id;

        this.report.overRings.remove(id);
        e.target.closest("li").remove();
        this.render();
      }
      if (e.target.classList.contains("exp-del-btn")) {
        e.stopPropagation();
        const id = e.target.closest("li").dataset.id;

        this.report.expenses.remove(id);
        e.target.closest("li").remove();
        this.render();
      }
    });

    this.btnAddOverring.addEventListener("click", (e) => {
      // let overRing = prompt("Add overring amount");
      let overRing = this.inputORing.value;
      let overRingNum = Number(overRing);
      if (overRingNum > 0 && !Number.isNaN(overRingNum)) {
        this.report.overRings.add(overRingNum);
        this.inputORing.value = "";
        this.render();
      } else {
        alert("Please enter a number greater than zero");
        this.inputORing.value = "";
      }
    });

    this.btnAddExpense.addEventListener("click", (e) => {
      let expense = this.inputExpense.value;
      let expenseValue = Number(expense);
      if (expenseValue > 0 && !Number.isNaN(expenseValue)) {
        this.report.expenses.add(expenseValue);
        this.inputExpense.value = "";
        this.render();
      } else {
        alert("Please enter a number greater than zero");
        this.inputExpense.value = "";
      }
    });

    // Hide numpad
    document.addEventListener("click", (e) => {
      const isInput = e.target.tagName === "INPUT";
      const isKeypad = this.keypad.contains(e.target);

      // If the user clicked something that ISN'T an input
      // and ISN'T the keypad itself... hide it!
      if (!isInput && !isKeypad) {
        this.numpad.hide();
      }
    });
  }

  render() {
    this.overRingsList.replaceChildren();
    this.expenseList.replaceChildren();

    this.netSales.innerText = this.report.getNetSales().toFixed(2);
    this.netCash.innerText = this.report.getExpectedTotal().toFixed(2);
    this.totalDrawer.innerText = this.report.getActualTotal().toFixed(2);
    this.discrepancy.innerText = this.report.getDiscrepancy().toFixed(2);

    this.renderList(
      "oRing",
      this.overRingsList,
      this.report.overRings.getList(),
    );
    this.renderList("exp", this.expenseList, this.report.expenses.getList());
  }

  renderList(listType, entryEl, entryList) {
    entryEl.replaceChildren();
    if (entryList.length > 0) {
      entryList.forEach((entry, index) => {
        const li = document.createElement("li");
        li.dataset.id = entry.id;
        li.innerText = entry.amount.toFixed(2);
        const btn = document.createElement("button");
        btn.classList.add(`${listType}-del-btn`, "exp-btn");
        btn.innerHTML = '<i class="bi bi-trash3"></i>';
        li.appendChild(btn);
        entryEl.appendChild(li);
      });
    }
  }
}
