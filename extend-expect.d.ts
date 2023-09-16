import "vitest";
import type { TestingLibraryMatchers } from "./dist/matchers";

declare module "vitest" {
  interface Assertion<T = any>
    extends TestingLibraryMatchers<(expected: string) => any, T> {}
  interface AsymmetricMatchersContaining
    extends TestingLibraryMatchers<unknown, unknown> {}
}
