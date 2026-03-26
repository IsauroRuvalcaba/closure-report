import ClosureReport from "./ClosureReport.js";

export default class ReportManager {
  constructor() {
    this.reports = [];
  }

  addDayReport(rdate, reportData) {
    const foundReport = this.reports.find(
      (rdata) => rdata.openingDate === rdate,
    );

    if (foundReport) {
      foundReport.data = reportData.data;
    } else {
      const newReport = { openingDate: rdate, data: reportData };
      this.reports.push(newReport);
    }
  }
}

const sampleDataV2 = [
  {
    openingDate: "4/28/2026",
    data: {
      grossSales: 4854.23,
      creditCardTotal: 4325.2,
      actualCash: 450,
      overRings: {
        entries: [
          { id: 1774395275495, amount: 2.02 },
          { id: 1774395286119, amount: 15.06 },
          { id: 1774395293175, amount: 2 },
        ],
      },
      expenses: { entries: [{ id: 1774395303655, amount: 65 }] },
    },
  },
];

const sampleDataV1 = {
  grossSales: 4854.23,
  creditCardTotal: 4325.2,
  actualCash: 450,
  overRings: {
    entries: [
      { id: 1774395275495, amount: 2.02 },
      { id: 1774395286119, amount: 15.06 },
      { id: 1774395293175, amount: 2 },
    ],
  },
  expenses: { entries: [{ id: 1774395303655, amount: 65 }] },
};
