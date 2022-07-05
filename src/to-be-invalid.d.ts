import type { MatcherResult } from "./types";

/**
 * @description
 * Check if a form element, or the entire `form`, is currently invalid.
 *
 * An `input`, `select`, `textarea`, or `form` element is invalid if it has an `aria-invalid` attribute with no
 * value or a value of "true", or if the result of `checkValidity()` is false.
 * @example
 * <input data-testid="no-aria-invalid" />
 *
 * <form data-testid="invalid-form">
 *   <input required />
 * </form>
 *
 * expect(getByTestId('no-aria-invalid')).not.toBeInvalid()
 * expect(getByTestId('invalid-form')).toBeInvalid()
 * @see
 * [testing-library/jest-dom#tobeinvalid](https://github.com/testing-library/jest-dom#tobeinvalid)
 */
export function toBeInvalid(element: Element): MatcherResult;

/**
 * @description
 * Allows you to check if a form element is currently required.
 *
 * An `input`, `select`, `textarea`, or `form` element is invalid if it has an `aria-invalid` attribute with no
 * value or a value of "false", or if the result of `checkValidity()` is true.
 * @example
 * <input data-testid="aria-invalid" aria-invalid />
 *
 * <form data-testid="valid-form">
 *   <input />
 * </form>
 *
 * expect(getByTestId('no-aria-invalid')).not.toBeValid()
 * expect(getByTestId('invalid-form')).toBeInvalid()
 * @see
 * [testing-library/jest-dom#tobevalid](https://github.com/testing-library/jest-dom#tobevalid)
 */
export function toBeValid(element: Element): MatcherResult;
