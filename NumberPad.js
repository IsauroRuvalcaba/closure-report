export default class NumberPad {
  parentContainer = null;

  constructor(keyPadElement, onUpdate) {
    this.displayValue = "";
    this.onUpdate = onUpdate;
    this.keyPadElement = keyPadElement;
  }

  // The switchboard
  setTarget(initialValue, updateCallback) {
    // This method will adjust the current input based on where focus is replacing the below dependency injection callback in AppInterface.
    // (val) => { this.report.grossSales = val; this.render(); }
    this.displayValue = initialValue === "0" ? "" : initialValue.toString();
    this.onUpdate = updateCallback;
  }

  handleTap(digit) {
    if (this.displayValue.includes(".") && digit === ".") return;

    const isValidChar = (digit) => /[0-9.]/.test(digit);
    if (isValidChar(digit)) {
      this.displayValue += digit;
    }
  }

  backspace() {
    if (this.displayValue.length > 0) {
      this.displayValue = this.displayValue.slice(0, -1);
    }
  }

  clear() {
    this.displayValue = "";
  }

  render() {
    const keypad = document.createElement("div");
    keypad.classList.add("keypad", "hidden");

    this.parentContainer = keypad;

    const funcKeys = document.createElement("div");
    funcKeys.classList.add("funcKeys");
    const numpad = document.createElement("div");
    numpad.classList.add("numpad");

    // for (let i = 1; i <= 9; i++) {
    //   const button = document.createElement("button");
    //   button.textContent = i;
    //   button.classList.add("num");
    //   numpad.appendChild(button);
    // }
    for (let i = 9; i >= 0; i--) {
      let num;

      if (i === 0) {
        num = 0;
      } else {
        const r = Math.floor((9 - i) / 3); // row index 0–2
        const c = (9 - i) % 3; // column index 0–2
        num = 7 - 3 * r + c;
      }
      const button = document.createElement("button");
      button.textContent = num;
      button.classList.add("num");
      numpad.appendChild(button);

      // console.log(num);
    }

    let pButton = document.createElement("button");
    pButton.textContent = ".";
    pButton.classList.add("num", "period");
    // pButton.dataset.key = "p";
    numpad.appendChild(pButton);

    const backButton = document.createElement("button");
    backButton.id = "backB";
    backButton.textContent = "<=";
    funcKeys.appendChild(backButton);

    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear";
    clearButton.id = "clear";
    funcKeys.appendChild(clearButton);
    this.setupEventListeners();

    keypad.appendChild(funcKeys);
    keypad.appendChild(numpad);

    this.keyPadElement.appendChild(this.parentContainer);
  }

  show() {
    this.parentContainer.classList.remove("hidden");
  }
  hide() {
    this.parentContainer.classList.add("hidden");
  }

  setupEventListeners() {
    if (this.parentContainer) {
      this.parentContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("num")) {
          const buttonText = e.target.innerText;
          this.handleTap(buttonText);
          this.onUpdate(this.displayValue);
        }

        if (e.target.id === "clear") {
          this.clear();
          this.onUpdate(this.displayValue);
        }
        if (e.target.id === "backB") {
          this.backspace();
          this.onUpdate(this.displayValue);
        }
      });
    }
  }
}
