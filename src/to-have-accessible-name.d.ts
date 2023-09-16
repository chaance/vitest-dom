import type { expect } from "vitest";
import type { MatcherResult } from "./types";
export function toHaveAccessibleName(
  text?: string | RegExp | typeof expect.stringContaining,
): MatcherResult;
