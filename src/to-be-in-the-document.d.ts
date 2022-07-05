import type { MatcherResult } from "./types";

/**
 * @description
 * Assert whether an element is present in the document or not.
 * @example
 * <svg data-testid="svg-element"></svg>
 *
 * expect(queryByTestId('svg-element')).toBeInTheDocument()
 * expect(queryByTestId('does-not-exist')).not.toBeInTheDocument()
 * @see
 * [testing-library/jest-dom#tobeinthedocument](https://github.com/testing-library/jest-dom#tobeinthedocument)
 */
export function toBeInTheDocument(element: Element): MatcherResult;
