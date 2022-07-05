import type { MatcherResult } from "./types";

/**
 * @description
 * Assert whether an element has content or not.
 * @example
 * <span data-testid="not-empty">
 *   <span data-testid="empty"></span>
 * </span>
 *
 * expect(getByTestId('empty')).toBeEmptyDOMElement()
 * expect(getByTestId('not-empty')).not.toBeEmptyDOMElement()
 * @see
 * [testing-library/jest-dom#tobeemptydomelement](https://github.com/testing-library/jest-dom#tobeemptydomelement)
 */
export function toBeEmptyDOMElement(element: Element): MatcherResult;
