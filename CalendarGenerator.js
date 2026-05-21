export default class CaledarGenerator {
  constructor(year, month) {
    this.year = year;
    this.month = month;

    this.updateDate();

    this.calGrid = new Array(6 * 7).fill(null);
    this.calSetup();
  }

  logGrid() {
    return this.calGrid;
  }
  updateDate() {
    this.currMDate = new Date(this.year, this.month - 1, 1);
    this.startCol = this.currMDate.getDay();
    this.monthLength = new Date(this.year, this.month, 0).getDate();
    this.prevMDate = new Date(this.year, this.month - 1, 0).getDate();
  }

  changeMonth(direction) {
    if (direction === "prev") {
      this.month === 1
        ? ((this.year -= 1), (this.month = 12))
        : (this.month -= 1);
    } else if (direction === "post") {
      this.month === 12
        ? ((this.year += 1), (this.month = 1))
        : (this.month += 1);
    } else {
      return null;
    }
    this.updateDate();
    this.calSetup();
    this.logGrid();
  }

  getDateInfo(dateVal, direction) {
    if (direction === "prev") {
      if (dateVal === "year") {
        return this.month === 1 ? this.year - 1 : this.year;
      } else if (dateVal === "month") {
        return this.month === 1 ? 12 : this.month - 1;
      }
    }

    if (direction === "post") {
      if (dateVal === "year") {
        return this.month === 12 ? this.year + 1 : this.year;
      } else if (dateVal === "month") {
        return this.month === 12 ? 1 : this.month + 1;
      } else {
        return null;
      }
    }
  }

  calSetup() {
    let preMDayStart = this.prevMDate - (this.startCol - 1);
    const totPreCurDays = this.startCol + this.monthLength;
    const prevMoYear = this.getDateInfo("year", "prev");
    const prevMoMo = this.getDateInfo("month", "prev");
    const nextMoYear = this.getDateInfo("year", "post");
    const nextMoMo = this.getDateInfo("month", "post");

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
      this.calGrid[i] = {
        dayNumber: i - this.startCol + 1,
        isCurrentMonth: true,
        fullDateString: `${this.year}-${this.month.toString().padStart(2, "0")}-${(i - this.startCol + 1).toString().padStart(2, "0")}`,
      };
    }

    for (let i = totPreCurDays; i < 42; i++) {
      endBuffer++;
      this.calGrid[i] = {
        dayNumber: endBuffer,
        isCurrentMonth: false,
        fullDateString: `${nextMoYear}-${nextMoMo.toString().padStart(2, "0")}-${endBuffer.toString().padStart(2, "0")}`,
      };
    }
  }
}
