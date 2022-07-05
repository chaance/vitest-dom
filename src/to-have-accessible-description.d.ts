import type { expect } from "vitest";
import type { MatcherResult } from "./types";

/**
 * @deprecated
 * since v5.14.1
 * @description
 * Check the accessible description for an element.
 * This allows you to check whether the given element has a description or not.
 *
 * An element gets its description via the
 * [`aria-describedby` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute).
 * Set this to the `id` of one or more other elements. These elements may be nested
 * inside, be outside, or a sibling of the passed in element.
 *
 * Whitespace is normalized. Using multiple ids will
 * [join the referenced elements’ text content separated by a space](https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_description).
 *
 * When a `string` argument is passed through, it will perform a whole
 * case-sensitive match to the description text.
 *
 * To perform a case-insensitive match, you can use a `RegExp` with the `/i`
 * modifier.
 *
 * To perform a partial match, you can pass a `RegExp` or use
 * `expect.stringContaining("partial string")`.
 *
 * @example
 * <button aria-label="Close" aria-describedby="description-close">
 *   X
 * </button>
 * <div id="description-close">
 *   Closing will discard any changes
 * </div>
 *
 * <button>Delete</button>
 *
 * const closeButton = getByRole('button', {name: 'Close'})
 *
 * expect(closeButton).toHaveDescription('Closing will discard any changes')
 * expect(closeButton).toHaveDescription(/will discard/) // to partially match
 * expect(closeButton).toHaveDescription(expect.stringContaining('will discard')) // to partially match
 * expect(closeButton).toHaveDescription(/^closing/i) // to use case-insensitive match
 * expect(closeButton).not.toHaveDescription('Other description')
 *
 * const deleteButton = getByRole('button', {name: 'Delete'})
 * expect(deleteButton).not.toHaveDescription()
 * expect(deleteButton).toHaveDescription('') // Missing or empty description always becomes a blank string
 * @see
 * [testing-library/jest-dom#tohavedescription](https://github.com/testing-library/jest-dom#tohavedescription)
 */
/**
 * @description
 * This allows to assert that an element has the expected [accessible description](https://w3c.github.io/accname/).
 *
 * You can pass the exact string of the expected accessible description, or you can make a
 * partial match passing a regular expression, or by using either
 * [expect.stringContaining](https://jestjs.io/docs/en/expect.html#expectnotstringcontainingstring)
 * or [expect.stringMatching](https://jestjs.io/docs/en/expect.html#expectstringmatchingstring-regexp).
 * @example
 * <a data-testid="link" href="/" aria-label="Home page" title="A link to start over">Start</a>
 * <a data-testid="extra-link" href="/about" aria-label="About page">About</a>
 * <img src="avatar.jpg" data-testid="avatar" alt="User profile pic" />
 * <img src="logo.jpg" data-testid="logo" alt="Company logo" aria-describedby="t1" />
 * <span id="t1" role="presentation">The logo of Our Company</span>
 *
 * expect(getByTestId('link')).toHaveAccessibleDescription()
 * expect(getByTestId('link')).toHaveAccessibleDescription('A link to start over')
 * expect(getByTestId('link')).not.toHaveAccessibleDescription('Home page')
 * expect(getByTestId('extra-link')).not.toHaveAccessibleDescription()
 * expect(getByTestId('avatar')).not.toHaveAccessibleDescription()
 * expect(getByTestId('logo')).not.toHaveAccessibleDescription('Company logo')
 * expect(getByTestId('logo')).toHaveAccessibleDescription('The logo of Our Company')
 * @see
 * [testing-library/jest-dom#tohaveaccessibledescription](https://github.com/testing-library/jest-dom#tohaveaccessibledescription)
 */
export function toHaveAccessibleDescription(
  text?: string | RegExp | typeof expect.stringContaining
): MatcherResult;
