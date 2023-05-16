import redent from "redent";
import cssParse from "./css-parse";
import { isEqual } from "lodash-es";
import type { MatcherFn } from "./types";

interface ErrorContext {
  utils: {
    printWithType(
      name: string,
      received: unknown,
      print: (val: unknown) => string
    ): string;
    printReceived(val: unknown): string;
    matcherHint(
      matcherName: string,
      received: string,
      expected?: string,
      options?: { secondArgument?: string; isDirectExpectCall?: boolean }
    ): string;
    stringify(val: unknown): string;
    RECEIVED_COLOR(str: string): string;
    EXPECTED_COLOR(str: string): string;
  };
  isNot?: boolean;
}

class GenericTypeError<Ctx extends ErrorContext = any> extends Error {
  constructor(
    expectedString: string,
    received: HTMLElement,
    matcherFn: MatcherFn,
    context: Ctx
  ) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, matcherFn);
    }
    let withType = "";
    try {
      withType = context.utils.printWithType(
        "Received",
        received,
        context.utils.printReceived
      );
    } catch (e) {
      // Can throw for Document:
      // https://github.com/jsdom/jsdom/issues/2304
    }
    this.message = [
      context.utils.matcherHint(
        `${context.isNot ? ".not" : ""}.${matcherFn.name}`,
        "received",
        ""
      ),
      "",
      `${context.utils.RECEIVED_COLOR(
        "received"
      )} value must ${expectedString}.`,
      withType,
    ].join("\n");
  }
}

class HtmlElementTypeError<
  Ctx extends ErrorContext = any
> extends GenericTypeError<Ctx> {
  constructor(element: HTMLElement, matcherFn: MatcherFn, context: Ctx) {
    super("be an HTMLElement or an SVGElement", element, matcherFn, context);
  }
}

class NodeTypeError<
  Ctx extends ErrorContext = any
> extends GenericTypeError<Ctx> {
  constructor(element: HTMLElement, matcherFn: MatcherFn, context: Ctx) {
    super("be a Node", element, matcherFn, context);
  }
}

function checkHasWindow<Ctx extends ErrorContext = any>(
  htmlElement: HTMLElement,
  ErrorClass: typeof HtmlElementTypeError | typeof NodeTypeError,
  matcherFn: MatcherFn,
  context: Ctx
): asserts htmlElement is HTMLElement & {
  ownerDocument: Document & { defaultView: Window };
} {
  if (
    !htmlElement ||
    !htmlElement.ownerDocument ||
    !htmlElement.ownerDocument.defaultView
  ) {
    throw new ErrorClass(htmlElement, matcherFn, context);
  }
}

function checkNode<Ctx extends ErrorContext = any>(
  node: HTMLElement,
  matcherFn: MatcherFn,
  context: Ctx
) {
  checkHasWindow(node, NodeTypeError, matcherFn, context);
  const window = node.ownerDocument.defaultView;
  if (!(node instanceof window!.Node)) {
    throw new NodeTypeError(node, matcherFn, context);
  }
}

function checkHtmlElement<Ctx extends ErrorContext = any>(
  htmlElement: HTMLElement,
  matcher: MatcherFn,
  context: Ctx
) {
  checkHasWindow(htmlElement, HtmlElementTypeError, matcher, context);
  const window = htmlElement.ownerDocument.defaultView;

  if (
    !(htmlElement instanceof window.HTMLElement) &&
    // @ts-expect-error
    !(htmlElement instanceof window.SVGElement)
  ) {
    throw new HtmlElementTypeError(htmlElement, matcher, context);
  }
}

class InvalidCSSError<Ctx extends ErrorContext = any> extends Error {
  constructor(
    received: {
      message: string;
      css: string;
    },
    matcherFn: MatcherFn,
    context: Ctx
  ) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, matcherFn);
    }
    this.message = [
      received.message,
      "",
      context.utils.RECEIVED_COLOR(`Failing css:`),
      context.utils.RECEIVED_COLOR(`${received.css}`),
    ].join("\n");
  }
}

function parseCSS<Ctx extends ErrorContext = any>(
  css: string,
  matcherFn: MatcherFn,
  context: Ctx
) {
  const ast = cssParse(`selector { ${css} }`, { silent: true }).stylesheet;

  if (ast.parsingErrors && ast.parsingErrors.length > 0) {
    const { reason, line } = ast.parsingErrors[0];

    throw new InvalidCSSError(
      {
        css,
        message: `Syntax error parsing expected css: ${reason} on line: ${line}`,
      },
      matcherFn,
      context
    );
  }

  const parsedRules = (ast.rules[0].declarations as any[])
    .filter((d: any) => d.type === "declaration")
    .reduce(
      (obj: any, { property, value }) =>
        Object.assign(obj, { [property]: value }),
      {} as Record<"property" | "value", string>
    );
  return parsedRules;
}

function display(context: ErrorContext, value: unknown) {
  return typeof value === "string" ? value : context.utils.stringify(value);
}

function getMessage(
  context: ErrorContext,
  matcher: MatcherFn,
  expectedLabel: string,
  expectedValue: any,
  receivedLabel: string,
  receivedValue: any
) {
  return [
    `${matcher}\n`,
    `${expectedLabel}:\n${context.utils.EXPECTED_COLOR(
      redent(display(context, expectedValue), 2)
    )}`,
    `${receivedLabel}:\n${context.utils.RECEIVED_COLOR(
      redent(display(context, receivedValue), 2)
    )}`,
  ].join("\n");
}

function matches(textToMatch: string, matcher: MatcherFn) {
  if (matcher instanceof RegExp) {
    return matcher.test(textToMatch);
  } else {
    return textToMatch.includes(String(matcher));
  }
}

function deprecate(name: string, replacementText: string) {
  // Notify user that they are using deprecated functionality.
  // eslint-disable-next-line no-console
  console.warn(
    `Warning: ${name} has been deprecated and will be removed in future updates.`,
    replacementText
  );
}

function normalize(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function getTag(element: Element) {
  return element.tagName && element.tagName.toLowerCase();
}

function getSelectValue({ multiple, options }: HTMLSelectElement) {
  const selectedOptions = [...options].filter((option) => option.selected);

  if (multiple) {
    return [...selectedOptions].map((opt) => opt.value);
  }

  if (selectedOptions.length === 0) {
    return undefined; // Couldn't make this happen, but just in case
  }
  return selectedOptions[0].value;
}

function getInputValue(inputElement: HTMLInputElement) {
  switch (inputElement.type) {
    case "number":
      return inputElement.value === "" ? null : Number(inputElement.value);
    case "checkbox":
      return inputElement.checked;
    default:
      return inputElement.value;
  }
}

function getSingleElementValue(element: undefined | null): undefined;
function getSingleElementValue(
  element: HTMLInputElement
): ReturnType<typeof getInputValue>;
function getSingleElementValue(
  element: HTMLSelectElement
): ReturnType<typeof getSelectValue>;
function getSingleElementValue(
  element: HTMLMeterElement | HTMLProgressElement | HTMLLIElement
): number;
function getSingleElementValue(
  element:
    | HTMLButtonElement
    | HTMLDataElement
    | HTMLOptionElement
    | HTMLOutputElement
    | HTMLTextAreaElement
): string;
function getSingleElementValue(element: Element): unknown;

function getSingleElementValue(element: Element | undefined | null) {
  if (!element) {
    return undefined;
  }
  switch (element.tagName.toLowerCase()) {
    case "input":
      return getInputValue(element as HTMLInputElement);
    case "select":
      return getSelectValue(element as HTMLSelectElement);
    default:
      return (element as any).value;
  }
}

function compareArraysAsSet(a: unknown, b: unknown) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return isEqual(new Set(a), new Set(b));
  }
  return undefined;
}

function toSentence(
  array: string[],
  { wordConnector = ", ", lastWordConnector = " and " } = {}
) {
  return [array.slice(0, -1).join(wordConnector), array[array.length - 1]].join(
    array.length > 1 ? lastWordConnector : ""
  );
}

export {
  HtmlElementTypeError,
  NodeTypeError,
  checkHtmlElement,
  checkNode,
  parseCSS,
  deprecate,
  getMessage,
  matches,
  normalize,
  getTag,
  getSingleElementValue,
  compareArraysAsSet,
  toSentence,
};
