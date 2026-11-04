import { resolveAnalyticsEnabled, resolveGaId } from "../../src/config/integrations";

type RecordValue = Record<string, unknown>;
const isRecord = (value: unknown): value is RecordValue => value !== null && typeof value === "object" && !Array.isArray(value);
function evidence(value: unknown, today: string): boolean {
  if (!isRecord(value)) return false;
  if (![value.reviewed_by, value.evidence_reference].every((item) => typeof item === "string" && item.trim().length > 0)) return false;
  if (typeof value.reviewed_at !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value.reviewed_at)) return false;
  const date = new Date(`${value.reviewed_at}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value.reviewed_at && value.reviewed_at <= today;
}

/** Consistency check for a real review record, not proof of permission or consent. */
export function checkAnalyticsRelease(input: {
  context: string | undefined;
  enabledFlag: string | undefined;
  measurementId: string | undefined;
  review: unknown;
  sourceDigest?: string;
  today?: string;
}): { production: boolean; passed: boolean; issues: string[] } {
  const { context, enabledFlag, measurementId, review } = input;
  const nonproduction = ["deploy-preview", "branch-deploy", "dev"].includes(context ?? "");
  if (nonproduction && enabledFlag === "false") return { production: false, passed: true, issues: [] };
  const issues: string[] = [];
  const today = input.today ?? new Date().toISOString().slice(0, 10);
  if (context !== "production" && !nonproduction) issues.push("RELEASE_CONTEXT_UNVERIFIED");
  if (nonproduction) issues.push("NONPRODUCTION_ANALYTICS_REQUIRES_REVIEW");
  if (!isRecord(review)) return { production: context === "production", passed: false, issues: [...issues, "MISSING_REVIEW_RECORD"] };
  const id = resolveGaId(measurementId);
  const enabled = resolveAnalyticsEnabled(enabledFlag, id);
  if (review.decision === "disable_approved") {
    if (enabledFlag !== "false" || enabled) issues.push("APPROVED_PAUSE_REQUIRES_EXPLICIT_DISABLED_FLAG");
    if (!evidence(review.intentional_pause_approval, today)) issues.push("MISSING_INTENTIONAL_PAUSE_APPROVAL");
  } else if (review.decision === "preserve_reviewed") {
    if (!enabled) issues.push("ACTIVE_MEASUREMENT_WOULD_BE_DISABLED");
    if (!id || id !== review.observed_public_measurement_id || id !== review.verified_stream_measurement_id) issues.push("MEASUREMENT_ID_NOT_VERIFIED");
    if (!/^\d+$/.test(String(review.property_id ?? "")) || !/^\d+$/.test(String(review.stream_id ?? ""))) issues.push("PROPERTY_OR_STREAM_UNVERIFIED");
    const payloadReviewField = nonproduction ? "synthetic_preview_approval" : "runtime_payload_review";
    for (const field of ["property_stream_review", "privacy_and_consent_review", "enhanced_measurement_review", payloadReviewField]) {
      if (!evidence(review[field], today)) issues.push(`MISSING_${field.toUpperCase()}`);
    }
    const payloadReview = review[payloadReviewField];
    if (!input.sourceDigest || !/^[a-f0-9]{64}$/.test(input.sourceDigest) || !isRecord(payloadReview) || payloadReview.source_sha256 !== input.sourceDigest) {
      issues.push("PAYLOAD_REVIEW_SOURCE_MISMATCH");
    }
    if (nonproduction && issues.length === 1 && issues[0] === "NONPRODUCTION_ANALYTICS_REQUIRES_REVIEW") issues.pop();
  } else {
    issues.push("ANALYTICS_CUTOVER_DECISION_PENDING");
    if (!enabled) issues.push("ACTIVE_MEASUREMENT_WOULD_BE_DISABLED");
  }
  return { production: context === "production", passed: issues.length === 0, issues };
}
