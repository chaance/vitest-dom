<div align="center">
<h1>vitest-dom</h1>

<p>Custom Vitest matchers to test the state of the DOM</p>

</div>

---

<!-- prettier-ignore-start -->
[![version][version-badge]][package]
[![MIT License][license-badge]][license]

[![Watch on GitHub][github-watch-badge]][github-watch]
<!-- prettier-ignore-end -->

This library is a fork of
[`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom). It
shares that library's implementation and API. It is intended to make it easier to include
its matchers without clashes between [Vitest][vitest] and Jest's environment or types.

See the [`README` for the original package](https://github.com/testing-library/jest-dom/blob/main/README.md) for usage details.

## Installation

This module should be installed as one of your project's `devDependencies`:

```shell
# with npm
npm install --save-dev vitest-dom
# yarn
yarn add --dev vitest-dom
# pnpm
pnpm add --dev vitest-dom
```

## Usage

Import the matchers from `vitest-dom/matchers` once (perferably in your [tests
setup file][]), then pass them to Vitest's `expect.extend` method:

[tests setup file]: https://vitest.dev/config/#setupfiles

```javascript
// vitest-setup.js
import * as matchers from "vitest-dom/matchers";
import { expect } from "vitest";
expect.extend(matchers);

// In vitest.config.js, add the following
export default defineConfig({
  test: {
    setupFiles: ["vitest-setup.js"],
  },
});
```

### With TypeScript

If you're using TypeScript, make sure your setup file is a `.ts` and not a `.js`
to include the necessary types. Importing from `vitest-dom/extend-expect` will
add the matchers to Vitest's `expect` types.

```typescript
// vitest-setup.ts
import "vitest-dom/extend-expect";
```

You will also need to include your setup file in your `tsconfig.json` if you
haven't already:

```json5
  // In tsconfig.json
  "include": [
    // ...
    "./vitest-setup.ts"
  ],
```

<!-- prettier-ignore-start -->
[vitest]: https://vitest.dev/
[version-badge]:
 https://img.shields.io/npm/v/vitest-dom.svg?style=flat-square
[package]: https://www.npmjs.com/package/vitest-dom
[license-badge]: 
  https://img.shields.io/npm/l/vitest-dom.svg?style=flat-square
[license]: https://github.com/chaance/vitest-dom/blob/main/LICENSE
[github-watch-badge]:
  https://img.shields.io/github/watchers/chaance/vitest-dom.svg?style=social
[github-watch]: https://github.com/chaance/vitest-dom/watchers
<!-- prettier-ignore-end -->
