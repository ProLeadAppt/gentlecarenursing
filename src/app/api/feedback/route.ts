import { createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/constants";

interface FeedbackPayload {
  rating: 1 | 2 | 3 | 4 | 5;
  name?: string;
  contact?: string;
  service?: string;
  improvements?: string;
  allowFollowup?: boolean;
}

const SERVICE_LABELS: Record<string, string> = {
  "clinical-nursing": "Clinical Nursing",
  "personal-care": "Personal Care",
  "complex-care": "Complex Care",
  "overnight-support": "Overnight Support",
  "post-hospital": "Post-Hospital Support",
  "community-participation": "Community Participation",
  other: "Other",
};
const RECEIPT_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const isEmail = (value: string) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);

function isFeedback(body: unknown): body is FeedbackPayload {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  const p = body as Record<string, unknown>;
  const limits: Record<string, number> = { name: 254, contact: 254, service: 64, improvements: 5000 };
  if (Object.keys(p).some(key => !Object.hasOwn(limits, key) && key !== "rating" && key !== "allowFollowup")) return false;
  if (![1, 2, 3, 4, 5].includes(p.rating as number)) return false;
  if (p.allowFollowup !== undefined && typeof p.allowFollowup !== "boolean") return false;
  for (const [key, max] of Object.entries(limits)) {
    if (p[key] !== undefined && (typeof p[key] !== "string" || (p[key] as string).length > max)) return false;
  }
  if (p.service && !Object.hasOwn(SERVICE_LABELS, p.service as string)) return false;
  const contact = (p.contact as string | undefined)?.trim() ?? "";
  if (contact && !isEmail(contact) && !/^[+()\d .-]{6,30}$/.test(contact)) return false;
  if (contact && !isEmail(contact) && contact.replace(/\D/g, "").length < 6) return false;
  return !p.allowFollowup || Boolean(contact);
}

/** Private feedback is available to every rating; nothing is published by this endpoint. */
export async function POST(request: NextRequest) {
  const fail = (status: number, error: string) => NextResponse.json({ success: false, error }, { status });
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return fail(403, "Invalid form origin.");
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return fail(415, "Invalid form format.");
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail(400, "Invalid feedback data.");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) { await reader.cancel(); return fail(413, "Feedback is too large."); }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return fail(400, "Invalid feedback data."); }
  if (!isFeedback(body)) return fail(400, "Please check your rating and contact details. Add a valid email or phone number if you would like a follow-up.");
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return fail(503, `We cannot send your feedback right now. Please email ${SITE.email}.`);
  const fromEmail = process.env.REVIEW_FEEDBACK_FROM_EMAIL ?? "noreply@gentlecarenursing.com.au";
  const contact = body.contact?.trim();
  const email = {
    from: `Gentle Care Feedback <${fromEmail}>`,
    to: [SITE.email],
    ...(body.allowFollowup && contact && isEmail(contact) ? { reply_to: contact } : {}),
    subject: "Private website feedback — Gentle Care Nursing",
    // Plain text avoids interpreting user feedback as markup.
    text: `Rating: ${body.rating}/5\nName: ${body.name?.trim() || "Anonymous"}\nContact: ${contact || "—"}\nService: ${body.service ? SERVICE_LABELS[body.service] : "—"}\nFollow-up OK: ${body.allowFollowup ? "Yes" : "No"}\n\nFeedback:\n${body.improvements?.trim() || "(no detail provided)"}`,
  };
  try {
    // Stable, opaque key deduplicates retries at the provider without storing feedback.
    const key = createHmac("sha256", apiKey).update(JSON.stringify(email)).digest("hex");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}`, "Idempotency-Key": `website-feedback/${key}` },
      body: JSON.stringify(email),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Provider rejected feedback");
    const receipt: unknown = await response.json();
    if (!receipt || typeof receipt !== "object" || !("id" in receipt) || typeof receipt.id !== "string" || !RECEIPT_ID.test(receipt.id)) throw new Error("Provider receipt missing");
    // Acceptance is not confirmation of inbox delivery. Never log payload or raw provider errors.
    return NextResponse.json({ success: true, submissionId: receipt.id });
  } catch {
    console.error("[feedback] email acceptance could not be confirmed");
    return fail(502, `We could not confirm your feedback was sent. Please try again or email ${SITE.email}.`);
  }
}
