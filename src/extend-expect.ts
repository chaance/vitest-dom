import { expect } from "vitest";
import * as matchers from "./matchers";
import type { TestingLibraryMatchers } from "./matchers";

expect.extend(matchers);

declare module "vitest" {
  interface Assertion<T = any>
    extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  interface AsymmetricMatchersContaining
    extends TestingLibraryMatchers<unknown, unknown> {}
}
