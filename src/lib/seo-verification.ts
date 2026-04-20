import type { Metadata } from "next";

/**
 * Returns a Metadata.verification block from env vars, or undefined if none are set.
 * Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION for Google Search Console.
 * Set NEXT_PUBLIC_BING_SITE_VERIFICATION for Bing Webmaster Tools.
 */
export function getVerification(): Metadata["verification"] | undefined {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  if (!google && !bing) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}
