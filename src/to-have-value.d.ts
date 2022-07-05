import type { MatcherResult } from "./types";

/**
 * @description
 * Check whether the given form element has the specified value.
 *
 * Accepts `<input>`, `<select>`, and `<textarea>` elements with the exception
 * of `<input type="checkbox">` and `<input type="radiobox">`, which can be
 * matched only using
 * [toBeChecked](https://github.com/testing-library/jest-dom#tobechecked) or
 * [toHaveFormValues](https://github.com/testing-library/jest-dom#tohaveformvalues).
 * @example
 * <input
 *   type="number"
 *   value="5"
 *   data-testid="input-number" />
 *
 * const numberInput = getByTestId('input-number')
 * expect(numberInput).toHaveValue(5)
 * @see [testing-library/jest-dom#tohavevalue](https://github.com/testing-library/jest-dom#tohavevalue)
 */
export function toHaveValue(
  formElement: Element,
  value?: string | string[] | number | null
): MatcherResult;
