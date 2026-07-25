import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { deliverSubmission, validateFormPayload } from "@/lib/submission";

function webhookFor(type: "contact" | "referral"): string {
  if (type === "contact") {
    return process.env.GHL_CONTACT_WEBHOOK_URL || process.env.GHL_WEBHOOK_URL || "";
  }
  return process.env.GHL_REFERRAL_WEBHOOK_URL || process.env.GHL_WEBHOOK_URL || "";
}

/**
 * Validates a website form submission and confirms GoHighLevel accepted it.
 * The returned submissionId is safe to send to GA4 for aggregate reconciliation.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!validateFormPayload(body)) {
      return NextResponse.json(
        { success: false, error: "Invalid form data. Please check required fields." },
        { status: 400 }
      );
    }

    const result = await deliverSubmission(body, {
      webhookUrl: webhookFor(body.type),
      submissionId: randomUUID(),
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(
      "Form submission delivery failed:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { success: false, error: "Submission failed. Please try again." },
      { status: 502 }
    );
  }
}
