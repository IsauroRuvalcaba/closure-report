import CaledarGenerator from "./CalendarGenerator.js";
import AppInterface from "./AppInterface.js";

const rootElement = document.querySelector(".form-container");
const closeReportApp = new AppInterface(rootElement);
const calGen = new CaledarGenerator(2026, 12);

calGen.logGrid();
