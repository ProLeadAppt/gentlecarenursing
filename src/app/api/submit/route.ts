import { NextRequest, NextResponse } from "next/server";
import { deliverSubmission, validateFormPayload } from "@/lib/submission";
import { readBoundedRequestBody } from "@/lib/request-body";

// Allow the existing bounded fields after UTF-8/JSON encoding, while still
// limiting the raw request independently of its claimed Content-Length.
const MAX_REQUEST_BYTES = 64 * 1024;

export async function POST(request: NextRequest) {
  const fail = (status: number, error: string) => NextResponse.json({ success: false, error }, { status });
  const origin = request.headers.get("origin");
  if (origin !== null && origin !== request.nextUrl.origin) return fail(403, "Invalid form origin.");
  const mediaType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (mediaType !== "application/json") return fail(415, "Invalid form format.");
  let body: unknown;
  try {
    const result = await readBoundedRequestBody(request.body, MAX_REQUEST_BYTES);
    if (result.kind === "too-large") return fail(413, "Form data is too large.");
    if (result.kind === "timed-out") return fail(408, "Receiving your form timed out. Your enquiry was not sent. Please try again or call 1300 004 267.");
    body = JSON.parse(Buffer.from(result.bytes).toString("utf8"));
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
