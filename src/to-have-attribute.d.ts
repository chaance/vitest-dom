import type { MatcherResult } from "./types";

/**
 * @description
 * Allows you to check if a given element has an attribute or not.
 *
 * You can also optionally check that the attribute has a specific expected value or partial match using
 * [expect.stringContaining](https://jestjs.io/docs/en/expect.html#expectnotstringcontainingstring) or
 * [expect.stringMatching](https://jestjs.io/docs/en/expect.html#expectstringmatchingstring-regexp).
 * @example
 * <button
 *   data-testid="ok-button"
 *   type="submit"
 *   disabled
 * >
 *   ok
 * </button>
 *
 * expect(button).toHaveAttribute('disabled')
 * expect(button).toHaveAttribute('type', 'submit')
 * expect(button).not.toHaveAttribute('type', 'button')
 * @see
 * [testing-library/jest-dom#tohaveattribute](https://github.com/testing-library/jest-dom#tohaveattribute)
 */
export function toHaveAttribute(
  element: Element,
  attr: string,
  value?: unknown
): MatcherResult;
