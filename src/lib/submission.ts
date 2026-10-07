import { createHmac } from "node:crypto";

export interface ContactPayload {
  type: "contact";
  name: string;
  email: string;
  phone?: string;
  serviceType?: string;
  message: string;
}

export interface ReferralPayload {
  type: "referral";
  referrerName: string;
  referrerEmail?: string;
  referrerPhone: string;
  referrerRole?: string;
  organization?: string;
  clientName?: string;
  serviceType?: string;
  notes?: string;
}

export type FormPayload = ContactPayload | ReferralPayload;

interface DeliveryOptions {
  apiKey: string;
  fromEmail: string;
  fetcher?: typeof fetch;
}

const REFERRER_ROLE_LABELS: Record<string, string> = {
  SC: "Support Coordinator",
  DP: "Discharge Planner",
  GP: "General Practitioner",
  OT: "Occupational Therapist",
  Family: "Family Member",
  Other: "Other Professional",
  family: "Family Member",
  ndis: "Support Coordinator",
  hospital: "Discharge Planner",
  healthcare: "Other Professional",
  self: "Other Professional",
  other: "Other Professional",
};

const REFERRAL_SERVICE_LABELS: Record<string, string> = {
  Nursing: "General Nursing",
  Complex: "Complex Clinical Care",
  "Post-Op": "Post-Op Recovery",
  NDIS: "NDIS Support",
  AgedCare: "Aged Care Support",
  Other: "Other Inquiry",
  ndis: "NDIS Support",
  dva: "General Nursing",
  "aged-care": "Aged Care Support",
  private: "Other Inquiry",
  unsure: "Other Inquiry",
};

export function validateFormPayload(body: unknown): body is FormPayload {
  if (!body || typeof body !== "object") return false;
  const obj = body as Record<string, unknown>;
  // Bound input and reject non-string optional fields before rendering email.
  const fields = obj.type === "contact"
    ? ["type", "name", "email", "phone", "serviceType", "message"]
    : ["type", "referrerName", "referrerEmail", "referrerPhone", "referrerRole", "organization", "clientName", "serviceType", "notes"];
  if (Object.keys(obj).some(key => !fields.includes(key))) return false;
  if (Object.entries(obj).some(([key, value]) => typeof value !== "string" || value.length > (["message", "notes"].includes(key) ? 5000 : 254))) return false;

  if (obj.type === "contact") {
    return (
      typeof obj.name === "string" &&
      obj.name.trim().length > 0 &&
      typeof obj.email === "string" &&
      isEmail(obj.email) &&
      typeof obj.message === "string" &&
      obj.message.trim().length > 0
    );
  }

  if (obj.type === "referral") {
    const emailIsValid =
      obj.referrerEmail === undefined ||
      obj.referrerEmail === "" ||
      (typeof obj.referrerEmail === "string" && isEmail(obj.referrerEmail));
    const roleIsValid =
      obj.referrerRole === undefined ||
      obj.referrerRole === "" ||
      (typeof obj.referrerRole === "string" &&
        Object.hasOwn(REFERRER_ROLE_LABELS, obj.referrerRole));
    const serviceIsValid =
      obj.serviceType === undefined ||
      obj.serviceType === "" ||
      (typeof obj.serviceType === "string" &&
        Object.hasOwn(REFERRAL_SERVICE_LABELS, obj.serviceType));

    return (
      typeof obj.referrerName === "string" &&
      obj.referrerName.trim().length > 0 &&
      typeof obj.referrerPhone === "string" &&
      obj.referrerPhone.trim().length > 0 &&
      emailIsValid &&
      roleIsValid &&
      serviceIsValid
    );
  }

  return false;
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function isEmail(value: string): boolean {
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value) && !/[\r\n]/.test(value);
}

/** Acceptance by Resend is not proof of delivery to the recipient's inbox. */
export async function deliverSubmission(
  payload: FormPayload,
  options: DeliveryOptions
): Promise<{ success: true; submissionId: string }> {
  if (!validateFormPayload(payload)) throw new Error("Invalid form payload");
  if (!options.apiKey || !isEmail(options.fromEmail)) throw new Error("Email delivery not configured");
  const fields = payload.type === "contact"
    ? ["name", "email", "phone", "serviceType", "message"]
    : ["referrerName", "referrerEmail", "referrerPhone", "referrerRole", "organization", "clientName", "serviceType", "notes"];
  const values = payload as unknown as Record<string, string>;
  const details = fields.filter(key => values[key]?.trim()).map(key => {
    let value = values[key].trim();
    if (key === "referrerRole") value = REFERRER_ROLE_LABELS[value] ?? value;
    if (payload.type === "referral" && key === "serviceType") value = REFERRAL_SERVICE_LABELS[value] ?? value;
    return `${key}: ${value}`;
  }).join("\n\n");
  const replyTo = payload.type === "contact" ? payload.email.trim() : payload.referrerEmail?.trim();
  const email = {
    from: `Gentle Care Nursing <${options.fromEmail}>`,
    to: ["gemma@gentlecarenursing.com.au"],
    ...(replyTo ? { reply_to: replyTo } : {}),
    subject: payload.type === "contact" ? "Website enquiry — Gentle Care Nursing" : "Website referral — Gentle Care Nursing",
    // Plain text avoids interpreting enquiry content as HTML. No patient names in subject.
    text: `Website ${payload.type}\n\n${details}`,
  };
  // HMAC conceals enquiry contents. Resend deduplicates identical requests for 24h,
  // including retries after a timeout; no patient payload is stored or logged here.
  const key = createHmac("sha256", options.apiKey).update(JSON.stringify(email)).digest("hex");
  const response = await (options.fetcher ?? fetch)("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${options.apiKey}`, "Idempotency-Key": `website-enquiry/${key}` },
    body: JSON.stringify(email),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error("Email provider rejected submission");
  const receipt = await response.json() as { id?: unknown };
  if (typeof receipt.id !== "string" || !UUID_PATTERN.test(receipt.id)) throw new Error("Email provider receipt missing");
  return { success: true, submissionId: receipt.id };
}
