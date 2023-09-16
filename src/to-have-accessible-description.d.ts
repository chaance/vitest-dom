import type { expect } from "vitest";
import type { MatcherResult } from "./types";

/** @deprecated */
export function toHaveAccessibleDescription(
  text?: string | RegExp | typeof expect.stringContaining,
): MatcherResult;
