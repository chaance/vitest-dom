import type { MatcherResult } from "./types";
export function toHaveValue(
  formElement: Element,
  value?: string | string[] | number | null,
): MatcherResult;
