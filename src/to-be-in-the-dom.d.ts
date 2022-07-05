import type { MatcherResult } from "./types";

/**
 * @deprecated
 * since v1.9.0
 * @description
 * Assert whether a value is a DOM element, or not. Contrary to what its name
 * implies, this matcher only checks that you passed to it a valid DOM
 * element.
 *
 * It does not have a clear definition of what "the DOM" is. Therefore, it
 * does not check whether that element is contained anywhere.
 * @see [testing-library/jest-dom#toBeInTheDom](https://github.com/testing-library/jest-dom#toBeInTheDom)
 */
export function toBeInTheDOM(
  element: Element,
  container?: HTMLElement | SVGElement
): MatcherResult;
