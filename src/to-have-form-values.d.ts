import type { MatcherResult } from "./types";

/**
 * @description
 * Check if a form or fieldset contains form controls for each given name, and
 * having the specified value.
 *
 * Can only be invoked on a form or fieldset element.
 * @example
 * <form data-testid="login-form">
 *   <input type="text" name="username" value="jane.doe" />
 *   <input type="password" name="password" value="123" />
 *   <input type="checkbox" name="rememberMe" checked />
 *   <button type="submit">Sign in</button>
 * </form>
 *
 * expect(getByTestId('login-form')).toHaveFormValues({
 *   username: 'jane.doe',
 *   rememberMe: true,
 * })
 * @see [testing-library/jest-dom#tohaveformvalues](https://github.com/testing-library/jest-dom#tohaveformvalues)
 */
export function toHaveFormValues(
  formElement: Element,
  expectedValues: Record<string, unknown>
): MatcherResult;
