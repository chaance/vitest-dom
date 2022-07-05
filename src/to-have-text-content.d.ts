import type { MatcherResult } from "./types";

/**
 * @description
 * Check whether the given element has a text content or not.
 *
 * When a string argument is passed through, it will perform a partial
 * case-sensitive match to the element content.
 *
 * To perform a case-insensitive match, you can use a RegExp with the `/i`
 * modifier.
 *
 * If you want to match the whole content, you can use a RegExp to do it.
 *
 * @example
 * <span data-testid="text-content">Text Content</span>
 *
 * const element = getByTestId('text-content')
 * expect(element).toHaveTextContent('Content')
 * // to match the whole content
 * expect(element).toHaveTextContent(/^Text Content$/)
 * // to use case-insentive match
 * expect(element).toHaveTextContent(/content$/i)
 * expect(element).not.toHaveTextContent('content')
 * @see [testing-library/jest-dom#tohavetextcontent](https://github.com/testing-library/jest-dom#tohavetextcontent)
 */
export function toHaveTextContent(
  element: Element,
  text: string | RegExp,
  options?: { normalizeWhitespace: boolean }
): MatcherResult;
