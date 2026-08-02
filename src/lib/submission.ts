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
  webhookUrl: string;
  submissionId: string;
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

  if (obj.type === "contact") {
    return (
      typeof obj.name === "string" &&
      obj.name.trim().length > 0 &&
      typeof obj.email === "string" &&
      obj.email.includes("@") &&
      typeof obj.message === "string" &&
      obj.message.trim().length > 0
    );
  }

  if (obj.type === "referral") {
    const emailIsValid =
      obj.referrerEmail === undefined ||
      obj.referrerEmail === "" ||
      (typeof obj.referrerEmail === "string" && obj.referrerEmail.includes("@"));
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

function assertValidWebhookUrl(webhookUrl: string): void {
  if (!webhookUrl) throw new Error("GoHighLevel webhook is not configured");

  const parsed = new URL(webhookUrl);
  if (parsed.protocol !== "https:" || parsed.hostname !== "services.leadconnectorhq.com") {
    throw new Error("GoHighLevel webhook URL is invalid");
  }
}

export async function deliverSubmission(
  payload: FormPayload,
  options: DeliveryOptions
): Promise<{ success: true; submissionId: string }> {
  if (!validateFormPayload(payload)) throw new Error("Invalid form payload");
  assertValidWebhookUrl(options.webhookUrl);
  const fetcher = options.fetcher ?? fetch;
  const webhookPayload =
    payload.type === "referral"
      ? (() => {
          const { referrerEmail, referrerRole, serviceType, ...referral } = payload;
          return {
            ...referral,
            name: payload.referrerName.trim(),
            phone: payload.referrerPhone.trim(),
            ...(referrerEmail?.trim()
              ? { referrerEmail: referrerEmail.trim(), email: referrerEmail.trim() }
              : {}),
            ...(referrerRole
              ? { referrerRole: REFERRER_ROLE_LABELS[referrerRole] }
              : {}),
            ...(serviceType
              ? { serviceType: REFERRAL_SERVICE_LABELS[serviceType] }
              : {}),
          };
        })()
      : payload;

  const response = await fetcher(options.webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...webhookPayload,
      websiteSubmissionId: options.submissionId,
      source: "website",
    }),
  });

  if (!response.ok) {
    throw new Error(`GoHighLevel webhook failed with status ${response.status}`);
  }

  return { success: true, submissionId: options.submissionId };
}
