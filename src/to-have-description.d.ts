import type { expect } from "vitest";
import type { MatcherResult } from "./types";

/** @deprecated */
export function toHaveDescription(
  element: Element,
  text?: string | RegExp | typeof expect.stringContaining
): MatcherResult;
