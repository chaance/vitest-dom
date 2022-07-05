import type { MatcherResult } from "./types";

/**
 * @description
 * Check whether the given element has certain classes within its `class` attribute.
 *
 * You must provide at least one class, unless you are asserting that an element does not have any classes.
 * @example
 * <button
 *   data-testid="delete-button"
 *   class="btn xs btn-danger"
 * >
 *   delete item
 * </button>
 *
 * <div data-testid="no-classes">no classes</div>
 *
 * const deleteButton = getByTestId('delete-button')
 * const noClasses = getByTestId('no-classes')
 * expect(deleteButton).toHaveClass('btn')
 * expect(deleteButton).toHaveClass('btn-danger xs')
 * expect(deleteButton).toHaveClass('btn xs btn-danger', {exact: true})
 * expect(deleteButton).not.toHaveClass('btn xs btn-danger', {exact: true})
 * expect(noClasses).not.toHaveClass()
 * @see
 * [testing-library/jest-dom#tohaveclass](https://github.com/testing-library/jest-dom#tohaveclass)
 */
export function toHaveClass(
  element: Element,
  ...classNames: string[]
): MatcherResult;
