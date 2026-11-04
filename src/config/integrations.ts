/** Public analytics is opt-in after the owning property and privacy settings are verified. */
export function resolveGaId(configuredGaId: string | undefined = process.env.NEXT_PUBLIC_GA_ID): string {
  const value = configuredGaId?.trim() ?? "";
  return /^G-[A-Z0-9]+$/.test(value) ? value : "";
}

export function resolveAnalyticsEnabled(enabled: string | undefined, gaId: string): boolean {
  return enabled === "true" && resolveGaId(gaId) !== "";
}

const gaId = resolveGaId();
export const INTEGRATIONS = {
  analytics: {
    gaId,
    enabled: resolveAnalyticsEnabled(process.env.NEXT_PUBLIC_ANALYTICS_ENABLED, gaId),
    gscVerification:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
      process.env.NEXT_PUBLIC_GSC_VERIFICATION ??
      "",
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gentlecarenursing.com.au",
} as const;
