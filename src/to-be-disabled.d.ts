import type { MatcherResult } from "./types";

/**
 * @description
 * Allows you to check whether an element is disabled from the user's perspective.
 *
 * Matches if the element is a form control and the `disabled` attribute is specified on this element or the
 * element is a descendant of a form element with a `disabled` attribute.
 * @example
 * <button
 *   data-testid="button"
 *   type="submit"
 *   disabled
 * >
 *   submit
 * </button>
 *
 * expect(getByTestId('button')).toBeDisabled()
 * @see
 * [testing-library/jest-dom#tobedisabled](https://github.com/testing-library/jest-dom#tobedisabled)
 */
export function toBeDisabled(element: Element): MatcherResult;

/**
 * @description
 * Allows you to check whether an element is not disabled from the user's perspective.
 *
 * Works like `not.toBeDisabled()`.
 *
 * Use this matcher to avoid double negation in your tests.
 * @example
 * <button
 *   data-testid="button"
 *   type="submit"
 * >
 *   submit
 * </button>
 *
 * expect(getByTestId('button')).toBeEnabled()
 * @see
 * [testing-library/jest-dom#tobeenabled](https://github.com/testing-library/jest-dom#tobeenabled)
 */
export function toBeEnabled(element: Element): MatcherResult;
