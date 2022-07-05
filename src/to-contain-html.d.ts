import type { MatcherResult } from "./types";

/**
 * @description
 * Assert whether a string representing a HTML element is contained in another element.
 * @example
 * <span data-testid="parent"><span data-testid="child"></span></span>
 *
 * expect(getByTestId('parent')).toContainHTML('<span data-testid="child"></span>')
 * @see
 * [testing-library/jest-dom#tocontainhtml](https://github.com/testing-library/jest-dom#tocontainhtml)
 */
export function toContainHTML(
  element: Element,
  htmlText: string
): MatcherResult;
