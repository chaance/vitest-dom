import type { MatcherResult } from "./types";

/**
 * @description
 * Assert whether an element has focus or not.
 * @example
 * <div>
 *   <input type="text" data-testid="element-to-focus" />
 * </div>
 *
 * const input = getByTestId('element-to-focus')
 * input.focus()
 * expect(input).toHaveFocus()
 * input.blur()
 * expect(input).not.toHaveFocus()
 * @see [testing-library/jest-dom#tohavefocus](https://github.com/testing-library/jest-dom#tohavefocus)
 */
export function toHaveFocus(element: Element): MatcherResult;
