import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import type { NextConfig } from "next";

function loadConfig(lowMemory: string): NextConfig {
  return JSON.parse(execFileSync(process.execPath, [
    "--import", "tsx", "-e",
    'const config = require("./next.config.ts").default; console.log(JSON.stringify(config));',
  ], {
    encoding: "utf8",
    env: { ...process.env, NEXT_BUILD_LOW_MEMORY: lowMemory },
  }));
}

test("default build configuration preserves image formats without experimental overrides", () => {
  assert.deepEqual(loadConfig(""), {
    images: { formats: ["image/avif", "image/webp"] },
  });
  assert.deepEqual(loadConfig("0"), loadConfig(""));
});

test("low-memory builds retain compiler isolation and sequential compilation and tracing", () => {
  const config = loadConfig("1");
  assert.notEqual(config.experimental?.webpackBuildWorker, false);
  assert.deepEqual(config.experimental, {
    cpus: 1,
    webpackMemoryOptimizations: true,
    parallelServerCompiles: false,
    parallelServerBuildTraces: false,
  });
  assert.equal(config.webpack, undefined);
  assert.equal(config.typescript?.ignoreBuildErrors, undefined);
  assert.deepEqual(config.images, { formats: ["image/avif", "image/webp"] });
});
