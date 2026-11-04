import { readFile } from "node:fs/promises";
import { checkAnalyticsRelease } from "./lib/analytics-release";
import { analyticsSourceDigest } from "./lib/analytics-source";
import { fileURLToPath } from "node:url";

async function main() {
  const review = JSON.parse(await readFile(new URL("../docs/seo/analytics-release-review.json", import.meta.url), "utf8"));
  // Only these named, non-secret build inputs are read. No hosting API or account access.
  const sourceDigest = await analyticsSourceDigest(fileURLToPath(new URL("..", import.meta.url)));
  const result = checkAnalyticsRelease({
    context: process.env.CONTEXT,
    enabledFlag: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED,
    measurementId: process.env.NEXT_PUBLIC_GA_ID,
    review, sourceDigest,
  });
  console.log(JSON.stringify({
    ...result, sourceDigest,
    scope: result.production ? "Production cutover consistency check; recorded review does not itself establish consent" : "Not a production approval; draft build settings and privacy constraints still apply",
  }, null, 2));
  if (!result.passed) process.exitCode = 1;
}
main().catch(() => {
  console.error("Analytics release review could not be validated. Production release remains blocked.");
  process.exitCode = 1;
});
