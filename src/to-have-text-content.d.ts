import type { MatcherResult } from "./types";
export function toHaveTextContent(
  element: Element,
  text: string | RegExp,
  options?: { normalizeWhitespace: boolean }
): MatcherResult;
