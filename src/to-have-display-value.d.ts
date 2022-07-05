import type { MatcherResult } from "./types";
export function toHaveDisplayValue(
  element: Element,
  value: string | RegExp | Array<string | RegExp>
): MatcherResult;
