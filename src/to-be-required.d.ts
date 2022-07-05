import type { MatcherResult } from "./types";

/**
 * @description
 * This allows you to check if a form element is currently required.
 *
 * An element is required if it is having a `required` or `aria-required="true"` attribute.
 * @example
 * <input data-testid="required-input" required />
 * <div
 *   data-testid="supported-role"
 *   role="tree"
 *   required />
 *
 * expect(getByTestId('required-input')).toBeRequired()
 * expect(getByTestId('supported-role')).not.toBeRequired()
 * @see
 * [testing-library/jest-dom#toberequired](https://github.com/testing-library/jest-dom#toberequired)
 */
export function toBeRequired(element: Element): MatcherResult;
