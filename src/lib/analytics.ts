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
  "service_type",
  "cta_location",
  "submission_id",
  "page_path",
  "error_type",
]);
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function normalisePagePath(value: unknown, fallbackPath: string): string {
  const candidate = typeof value === "string" && value.startsWith("/") ? value : fallbackPath;
  if (!candidate.startsWith("/")) return "/";
  return candidate.split(/[?#]/, 1)[0] || "/";
}

function normaliseParameter(key: string, value: unknown): string | number | boolean | undefined {
  if (typeof value === "number" || typeof value === "boolean") return value;
  if (typeof value !== "string") return undefined;

  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 100) return undefined;
  if (key === "submission_id" && !UUID_PATTERN.test(trimmed)) return undefined;
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
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
