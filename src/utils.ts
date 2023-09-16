import redent from "redent";
import cssParse from "./css-parse";
import isEqual from "lodash-es/isEqual";
import isFunction from "lodash-es/isFunction";
import type { MatcherFn, MatcherState } from "./types";

type ErrorUtils = MatcherState["utils"];

class GenericTypeError<State extends MatcherState> extends Error {
  constructor(
    expectedString: string,
    received: HTMLElement,
    matcherFn: MatcherFn<State>,
    context: State,
  ) {
    super();

    const printWithType =
      "printWithType" in context.utils &&
      isFunction(context.utils.printWithType)
        ? context.utils.printWithType
        : _printWithType;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, matcherFn);
    }
    let withType = "";
    try {
      withType = printWithType(
        "Received",
        received,
        context.utils.printReceived,
      );
    } catch (e) {
      // Can throw for Document:
      // https://github.com/jsdom/jsdom/issues/2304
    }
    this.message = [
      context.utils.matcherHint(
        `${context.isNot ? ".not" : ""}.${matcherFn.name}`,
        "received",
        "",
      ),
      "",
      `${context.utils.RECEIVED_COLOR(
        "received",
      )} value must ${expectedString}.`,
      withType,
    ].join("\n");
  }
}

class HtmlElementTypeError<
  State extends MatcherState = any,
> extends GenericTypeError<State> {
  constructor(
    element: HTMLElement,
    matcherFn: MatcherFn<State>,
    context: State,
  ) {
    super("be an HTMLElement or an SVGElement", element, matcherFn, context);
  }
}

class NodeTypeError<
  State extends MatcherState = any,
> extends GenericTypeError<State> {
  constructor(
    element: HTMLElement,
    matcherFn: MatcherFn<State>,
    context: State,
  ) {
    super("be a Node", element, matcherFn, context);
  }
}

function checkHasWindow<State extends MatcherState>(
  htmlElement: HTMLElement,
  ErrorClass: typeof HtmlElementTypeError<State> | typeof NodeTypeError<State>,
  matcherFn: MatcherFn<State>,
  context: State,
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

function checkNode<State extends MatcherState = any>(
  node: HTMLElement,
  matcherFn: MatcherFn,
  context: State,
) {
  checkHasWindow(node, NodeTypeError, matcherFn, context);
  const window = node.ownerDocument.defaultView;
  if (!(node instanceof window!.Node)) {
    throw new NodeTypeError(node, matcherFn, context);
  }
}

function checkHtmlElement<State extends MatcherState>(
  htmlElement: HTMLElement,
  matcher: MatcherFn<State>,
  context: State,
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

class InvalidCSSError<State extends MatcherState> extends Error {
  constructor(
    received: {
      message: string;
      css: string;
    },
    matcherFn: MatcherFn,
    context: State,
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

function parseCSS<State extends MatcherState>(
  css: string,
  matcherFn: MatcherFn,
  context: State,
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
      context,
    );
  }

  const parsedRules = (ast.rules[0].declarations as any[])
    .filter((d: any) => d.type === "declaration")
    .reduce(
      (obj: any, { property, value }) =>
        Object.assign(obj, { [property]: value }),
      {} as Record<"property" | "value", string>,
    );
  return parsedRules;
}

function display(context: MatcherState, value: unknown) {
  return typeof value === "string" ? value : context.utils.stringify(value);
}

function getMessage(
  context: MatcherState,
  matcher: string,
  expectedLabel: string,
  expectedValue: any,
  receivedLabel: string,
  receivedValue: any,
) {
  return [
    `${matcher}\n`,
    `${expectedLabel}:\n${context.utils.EXPECTED_COLOR(
      redent(display(context, expectedValue), 2),
    )}`,
    `${receivedLabel}:\n${context.utils.RECEIVED_COLOR(
      redent(display(context, receivedValue), 2),
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
    replacementText,
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
  element: HTMLInputElement,
): ReturnType<typeof getInputValue>;
function getSingleElementValue(
  element: HTMLSelectElement,
): ReturnType<typeof getSelectValue>;
function getSingleElementValue(
  element: HTMLMeterElement | HTMLProgressElement,
): number;
function getSingleElementValue(
  element:
    | HTMLButtonElement
    | HTMLDataElement
    | HTMLOptionElement
    | HTMLOutputElement
    | HTMLTextAreaElement,
): string;
function getSingleElementValue(
  element: Element,
): undefined | string | string[] | number | boolean | null;

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
  { wordConnector = ", ", lastWordConnector = " and " } = {},
) {
  return [array.slice(0, -1).join(wordConnector), array[array.length - 1]].join(
    array.length > 1 ? lastWordConnector : "",
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

function _printWithType<T>(
  name: string,
  value: T,
  print: (value: T) => string,
): string {
  const type = getType(value);
  const hasType =
    type !== "null" && type !== "undefined"
      ? `${name} has type:  ${type}\n`
      : "";
  const hasValue = `${name} has value: ${print(value)}`;
  return hasType + hasValue;
}

/**
 * https://github.com/jestjs/jest/blob/main/packages/jest-get-type/src/index.ts
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type ValueType =
  | "array"
  | "bigint"
  | "boolean"
  | "function"
  | "null"
  | "number"
  | "object"
  | "regexp"
  | "map"
  | "set"
  | "date"
  | "string"
  | "symbol"
  | "undefined";

// get the type of a value with handling the edge cases like `typeof []`
// and `typeof null`
export function getType(value: unknown): ValueType {
  if (value === undefined) {
    return "undefined";
  } else if (value === null) {
    return "null";
  } else if (Array.isArray(value)) {
    return "array";
  } else if (typeof value === "boolean") {
    return "boolean";
  } else if (typeof value === "function") {
    return "function";
  } else if (typeof value === "number") {
    return "number";
  } else if (typeof value === "string") {
    return "string";
  } else if (typeof value === "bigint") {
    return "bigint";
  } else if (typeof value === "object") {
    if (value != null) {
      if (value.constructor === RegExp) {
        return "regexp";
      } else if (value.constructor === Map) {
        return "map";
      } else if (value.constructor === Set) {
        return "set";
      } else if (value.constructor === Date) {
        return "date";
      }
    }
    return "object";
  } else if (typeof value === "symbol") {
    return "symbol";
  }

  throw new Error(`value of unknown type: ${value}`);
}

export const isPrimitive = (value: unknown): boolean => Object(value) !== value;
