import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/constants";

/**
 * /api/feedback
 *
 * Receives private feedback from the /review funnel (1–3 star path)
 * and emails it to Gemma's main address (SITE.email) so she can
 * respond privately, NEVER surfacing low ratings publicly.
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

const SERVICE_LABELS: Record<string, string> = {
  "clinical-nursing": "Clinical Nursing",
  "personal-care": "Personal Care",
  "complex-care": "Complex Care",
  "overnight-support": "Overnight Support",
  "post-hospital": "Post-Hospital Support",
  "community-participation": "Community Participation",
  other: "Other",
};

function isValidRating(n: unknown): n is 1 | 2 | 3 {
  return n === 1 || n === 2 || n === 3;
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
    service: p.service ? SERVICE_LABELS[p.service] ?? p.service : "—",
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
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px;">What could we have done better?</p>
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
  let payload: FeedbackPayload;
  try {
    const body = await request.json();
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
          "This endpoint is for private feedback only (1–3 stars). For 4–5 star reviews, please use our Google page.",
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
      "[feedback] RESEND_API_KEY not set. Feedback payload (for manual follow-up):",
      payload
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
    const result = await resend.emails.send({
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
Service: ${payload.service ? SERVICE_LABELS[payload.service] ?? payload.service : "—"}
Follow-up OK: ${payload.allowFollowup ? "Yes" : "No"}

What could we have done better?
${payload.improvements?.trim() || "(no detail provided)"}

Submitted: ${new Date().toISOString()}`,
    });

    if (result.error) {
      console.error("[feedback] Resend error:", result.error);
      return NextResponse.json(
        {
          success: false,
          error:
            "We couldn't send your feedback just now. Please email us directly at " +
            SITE.email,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[feedback] Unexpected error:", err);
    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong on our end. Please email us directly at " +
          SITE.email,
      },
      { status: 500 }
    );
  }
}
