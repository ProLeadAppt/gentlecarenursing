import { NextRequest, NextResponse } from "next/server";
import { deliverSubmission, validateFormPayload } from "@/lib/submission";

export async function POST(request: NextRequest) {
  const fail = (status: number, error: string) => NextResponse.json({ success: false, error }, { status });
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return fail(403, "Invalid form origin.");
  if (!request.headers.get("content-type")?.startsWith("application/json")) return fail(415, "Invalid form format.");
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail(400, "Invalid form data.");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) { await reader.cancel(); return fail(413, "Form data is too large."); }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return fail(400, "Invalid form data."); }
  if (!validateFormPayload(body)) return fail(400, "Invalid form data. Please check required fields.");
  if (!process.env.RESEND_API_KEY) return fail(503, "We cannot send your enquiry right now. Please call 1300 004 267.");
  try {
    const result = await deliverSubmission(body, {
      apiKey: process.env.RESEND_API_KEY,
      fromEmail: process.env.REVIEW_FEEDBACK_FROM_EMAIL ?? "noreply@gentlecarenursing.com.au",
    });
    // Only non-PII provider receipt metadata for operational reconciliation.
    console.info("[enquiry] provider accepted", { submissionId: result.submissionId, type: body.type });
    return NextResponse.json(result);
  } catch {
    // Provider errors may contain submitted content; never log their details.
    console.error("[enquiry] email delivery failed");
    return fail(502, "We could not confirm your enquiry was sent. Please try again or call 1300 004 267.");
  }
}
