import { INTEGRATIONS } from "../config/integrations";
import { ANALYTICS_PUBLIC_PATHS } from "./analytics-routes";

export type AnalyticsEventName =
  | "generate_lead"
  | "referral_submit"
  | "phone_click"
  | "email_click"
  | "request_care_click"
  | "make_referral_click"
  | "form_open"
  | "form_error";

export type AnalyticsParameters = Record<string, unknown>;

export function getLinkAnalyticsEvent(
  href: string,
  explicitAction?: string
): { eventName: AnalyticsEventName; parameters: AnalyticsParameters } | null {
  if (explicitAction === "make_referral") {
    return { eventName: "make_referral_click", parameters: {} };
  }
  if (explicitAction === "request_care") {
    return { eventName: "request_care_click", parameters: {} };
  }
  if (href.toLowerCase().startsWith("tel:")) {
    return { eventName: "phone_click", parameters: {} };
  }
  if (href.toLowerCase().startsWith("mailto:")) {
    return { eventName: "email_click", parameters: {} };
  }
  return null;
}

interface AnalyticsRuntime {
  pathname: string;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}

const APPROVED_PARAMETER_KEYS = new Set<string>([
  "form_type",
  "cta_location",
  "page_path",
  "error_type",
]);
const PUBLIC_PATHS = new Set(ANALYTICS_PUBLIC_PATHS);
// An approved key is not enough: a free-text value could still contain personal data.
const CATEGORICAL_VALUES: Record<string, ReadonlySet<string>> = {
  form_type: new Set(["contact", "referral"]),
  cta_location: new Set([
    "homepage", "contact_form", "referral_form", "compact_referral_form",
    "referral_concierge", "desktop_navigation", "mobile_navigation",
    "mobile_sticky_cta", "floating_contact", "hero", "process_steps",
    "process_timeline", "homepage_cta_primary", "homepage_cta_secondary",
    "service_cta_primary", "service_cta_secondary", "quick_response", "referral_section",
  ]),
  error_type: new Set(["delivery", "validation"]),
};

function normalisePagePath(value: unknown, fallbackPath: string): string {
  const candidate = typeof value === "string" && value.startsWith("/") ? value : fallbackPath;
  const path = candidate.split(/[?#]/, 1)[0] || "/";
  // Public pages are finite. Unknown paths may contain names or other user input.
  return PUBLIC_PATHS.has(path) ? path : "/unmatched";
}

function normaliseParameter(key: string, value: unknown): string | number | boolean | undefined {
  if (typeof value !== "string") return undefined;

  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 100) return undefined;
  if (!CATEGORICAL_VALUES[key]?.has(trimmed)) return undefined;
  return trimmed;
}

export function buildAnalyticsPayload(
  parameters: AnalyticsParameters,
  fallbackPath = "/"
): Record<string, string | number | boolean> {
  const payload: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(parameters)) {
    if (!APPROVED_PARAMETER_KEYS.has(key) || key === "page_path") continue;
    const normalised = normaliseParameter(key, value);
    if (normalised !== undefined) payload[key] = normalised;
  }

  payload.page_path = normalisePagePath(parameters.page_path, fallbackPath);
  return payload;
}

export function dispatchAnalyticsEvent(
  eventName: AnalyticsEventName,
  parameters: AnalyticsParameters = {},
  runtime?: AnalyticsRuntime
): void {
  try {
    if (!runtime && !INTEGRATIONS.analytics.enabled) return;
    const browserRuntime: AnalyticsRuntime | undefined =
      runtime ??
      (typeof window !== "undefined"
        ? {
            pathname: window.location.pathname,
            gtag: window.gtag,
            dataLayer: window.dataLayer,
          }
        : undefined);

    if (!browserRuntime) return;

    const payload = buildAnalyticsPayload(parameters, browserRuntime.pathname);
    const eventArguments: ["event", AnalyticsEventName, typeof payload] = [
      "event",
      eventName,
      payload,
    ];

    if (typeof browserRuntime.gtag === "function") {
      browserRuntime.gtag(...eventArguments);
      return;
    }

    if (runtime) {
      runtime.dataLayer ??= [];
      runtime.dataLayer.push(eventArguments);
      return;
    }

    if (typeof window !== "undefined") {
      window.dataLayer ??= [];
      window.dataLayer.push(eventArguments);
    }
  } catch {
    // Tracking is optional: an accepted enquiry must stay successful when analytics fails.
    // Do not retry here; the provider may have accepted the event before throwing.
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
