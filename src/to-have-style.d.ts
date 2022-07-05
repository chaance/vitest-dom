import type { MatcherResult } from "./types";

/**
 * @description
 * Check if an element has specific css properties with specific values applied.
 *
 * Only matches if the element has *all* the expected properties applied, not
 * just some of them.
 * @example
 * <button
 *   data-test-id="submit-button"
 *   style="background-color: green; display: none"
 * >
 *   submit
 * </button>
 *
 * const button = getByTestId('submit-button')
 * expect(button).toHaveStyle('background-color: green')
 * expect(button).toHaveStyle({
 *   'background-color': 'green',
 *   display: 'none'
 * })
 * @see [testing-library/jest-dom#tohavestyle](https://github.com/testing-library/jest-dom#tohavestyle)
 */
export function toHaveStyle(
  element: Element,
  css: string | Record<string, unknown>
): MatcherResult;
