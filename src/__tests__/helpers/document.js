import { JSDOM } from "jsdom";

/** @type {Document} */
let document;
if (global.document) {
  document = global.document;
} else {
  const { window } = new JSDOM();
  document = window.document;
}

export default document;
