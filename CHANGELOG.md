# `vitest-dom`

## v0.0.5

- Loosened the dependency on `vitest` to allow for versions between 0.16 and 0.30
- Added missing type export for `toBeDisabled`

## v0.0.6

- Actually call `extend.expect` in `extend-expect` module (whoops!)

## v0.1.0

- Bumped peer dependency on `vitest` to `^0.31.0`, as Vitest has made some
  breaking changes to its TypeScript API. We have updated our types to consume
  and extend the new types.
- We no longer augment the global `expect` type, as this is only desired when
  the user opts in to importing globals from `vitest`. Users will need to
  explicitly follow the Vitest's guidance to get global types.
- We now use the `css.escape` package to polyfill `CSS.escape` in
  `toHaveFormValues` matcher. This will use the built-in `CSS.escape` if it is
  detected in your runtime.

## v0.1.1

- Relaxed `peerDependency` on Vitest (#7)
- Updated internal dependencies
