import type { MatcherResult } from "./types";
export function toHaveClass(
  element: Element,
  ...classNames: string[]
): MatcherResult;
