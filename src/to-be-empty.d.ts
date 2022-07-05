import type { MatcherResult } from "./types";

/**
 * @deprecated
 * since v5.9.0
 * @description
 * Assert whether an element has content or not.
 * @example
 * <span data-testid="not-empty">
 *   <span data-testid="empty"></span>
 * </span>
 *
 * expect(getByTestId('empty')).toBeEmpty()
 * expect(getByTestId('not-empty')).not.toBeEmpty()
 * @see
 * [testing-library/jest-dom#tobeempty](https://github.com/testing-library/jest-dom#tobeempty)
 */
export function toBeEmpty(element: Element): MatcherResult;
