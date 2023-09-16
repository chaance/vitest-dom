import type { MatcherResult } from "./types";
export function toHaveAttribute(
  element: Element,
  attr: string,
  value?: unknown,
): MatcherResult;
