import { checkHtmlElement, deprecate } from "./utils";

export function toBeInTheDOM(element, container) {
  deprecate(
    "toBeInTheDOM",
    "Please use toBeInTheDocument for searching the entire document and toContainElement for searching a specific container.",
  );

  if (element) {
    checkHtmlElement(element, toBeInTheDOM, this);
  }

  if (container) {
    checkHtmlElement(container, toBeInTheDOM, this);
  }

  return {
    pass: container ? container.contains(element) : !!element,
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeInTheDOM`,
          "element",
          "",
        ),
        "",
        "Received:",
        `  ${this.utils.printReceived(
          element ? element.cloneNode(false) : element,
        )}`,
      ].join("\n");
    },
  };
}
