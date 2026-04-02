import ClosureReport from "./ClosureReport.js";
import NumberPad from "./NumberPad.js";
import ReportManager from "./ReportManager.js";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
export default class AppInterface {
  constructor(rootElement) {
    this.root = rootElement;
    this.report = new ClosureReport(0, 0, 0);

    this.reportManager = new ReportManager();

    this.keypad = document.querySelector(".keypad-container");
    this.numpad = new NumberPad(this.keypad, () => {});

    // this.reportDate = new Date().toISOString().split("T")[0];
    this.reportDate = this.getLocalIsoDate();
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
    this.calendar = document.querySelector("#calendar");
    this.saveDiv = document.querySelector(".save");
    this.delRecord = document.querySelector(".delRecord");
    this.uIDate = document.querySelector("#uIDate");
    this.setupEventListeners();
    this.addDateToUI();
  }

  addDateToUI() {
    // .toISOString().split("T")[0]
    this.uIDate.innerText = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    }).format(new Date(this.reportDate + "T00:00:00"));

    // new Date().toISOString().split("T")[0];
  }

  getLocalIsoDate() {
    const today = new Date();
    const year = today.getFullYear();
    // Months are 0-indexed, so add 1
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  clearInputs() {
    this.grossSales.value = "";
    this.creditCards.value = "";
    this.totalCash.value = "";
  }

  populateState() {
    this.grossSales.value = this.report.grossSales;
    this.creditCards.value = this.report.creditCardTotal;

    this.totalCash.value = this.report.actualCash;
  }

  setupEventListeners() {
    this.calendar.addEventListener("change", (e) => {
      this.clearInputs();
      this.reportDate = e.target.value;
      this.addDateToUI();
      const savedData = this.reportManager.getDateReportData(this.reportDate);

      if (savedData) {
        this.report.loadState(savedData.data);
        this.populateState();
      } else {
        this.report.resetAll();
      }

      this.render();
    });

    this.grossSales.addEventListener("input", (e) => {
      this.report.grossSales = parseFloat(e.target.value) || 0;

      this.render();
    });
    this.grossSales.addEventListener("focus", () => {
      // ensure keypad only shows up in desktop view - also in css
      if (window.innerWidth <= 768) {
        this.numpad.show();

        this.numpad.setTarget(this.grossSales.value, (newVal) => {
          this.grossSales.value = newVal;

          // Manually trigger the 'input' event so the logic above runs
          this.grossSales.dispatchEvent(new Event("input"));
        });
      }
    });

    this.totalCash.addEventListener("input", (e) => {
      this.report.actualCash = parseFloat(e.target.value) || 0;

      this.render();
    });
    this.totalCash.addEventListener("focus", () => {
      // ensure keypad only shows up in desktop view - also in css
      if (window.innerWidth <= 768) {
        this.numpad.show();
        this.numpad.setTarget(this.totalCash.value, (newVal) => {
          this.totalCash.value = newVal;

          // these are needed when an actual program is inputing the value
          this.totalCash.dispatchEvent(new Event("input"));
        });
      }
    });

    this.creditCards.addEventListener("input", (e) => {
      this.report.creditCardTotal = parseFloat(e.target.value) || 0;

      this.render();
    });
    this.creditCards.addEventListener("focus", () => {
      // ensure keypad only shows up in desktop view - also in css
      if (window.innerWidth <= 768) {
        this.numpad.show();
        this.numpad.setTarget(this.creditCards.value, (newVal) => {
          this.creditCards.value = newVal;

          this.creditCards.dispatchEvent(new Event("input"));
        });
      }
    });

    // For the Over-ring input
    this.inputORing.addEventListener("focus", () => {
      // ensure keypad only shows up in desktop view - also in css
      if (window.innerWidth <= 768) {
        this.numpad.show();
        this.numpad.setTarget(this.inputORing.value, (newVal) => {
          this.inputORing.value = newVal;
          // We still dispatch the event just in case you add validation later!
          this.inputORing.dispatchEvent(new Event("input"));
        });
      }
    });

    // For the Expense input
    this.inputExpense.addEventListener("focus", () => {
      // ensure keypad only shows up in desktop view - also in css
      if (window.innerWidth <= 768) {
        this.numpad.show();
        this.numpad.setTarget(this.inputExpense.value, (newVal) => {
          this.inputExpense.value = newVal;
          this.inputExpense.dispatchEvent(new Event("input"));
        });
      }
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
    this.saveDiv.addEventListener("click", (e) => {
      const data = this.report.getState();
      this.reportManager.addDayReport(this.reportDate, data);
    });

    this.delRecord.addEventListener("click", (e) => {
      if (this.reportManager.getDateReportData(this.reportDate)) {
        const userConfirmed = confirm(
          "Are you sure you want to delete this report?",
        );
        if (userConfirmed) {
          this.reportManager.deleteReport(this.reportDate);

          this.report.resetAll();
          this.clearInputs();
          this.render();
        } else {
          console.log("Deletion cancelled.");
          return false;
        }
      }
    });
  }

  render() {
    this.overRingsList.replaceChildren();
    this.expenseList.replaceChildren();

    this.netSales.innerText = currencyFormatter.format(
      this.report.getNetSales(),
    );
    this.netCash.innerText = currencyFormatter.format(
      this.report.getExpectedTotal(),
    );
    this.totalDrawer.innerText = currencyFormatter.format(
      this.report.getActualTotal(),
    );

    const diff = this.report.getDiscrepancy();
    // this.discrepancy.innerText =
    //   diff < 0 ? `-$${Math.abs(diff).toFixed(2)}` : `$${diff.toFixed(2)}`;

    this.discrepancy.innerText = currencyFormatter.format(diff);

    if (diff < 0) {
      discrepancy.classList.add("text-danger");
      discrepancy.classList.remove("text-success");
    } else if (diff > 0) {
      discrepancy.classList.add("text-success");
      discrepancy.classList.remove("text-danger");
    } else {
      discrepancy.classList.remove("text-danger", "text-success");
    }

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

        const btn = document.createElement("button");
        btn.classList.add(`${listType}-del-btn`, "exp-btn");
        btn.innerHTML = '<i class="bi bi-trash3"></i>';
        li.appendChild(btn);

        const liText = document.createElement("span");
        liText.style.display = "inline-block";
        liText.style.minWidth = "8ch";
        liText.innerText = currencyFormatter.format(entry.amount);
        li.appendChild(liText);

        entryEl.appendChild(li);
      });
    }
  }
}
