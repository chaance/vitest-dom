import type { MatcherResult } from "./types";

/**
 * @description
 * This allows you to check whether the given element is partially checked.
 * It accepts an input of type checkbox and elements with a role of checkbox
 * with a aria-checked="mixed", or input of type checkbox with indeterminate
 * set to true
 *
 * @example
 * <input type="checkbox" aria-checked="mixed" data-testid="aria-checkbox-mixed" />
 * <input type="checkbox" checked data-testid="input-checkbox-checked" />
 * <input type="checkbox" data-testid="input-checkbox-unchecked" />
 * <div role="checkbox" aria-checked="true" data-testid="aria-checkbox-checked" />
 * <div
 *   role="checkbox"
 *   aria-checked="false"
 *   data-testid="aria-checkbox-unchecked"
 * />
 * <input type="checkbox" data-testid="input-checkbox-indeterminate" />
 *
 * const ariaCheckboxMixed = getByTestId('aria-checkbox-mixed')
 * const inputCheckboxChecked = getByTestId('input-checkbox-checked')
 * const inputCheckboxUnchecked = getByTestId('input-checkbox-unchecked')
 * const ariaCheckboxChecked = getByTestId('aria-checkbox-checked')
 * const ariaCheckboxUnchecked = getByTestId('aria-checkbox-unchecked')
 * const inputCheckboxIndeterminate = getByTestId('input-checkbox-indeterminate')
 *
 * expect(ariaCheckboxMixed).toBePartiallyChecked()
 * expect(inputCheckboxChecked).not.toBePartiallyChecked()
 * expect(inputCheckboxUnchecked).not.toBePartiallyChecked()
 * expect(ariaCheckboxChecked).not.toBePartiallyChecked()
 * expect(ariaCheckboxUnchecked).not.toBePartiallyChecked()
 *
 * inputCheckboxIndeterminate.indeterminate = true
 * expect(inputCheckboxIndeterminate).toBePartiallyChecked()
 * @see
 * [testing-library/jest-dom#tobepartiallychecked](https://github.com/testing-library/jest-dom#tobepartiallychecked)
 */
export function toBePartiallyChecked(): MatcherResult;
