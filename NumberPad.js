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
    const numpad = document.createElement("div");

    for (let i = 9; i >= 0; i--) {
      const button = document.createElement("button");
      button.textContent = i;
      button.classList.add("num");
      // button.dataset.key = i;
      numpad.appendChild(button);
    }

    let pButton = document.createElement("button");
    pButton.textContent = ".";
    pButton.classList.add("num");
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
