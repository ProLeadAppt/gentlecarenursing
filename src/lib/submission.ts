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
  referrerPhone?: string;
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
    return (
      typeof obj.referrerName === "string" &&
      obj.referrerName.trim().length > 0 &&
      (!obj.referrerEmail ||
        (typeof obj.referrerEmail === "string" && obj.referrerEmail.includes("@")))
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
  assertValidWebhookUrl(options.webhookUrl);
  const fetcher = options.fetcher ?? fetch;

  const response = await fetcher(options.webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      websiteSubmissionId: options.submissionId,
      source: "website",
    }),
  });

  if (!response.ok) {
    throw new Error(`GoHighLevel webhook failed with status ${response.status}`);
  }

  return { success: true, submissionId: options.submissionId };
}
