import type { expect } from "vitest";
import type { MatcherResult } from "./types";
export function toHaveErrorMessage(
  element: Element,
  text?: string | RegExp | typeof expect.stringContaining
): MatcherResult;
