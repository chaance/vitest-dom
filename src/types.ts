import type { ExpectStatic } from "vitest";

export interface MatcherResult {
  pass: boolean;
  message(): string;
  actual?: unknown;
  expected?: unknown;
}

export type ExpectationResult = MatcherResult | Promise<MatcherResult>;

export interface MatcherFn<T extends MatcherState = MatcherState> {
  (this: T, received: any, expected: any, options?: any): ExpectationResult;
}

export type MatcherState = ReturnType<ExpectStatic["getState"]>;

export type InferredMatcher<T extends MatcherFn, R> = (
  ...args: T extends (first: any, ...rest: infer P) => any ? P : never
) => R;
