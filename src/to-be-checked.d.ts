import type { MatcherResult } from "./types";

/**
 * @description
 * Assert whether the given element is checked.
 *
 * It accepts an `input` of type `checkbox` or `radio` and elements with a `role` of `radio` with a valid
 * `aria-checked` attribute of "true" or "false".
 * @example
 * <input
 *   type="checkbox"
 *   checked
 *   data-testid="input-checkbox" />
 * <input
 *   type="radio"
 *   value="foo"
 *   data-testid="input-radio" />
 *
 * const inputCheckbox = getByTestId('input-checkbox')
 * const inputRadio = getByTestId('input-radio')
 * expect(inputCheckbox).toBeChecked()
 * expect(inputRadio).not.toBeChecked()
 * @see
 * [testing-library/jest-dom#tobechecked](https://github.com/testing-library/jest-dom#tobechecked)
 */
export function toBeChecked(element: Element): MatcherResult;
