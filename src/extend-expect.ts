import { expect } from "vitest";
import * as matchers from "./matchers";
import type { TestingLibraryMatchers } from "./matchers";

declare global {
  namespace Vi {
    interface Assertion<T = any>
      extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  }
}

expect.extend({ ...matchers });
