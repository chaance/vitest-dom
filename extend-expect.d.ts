import "vitest";
import type { expect } from "vitest";
import type { TestingLibraryMatchers } from "./dist/matchers";

declare module "vitest" {
  interface Assertion<T = any>
    extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  interface AsymmetricMatchersContaining
    extends TestingLibraryMatchers<unknown, unknown> {}
}
