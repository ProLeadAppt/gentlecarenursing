import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/constants";
import { readBoundedRequestBody } from "@/lib/request-body";

/**
 * /api/feedback
 *
 * Receives private feedback for every rating and emails it to
 * the existing team address (SITE.email). Choosing private feedback
 * is independent of the public Google-review option.
 *
 * Falls back gracefully if RESEND_API_KEY is missing — returns 503
 * with a "please email us directly" message rather than crashing.
 */

interface FeedbackPayload {
  rating: 1 | 2 | 3 | 4 | 5;
  name?: string;
  contact?: string;
  service?: string;
  improvements?: string;
  allowFollowup?: boolean;
}

// Match the enquiry provider's 10-second wait. This bounds our wait only:
// Resend may still accept the email after expiry, so it must never trigger retry.
async function waitForFeedbackProvider<T>(send: () => Promise<T>): Promise<
  { kind: "completed"; result: T } | { kind: "timed-out" }
> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    const expired = new Promise<{ kind: "timed-out" }>(resolve => {
      timeout = setTimeout(() => resolve({ kind: "timed-out" }), 10_000);
    });
    // Promise.race observes a late rejection as well as a late acceptance.
    // Neither can change the response once the deadline has won.
    return await Promise.race([
      send().then(result => ({ kind: "completed" as const, result })),
      expired,
    ]);
  } finally {
    if (timeout !== undefined) clearTimeout(timeout);
  }
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

function isValidRating(n: unknown): n is 1 | 2 | 3 | 4 | 5 {
  return n === 1 || n === 2 || n === 3 || n === 4 || n === 5;
}

function serviceLabel(service?: string): string {
  if (!service) return "—";
  return Object.prototype.hasOwnProperty.call(SERVICE_LABELS, service)
    ? SERVICE_LABELS[service]
    : service;
}

function isValidEmail(s: string): boolean {
  // Permissive — optional field, only validate if non-empty
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function htmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailBody(p: FeedbackPayload): string {
  const submittedAt = new Date().toLocaleString("en-AU", {
    timeZone: "Australia/Sydney",
    dateStyle: "long",
    timeStyle: "short",
  });

  const safe = {
    name: htmlEscape(p.name?.trim() || "Anonymous"),
    contact: htmlEscape(p.contact?.trim() || "—"),
    service: htmlEscape(serviceLabel(p.service)),
    improvements: htmlEscape(p.improvements?.trim() || "(no detail provided)"),
    followup: p.allowFollowup ? "Yes" : "No",
    rating: p.rating,
    submittedAt,
  };

  // 5 stars out of 5 → render as filled/empty stars
  const stars = "★".repeat(safe.rating) + "☆".repeat(5 - safe.rating);

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
      <div style="background: linear-gradient(135deg, #842833 0%, #6b2028 100%); padding: 24px 28px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; color: #fff; font-size: 22px; font-weight: 600;">
          Private feedback received
        </h1>
        <p style="margin: 6px 0 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">
          From a Gentle Care client · ${safe.submittedAt}
        </p>
      </div>

      <div style="background: #fafafa; padding: 24px 28px; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 140px; vertical-align: top;">Rating</td>
            <td style="padding: 8px 0; font-size: 18px; color: #f59e0b; letter-spacing: 2px;">${stars}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Name</td>
            <td style="padding: 8px 0; font-size: 15px;">${safe.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Contact</td>
            <td style="padding: 8px 0; font-size: 15px;">${safe.contact}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Service</td>
            <td style="padding: 8px 0; font-size: 15px;">${safe.service}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Follow-up OK?</td>
            <td style="padding: 8px 0; font-size: 15px;">${safe.followup}</td>
          </tr>
        </table>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px;">What would you like to share?</p>
          <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${safe.improvements}</div>
        </div>
      </div>

      <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center;">
        Sent automatically from gentlecarenursing.com.au/review
      </p>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  const fail = (status: number, error: string) =>
    NextResponse.json({ success: false, error }, { status });
  const origin = request.headers.get("origin");
  if (origin !== null && origin !== request.nextUrl.origin) {
    return fail(403, "Invalid feedback origin.");
  }
  const mediaType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (mediaType !== "application/json") {
    return fail(415, "Invalid feedback format.");
  }

  let payload: FeedbackPayload;
  try {
    const result = await readBoundedRequestBody(request.body, 64 * 1024);
    if (result.kind === "too-large") return fail(413, "Feedback is too large. Please shorten your message.");
    if (result.kind === "timed-out") return fail(408, "Receiving your feedback timed out. Your feedback was not sent. Please try again or email " + SITE.email + ".");
    const body = JSON.parse(Buffer.from(result.bytes).toString("utf8"));
    if (
      body === null || typeof body !== "object" || Array.isArray(body) ||
      ["name", "contact", "service", "improvements"].some(
        (field) => body[field] !== undefined && typeof body[field] !== "string"
      ) ||
      (body.allowFollowup !== undefined && typeof body.allowFollowup !== "boolean")
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 }
      );
    }
    payload = body as FeedbackPayload;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Validate
  if (!isValidRating(payload.rating)) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Please choose a rating from 1 to 5.",
      },
      { status: 400 }
    );
  }

  if (
    payload.contact &&
    payload.contact.trim().length > 0 &&
    !isValidEmail(payload.contact) &&
    !/^[\d\s+()-]{6,}$/.test(payload.contact)
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Please enter a valid email or phone number, or leave the field blank.",
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.REVIEW_FEEDBACK_FROM_EMAIL ?? "noreply@gentlecarenursing.com.au";

  if (!apiKey) {
    // Don't crash — log and return a friendly error so the user can be
    // told to email us directly.
    console.error(
      "[feedback] RESEND_API_KEY not set. Feedback delivery unavailable."
    );
    return NextResponse.json(
      {
        success: false,
        error:
          "We're having trouble receiving your message right now. Please email us directly at " +
          SITE.email +
          " and we'll respond personally.",
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const subject = `Private feedback (${payload.rating}/5) from a Gentle Care client`;

  try {
    const delivery = await waitForFeedbackProvider(() => resend.emails.send({
      from: `Gentle Care Feedback <${fromEmail}>`,
      to: [SITE.email],
      replyTo:
        payload.contact && isValidEmail(payload.contact)
          ? payload.contact
          : undefined,
      subject,
      html: buildEmailBody(payload),
      text: `Rating: ${payload.rating}/5
Name: ${payload.name?.trim() || "Anonymous"}
Contact: ${payload.contact?.trim() || "—"}
Service: ${serviceLabel(payload.service)}
Follow-up OK: ${payload.allowFollowup ? "Yes" : "No"}

What would you like to share?
${payload.improvements?.trim() || "(no detail provided)"}

Submitted: ${new Date().toISOString()}`,
    }));

    if (delivery.kind === "timed-out") {
      console.error("[feedback] Feedback provider confirmation timed out.");
      return NextResponse.json(
        {
          success: false,
          error:
            "We couldn't confirm whether your feedback was accepted for delivery. Please contact us at " +
            SITE.email + " before sending it again to avoid a duplicate.",
        },
        { status: 504 }
      );
    }
    const result = delivery.result;

    // A successful transport response alone does not establish provider acceptance.
    // Keep the receipt internal; acceptance still does not prove inbox delivery.
    if (result.error || typeof result.data?.id !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(result.data.id)) {
      console.error("[feedback] Feedback provider delivery failed.");
      return NextResponse.json(
        {
          success: false,
          error:
            "We couldn't confirm whether your feedback was accepted for delivery. Please contact us at " +
            SITE.email + " before sending it again to avoid a duplicate.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error("[feedback] Unexpected feedback delivery failure.");
    return NextResponse.json(
      {
        success: false,
        error:
          "We couldn't confirm whether your feedback was accepted for delivery. Please contact us at " +
          SITE.email + " before sending it again to avoid a duplicate.",
      },
      { status: 500 }
    );
  }
}
