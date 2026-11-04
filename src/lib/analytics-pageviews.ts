import { buildAnalyticsPayload } from "./analytics";
import { sanitizeAnalyticsReferrer } from "./analytics-attribution";

// Never pass raw document titles, location URLs or referrers to the provider.
// Unknown paths (which can contain personal information) use a fixed placeholder.
export function buildPageViewParameters(pathname: string, referrer?: string) {
  const pagePath = String(buildAnalyticsPayload({}, pathname).page_path);
  return {
    page_path: pagePath,
    page_location: `https://gentlecarenursing.com.au${pagePath}`,
    page_title: "Gentle Care Nursing Services",
    page_referrer: sanitizeAnalyticsReferrer(referrer),
  };
}
