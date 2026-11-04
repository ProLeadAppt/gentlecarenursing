"use client";

import { useState, useRef, useEffect, useId, type FormEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { dispatchAnalyticsEvent } from "@/lib/analytics";
import { submitWebsiteForm } from "@/lib/form-client";
import { EnquiryPrivacyNotice } from "./EnquiryPrivacyNotice";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submittingRef = useRef(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current || !e.currentTarget.reportValidity()) return;
    submittingRef.current = true;
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      type: "contact" as const,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const { submissionId } = await submitWebsiteForm(payload);
      dispatchAnalyticsEvent("generate_lead", {
        form_type: "contact",
        cta_location: "contact_form",
        submission_id: submissionId,
      });
      setStatus("success");
      form.reset();
    } catch {
      dispatchAnalyticsEvent("form_error", {
        form_type: "contact",
        cta_location: "contact_form",
        error_type: "delivery",
      });
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or contact us directly.");
    } finally {
      submittingRef.current = false;
    }
  }

  useEffect(() => {
    if (status === "error") {
      firstFieldRef.current?.focus();
    }
  }, [status]);

  if (status === "success") {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-6 text-center" role="status">
        <p className="text-lg font-semibold text-foreground">Thank you!</p>
        <p className="mt-2 text-muted-foreground">
          Your enquiry has been accepted for delivery. Our team will review it and contact you about next steps.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Need to talk? Call us or send another message.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} data-clarity-mask="true">
      <FormField label="Name" htmlFor={`${formId}-contact-name`} required>
        <Input
          ref={firstFieldRef}
          id={`${formId}-contact-name`}
          name="name"
          type="text"
          placeholder="Your name"
          required
          autoComplete="name"
          maxLength={120}
        />
      </FormField>
      <FormField label="Email" htmlFor={`${formId}-contact-email`} required>
        <Input id={`${formId}-contact-email`} name="email" type="email" autoComplete="email" maxLength={200} placeholder="your@email.com" required />
      </FormField>
      <FormField label="Phone" htmlFor={`${formId}-contact-phone`}>
        <Input id={`${formId}-contact-phone`} name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Phone number (optional)" />
      </FormField>
      <FormField label="Message" htmlFor={`${formId}-contact-message`} required>
        <Textarea
          id={`${formId}-contact-message`}
          name="message"
          rows={4}
          placeholder="What would you like us to contact you about?"
          maxLength={2000}
          required
        />
      </FormField>
      <EnquiryPrivacyNotice />

      {status === "error" && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive" role="alert">
          {errorMessage}
        </div>
      )}
      <Button type="submit" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
