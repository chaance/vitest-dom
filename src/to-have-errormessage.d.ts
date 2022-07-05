import type { expect } from "vitest";
import type { MatcherResult } from "./types";

/**
 * @description
 *
 * Check whether the given element has an [ARIA error message](https://www.w3.org/TR/wai-aria/#aria-errormessage) or not.
 *
 * Use the `aria-errormessage` attribute to reference another element that
 * contains custom error message text. Multiple ids is **NOT** allowed. Authors
 * MUST use `aria-invalid` in conjunction with `aria-errormessage`. Learn more
 * from the [`aria-errormessage` spec](https://www.w3.org/TR/wai-aria/#aria-errormessage).
 *
 * Whitespace is normalized.
 *
 * When a `string` argument is passed through, it will perform a whole
 * case-sensitive match to the error message text.
 *
 * To perform a case-insensitive match, you can use a `RegExp` with the `/i`
 * modifier.
 *
 * To perform a partial match, you can pass a `RegExp` or use
 * expect.stringContaining("partial string")`.
 *
 * @example
 * <label for="startTime"> Please enter a start time for the meeting: </label>
 * <input id="startTime" type="text" aria-errormessage="msgID" aria-invalid="true" value="11:30 PM" />
 * <span id="msgID" aria-live="assertive" style="visibility:visible">
 *   Invalid time: the time must be between 9:00 AM and 5:00 PM"
 * </span>
 *
 * const timeInput = getByLabel('startTime')
 *
 * expect(timeInput).toHaveErrorMessage(
 *   'Invalid time: the time must be between 9:00 AM and 5:00 PM',
 * )
 * expect(timeInput).toHaveErrorMessage(/invalid time/i) // to partially match
 * expect(timeInput).toHaveErrorMessage(expect.stringContaining('Invalid time')) // to partially match
 * expect(timeInput).not.toHaveErrorMessage('Pikachu!')
 * @see [testing-library/jest-dom#tohaveerrormessage](https://github.com/testing-library/jest-dom#tohaveerrormessage)
 */
export function toHaveErrorMessage(
  element: Element,
  text?: string | RegExp | typeof expect.stringContaining
): MatcherResult;
