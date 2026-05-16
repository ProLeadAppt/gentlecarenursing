import type { Metadata } from "next";

/**
 * Bing Webmaster Tools site verification token for gentlecarenursing.com.au.
 * Verification tokens are public by design (they ship in the HTML for the
 * whole world to see), so hardcoding is fine — env var still overrides for
 * preview / staging environments that need a different verification.
 */
const BING_DEFAULT = "3019D378D181A07908A4C6EA65652947";

/**
 * Returns a Metadata.verification block consumed by every page that runs
 * through createMetadata() in src/lib/metadata.ts.
 * Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION for Google Search Console.
 * Set NEXT_PUBLIC_BING_SITE_VERIFICATION to override the Bing default above.
 */
export function getVerification(): Metadata["verification"] | undefined {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? BING_DEFAULT;
  if (!google && !bing) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}
