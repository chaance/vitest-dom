import type { MatcherResult } from "./types";

/**
 * @description
 * This allows you to check if an element is currently visible to the user.
 *
 * An element is visible if **all** the following conditions are met:
 * * it does not have its css property display set to none
 * * it does not have its css property visibility set to either hidden or collapse
 * * it does not have its css property opacity set to 0
 * * its parent element is also visible (and so on up to the top of the DOM tree)
 * * it does not have the hidden attribute
 * * if `<details />` it has the open attribute
 * @example
 * <div
 *   data-testid="zero-opacity"
 *   style="opacity: 0"
 * >
 *   Zero Opacity
 * </div>
 *
 * <div data-testid="visible">Visible Example</div>
 *
 * expect(getByTestId('zero-opacity')).not.toBeVisible()
 * expect(getByTestId('visible')).toBeVisible()
 * @see
 * [testing-library/jest-dom#tobevisible](https://github.com/testing-library/jest-dom#tobevisible)
 */
export function toBeVisible(element: Element): MatcherResult;
