// @ts-expect-error
import { JSDOM } from "jsdom";

let document: Document;
if (global.document) {
  document = global.document;
} else {
  const { window } = new JSDOM();
  document = window.document;
}

export default document;
