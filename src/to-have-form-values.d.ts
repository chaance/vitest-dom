import type { MatcherResult } from "./types";
export function toHaveFormValues(
  formElement: Element,
  expectedValues: Record<string, unknown>,
): MatcherResult;
