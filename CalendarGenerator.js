export default class CaledarGenerator {
  constructor(year, month) {
    this.year = year;
    this.month = month;
    this.currMDate = new Date(this.year, this.month - 1, 1);
    this.startCol = this.currMDate.getDay();
    this.monthLength = new Date(
      this.currMDate.setMonth(this.currMDate.getMonth() + 1, 0),
    ).getDate();
    this.prevMDate = new Date(this.year, this.month - 1, 0).getDate();
    this.calGrid = new Array(6 * 7).fill(null);
    this.calSetup();
  }

  logGrid() {
    console.log(this.calGrid);
  }

  // getDateInfo(dateVal, direction) {
  //   const dateValue =
  //     dateVal === "month"
  //       ? getMonth()
  //       : dateVal === "year"
  //         ? getFullYear()
  //         : null;
  //   const direct = direction === "prev" ? -1 : direction === "post" ? 1 : null;

  //   return new Date(this.currMDate.setMonth(this.currMDate.getMonth() + direct))
  //     .dateValue;
  // }

  getDateInfo(dateVal, direction) {
    // choose a getter function that accepts a Date and returns the requested value
    const getter =
      dateVal === "month"
        ? (d) => d.getMonth()
        : dateVal === "year"
          ? (d) => d.getFullYear()
          : null;

    // compute direction: prev -> -1, post -> +1, otherwise 0
    const direct = direction === "prev" ? -1 : direction === "post" ? 1 : 0;

    if (!getter) return null;

    // const fixedDate = new Date(this.year, this.month - 1, 1);
    // clone current month date so we don't mutate original unintentionally
    // const base = new Date(this.currMDate.getTime());
    const base = new Date(this.year, this.month - 1, 1);

    // shift month (setMonth handles month overflow)
    base.setMonth(base.getMonth() + direct);

    // return the requested value from the adjusted date
    return getter(base);
  }

  calSetup() {
    let preMDayStart = this.prevMDate - (this.startCol - 1);
    const totPreCurDays = this.startCol + this.monthLength;
    const prevMoYear = this.getDateInfo("year", "prev");
    const nextMoYear = this.getDateInfo("year", "post");
    const prevMoMo = this.getDateInfo("month", "prev") + 1;
    const nextMoMo = this.getDateInfo("month", "post") + 1;

    let endBuffer = 0;

    for (let i = 0; i < this.startCol; i++) {
      this.calGrid[i] = {
        dayNumber: preMDayStart,
        isCurrentMonth: false,
        fullDateString: `${prevMoYear}-${prevMoMo.toString().padStart(2, "0")}-${preMDayStart.toString().padStart(2, "0")}`,
      };

      preMDayStart++;
    }

    for (let i = this.startCol; i < this.monthLength + this.startCol; i++) {
      // this.calGrid[i] = i - this.startCol + 1;
      this.calGrid[i] = {
        dayNumber: i - this.startCol + 1,
        isCurrentMonth: true,
        fullDateString: `${this.year}-${this.month.toString().padStart(2, "0")}-${(i - this.startCol + 1).toString().padStart(2, "0")}`,
      };
    }

    for (let i = totPreCurDays; i < 42; i++) {
      endBuffer++;
      // this.calGrid[i] = endBuffer;
      this.calGrid[i] = {
        dayNumber: endBuffer,
        isCurrentMonth: false,
        fullDateString: `${nextMoYear}-${nextMoMo.toString().padStart(2, "0")}-${endBuffer.toString().padStart(2, "0")}`,
      };
    }
  }
}
