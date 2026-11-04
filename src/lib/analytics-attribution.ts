import { ANALYTICS_PUBLIC_PATHS } from "./analytics-routes";

const SITE_ORIGIN = "https://gentlecarenursing.com.au";
const PUBLIC_PATHS = new Set(ANALYTICS_PUBLIC_PATHS);
// Exact hosts only. A match permits the origin, never search terms or page paths.
const REFERRER_HOSTS = new Set([
  "www.google.com", "google.com", "www.google.com.au", "google.com.au",
  "www.bing.com", "bing.com", "duckduckgo.com", "www.duckduckgo.com",
  "search.yahoo.com", "au.search.yahoo.com",
  "chatgpt.com", "perplexity.ai", "www.perplexity.ai", "copilot.microsoft.com",
]);

/** Local filtering only. Unknown or potentially identifying referrers are dropped. */
export function sanitizeAnalyticsReferrer(value: unknown): string {
  if (typeof value !== "string" || value.length > 4096) return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return "";
    if (url.origin === SITE_ORIGIN) {
      return PUBLIC_PATHS.has(url.pathname) ? `${SITE_ORIGIN}${url.pathname}` : "";
    }
    return REFERRER_HOSTS.has(url.hostname) ? `${url.origin}/` : "";
  } catch {
    return "";
  }
}
