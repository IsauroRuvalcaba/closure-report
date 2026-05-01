export default class CaledarGenerator {
  constructor(year, month) {
    this.year = year;
    this.month = month;
    this.calGrid = new Array(6).fill(null).map(() => new Array(7).fill(0));
  }

  logGrid() {
    console.log(this.calGrid);
  }
}
