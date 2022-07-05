import type { MatcherResult } from "./types";
export function toHaveStyle(
  element: Element,
  css: string | Record<string, unknown>
): MatcherResult;
