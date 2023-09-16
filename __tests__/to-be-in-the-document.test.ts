import { HtmlElementTypeError } from "../src/utils";
import document from "./helpers/document";
import { test, expect } from "vitest";

const window = document.defaultView!;
const HTMLElement = window.HTMLElement;

test(".toBeInTheDocument", () => {
  window.customElements.define(
    "custom-element",
    class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML =
          '<div data-testid="custom-element-child"></div>';
      }
    },
  );

  document.body.innerHTML = `
    <span data-testid="html-element"><span>Html Element</span></span>
    <svg data-testid="svg-element"></svg>
    <custom-element data-testid="custom-element"></custom-element>`;

  const htmlElement = document.querySelector('[data-testid="html-element"]');
  const svgElement = document.querySelector('[data-testid="svg-element"]');
  const customElementChild = document
    .querySelector('[data-testid="custom-element"]')
    ?.shadowRoot?.querySelector('[data-testid="custom-element-child"]');
  const detachedElement = document.createElement("div");
  const fakeElement = { thisIsNot: "an html element" };
  const undefinedElement = undefined;
  const nullElement = null;

  expect(htmlElement).toBeInTheDocument();
  expect(svgElement).toBeInTheDocument();
  expect(customElementChild).toBeInTheDocument();
  expect(detachedElement).not.toBeInTheDocument();
  expect(nullElement).not.toBeInTheDocument();

  // negative test cases wrapped in throwError assertions for coverage.
  const expectToBe = /expect.*\.toBeInTheDocument/;
  const expectNotToBe = /expect.*not\.toBeInTheDocument/;
  expect(() => expect(htmlElement).not.toBeInTheDocument()).toThrowError(
    expectNotToBe,
  );
  expect(() => expect(svgElement).not.toBeInTheDocument()).toThrowError(
    expectNotToBe,
  );
  expect(() => expect(detachedElement).toBeInTheDocument()).toThrowError(
    expectToBe,
  );
  expect(() => expect(fakeElement).toBeInTheDocument()).toThrowError(
    HtmlElementTypeError,
  );
  expect(() => expect(nullElement).toBeInTheDocument()).toThrowError(
    HtmlElementTypeError,
  );
  expect(() => expect(undefinedElement).toBeInTheDocument()).toThrowError(
    HtmlElementTypeError,
  );
  expect(() => expect(undefinedElement).not.toBeInTheDocument()).toThrowError(
    HtmlElementTypeError,
  );
});
