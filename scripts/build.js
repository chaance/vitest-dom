import esbuild from "esbuild";
import glob from "fast-glob";
import * as path from "path";

const cwd = process.cwd();
const entryPoints = await glob(path.join(cwd, "src/**/*.js"));

let cjsBuild = esbuild.build({
  entryPoints,
  outdir: "dist",
  format: "cjs",
  outExtension: { ".js": ".cjs" },
});

let esmBuild = esbuild.build({
  entryPoints,
  outdir: "dist",
  format: "esm",
  outExtension: { ".js": ".mjs" },
});

await Promise.all([cjsBuild, esmBuild]);
