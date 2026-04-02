export default class ReportManager {
  constructor() {
    this.reports = [];
    this.loadReports();
  }

  getDateReportData(rdate) {
    return this.reports.find((rdata) => rdata.openingDate === rdate);
  }

  addDayReport(rdate, reportData) {
    const foundReportIndex = this.reports.findIndex(
      (rdata) => rdata.openingDate === rdate,
    );

    if (foundReportIndex !== -1) {
      const updateReportObject = { openingDate: rdate, data: reportData };
      this.reports[foundReportIndex] = updateReportObject;
    } else {
      const newReport = { openingDate: rdate, data: reportData };
      this.reports.push(newReport);
    }
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem("closingReportsData", JSON.stringify(this.reports));
  }

  loadReports() {
    const storedReports = localStorage.getItem("closingReportsData");

    if (storedReports) {
      const retrieveReports = JSON.parse(storedReports);
      this.reports = retrieveReports;
    }
  }

  deleteReport(rDate) {
    if (this.getDateReportData(rDate)) {
      this.reports = this.reports.filter(
        (report) => report.openingDate !== rDate,
      );
      this.saveToLocalStorage();
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
