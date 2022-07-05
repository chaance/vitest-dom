import type { MatcherResult } from "./types";

/**
 * @description
 * Allows you to assert whether an element contains another element as a descendant or not.
 * @example
 * <span data-testid="ancestor">
 *   <span data-testid="descendant"></span>
 * </span>
 *
 * const ancestor = getByTestId('ancestor')
 * const descendant = getByTestId('descendant')
 * const nonExistantElement = getByTestId('does-not-exist')
 * expect(ancestor).toContainElement(descendant)
 * expect(descendant).not.toContainElement(ancestor)
 * expect(ancestor).not.toContainElement(nonExistantElement)
 * @see
 * [testing-library/jest-dom#tocontainelement](https://github.com/testing-library/jest-dom#tocontainelement)
 */
export function toContainElement(
  element: Element,
  element: HTMLElement | SVGElement | null
): MatcherResult;
