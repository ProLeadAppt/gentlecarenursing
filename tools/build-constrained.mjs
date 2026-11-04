import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Next's documented compile/generate modes let the compiler release memory
// before typechecking and prerendering. No type or production checks are skipped.
const next = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const tsc = fileURLToPath(new URL("../node_modules/typescript/bin/tsc", import.meta.url));
const env = {
  ...process.env,
  NEXT_BUILD_LOW_MEMORY: "1",
  NEXT_TELEMETRY_DISABLED: "1",
  RAYON_NUM_THREADS: "1",
  UV_THREADPOOL_SIZE: "1",
};

// Explicit process heap limits support clean Node 22 compilation and typechecking.
// CLI limits override NODE_OPTIONS; prerendering uses a smaller heap.
for (const [label, args] of [
  ["Compile production assets", ["--max-old-space-size=512", next, "build", "--webpack", "--experimental-build-mode", "compile"]],
  ["Check all TypeScript", ["--max-old-space-size=512", tsc, "--noEmit"]],
  ["Prerender production routes", ["--max-old-space-size=256", next, "build", "--webpack", "--experimental-build-mode", "generate"]],
]) {
  console.log(`\n${label}\n`);
  const result = spawnSync(process.execPath, args, { env, stdio: "inherit" });
  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }
  if (result.signal || result.status !== 0) {
    console.error(`${label} failed${result.signal ? ` (${result.signal})` : ""}.`);
    process.exit(result.status ?? 1);
  }
}
