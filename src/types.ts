// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { expect } from "vitest";

export interface MatcherResult {
  pass: boolean;
  message(): string;
  actual?: any;
  expected?: any;
}

export type ExpectationResult = MatcherResult | Promise<MatcherResult>;

export interface MatcherFn<T extends MatcherState = MatcherState> {
  (this: T, received: any, expected: any, options?: any): ExpectationResult;
}

export type MatcherState = ReturnType<Vi.ExpectStatic["getState"]>;
