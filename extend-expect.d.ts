declare global {
  namespace Vi {
    interface Assertion<T = any>
      extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  }
}
export {};
