import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  type: "contact";
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface ReferralPayload {
  type: "referral";
  referrerName: string;
  referrerEmail: string;
  referrerPhone?: string;
  referrerRole?: string;
  clientName?: string;
  serviceType?: string;
  notes?: string;
}

interface CareFinderPayload {
  type: "care-finder";
  seekingFor: string;
  serviceType: string;
  name: string;
  phone: string;
  email: string;
  notes?: string;
}

interface NewsletterPayload {
  type: "newsletter";
  email: string;
}

type FormPayload = ContactPayload | ReferralPayload | CareFinderPayload | NewsletterPayload;

function validatePayload(body: unknown): body is FormPayload {
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
      typeof obj.referrerEmail === "string" &&
      obj.referrerEmail.includes("@")
    );
  }

  if (obj.type === "newsletter") {
    return (
      typeof obj.email === "string" &&
      obj.email.includes("@")
    );
  }

  if (obj.type === "care-finder") {
    return (
      typeof obj.seekingFor === "string" &&
      obj.seekingFor.trim().length > 0 &&
      typeof obj.serviceType === "string" &&
      obj.serviceType.trim().length > 0 &&
      typeof obj.name === "string" &&
      obj.name.trim().length > 0 &&
      typeof obj.phone === "string" &&
      obj.phone.trim().length > 0 &&
      typeof obj.email === "string" &&
      obj.email.includes("@")
    );
  }

  return false;
}

/**
 * Form submission handler.
 * Validates payload and proxies to GoHighLevel when configured.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!validatePayload(body)) {
      return NextResponse.json(
        { success: false, error: "Invalid form data. Please check required fields." },
        { status: 400 }
      );
    }

    const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL;

    if (ghlWebhookUrl) {
      const ghlResponse = await fetch(ghlWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!ghlResponse.ok) {
        console.error("GoHighLevel webhook failed:", ghlResponse.status);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Form submission error:", err);
    return NextResponse.json(
      { success: false, error: "Submission failed. Please try again." },
      { status: 500 }
    );
  }
}
