"use client";

import { useState, useRef, useId, useEffect, type FormEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { dispatchAnalyticsEvent } from "@/lib/analytics";
import { submitWebsiteForm, WebsiteSubmissionError } from "@/lib/form-client";
import { clearFieldValidation, reportFormValidity } from "@/lib/form-validation";

type FormStatus = "idle" | "submitting" | "success" | "rejected" | "uncertain";

/**
 * Simple contact / referral form for the homepage — per Gemma's brief 2026-06-10.
 * Fields: name, phone, service type, email (for follow-up), message.
 * Submits to /api/submit (type: "contact"), which emails the verified enquiry recipient.
 */
export function SimpleContactForm() {
  const idPrefix = useId();
  const [status, setStatus] = useState<FormStatus>("idle");
  const outcomeRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restartFocusRef = useRef(false);
  const submittingRef = useRef(false);
  const submissionLockedRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (status !== "idle") {
      outcomeRef.current?.focus({ preventScroll: true });
      outcomeRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    } else if (status === "idle" && restartFocusRef.current) {
      restartFocusRef.current = false;
      firstFieldRef.current?.focus();
    }
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submissionLockedRef.current || submittingRef.current) return;
    const form = e.currentTarget;
    if (!reportFormValidity(form)) return;
    submittingRef.current = true;
    submissionLockedRef.current = true;
    setStatus("submitting");

    const data = new FormData(form);
    const payload = {
      type: "contact" as const,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      serviceType: String(data.get("serviceType") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const { submissionId } = await submitWebsiteForm(payload);
      dispatchAnalyticsEvent("generate_lead", {
        form_type: "contact",
        service_type: payload.serviceType,
        cta_location: "homepage",
        submission_id: submissionId,
      });
      if (mountedRef.current) {
        setStatus("success");
        form.reset();
      }
    } catch (error) {
      dispatchAnalyticsEvent("form_error", {
        form_type: "contact",
        cta_location: "homepage",
        error_type: "delivery",
      });
      const rejected = error instanceof WebsiteSubmissionError && error.outcome === "rejected";
      // Only a verified pre-delivery rejection permits a revalidated retry.
      // A timeout, lost response or invalid receipt cannot establish non-delivery.
      submissionLockedRef.current = !rejected;
      if (mountedRef.current) {
        setStatus(rejected ? "rejected" : "uncertain");
      }
    } finally {
      submittingRef.current = false;
    }
  }

  if (status === "success") {
    return (
      <div
        ref={outcomeRef}
        data-form-outcome
        tabIndex={-1}
        role="status"
        aria-atomic="true"
        aria-labelledby={`home-contact-success-${idPrefix}`}
        className="scroll-mt-24 rounded-2xl border border-pw-border bg-white p-8 text-center shadow-sm"
      >
        <div
          className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "rgba(107,147,96,0.12)" }}
        >
          <span className="text-2xl text-pw-sage" aria-hidden>
            ✓
          </span>
        </div>
        <h3 id={`home-contact-success-${idPrefix}`} className="text-xl font-semibold text-foreground font-[family-name:var(--font-serif)]">
          Enquiry accepted for delivery
        </h3>
        <p className="mt-2 text-muted-foreground">
          Thank you. Your enquiry email has been accepted for delivery. This does not confirm inbox receipt, a booking or service availability.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          For an urgent enquiry, call 1300 004 267. Please contact us before submitting the same enquiry again.
        </p>
        <button
          type="button"
          onClick={() => {
            // This explicit action starts a different enquiry after acceptance.
            // Uncertain attempts intentionally have no in-form restart action.
            submissionLockedRef.current = false;
            restartFocusRef.current = true;
            setStatus("idle");
          }}
          className="mt-4 text-sm font-medium text-primary hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit} onInput={clearFieldValidation}
      className="rounded-2xl border border-pw-border bg-white p-6 sm:p-8 shadow-[0_20px_60px_-30px_rgba(132,40,51,0.25)]"
      aria-busy={status === "submitting"}
    >
      {status === "submitting" && (
        <div ref={outcomeRef} data-form-outcome tabIndex={-1} role="status" aria-atomic="true" className="mb-4 scroll-mt-24 rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm">
          Sending your enquiry. Please wait for confirmation before sending again.
        </div>
      )}
      {(status === "rejected" || status === "uncertain") && (
        <div ref={outcomeRef} data-form-outcome tabIndex={-1} role="alert" aria-atomic="true" className="mb-4 scroll-mt-24 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {status === "rejected" ? (
            "Your enquiry was not sent. Please review your details and try again, or call us on 1300 004 267."
          ) : (
            <>
              We couldn’t confirm whether your enquiry was accepted for delivery. Your details are still here.
              {" "}Please call us on 1300 004 267 to check the outcome. This form is paused to avoid a duplicate enquiry.
            </>
          )}
        </div>
      )}
      <fieldset disabled={status === "submitting" || status === "uncertain"} className="min-w-0 grid gap-5">
        <FormField label="Your name" htmlFor={`home-name-${idPrefix}`} required>
          <Input
            ref={firstFieldRef}
            id={`home-name-${idPrefix}`}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
          />
        </FormField>

        <FormField label="Phone number" htmlFor={`home-phone-${idPrefix}`} required>
          <Input
            id={`home-phone-${idPrefix}`}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={40}
          />
        </FormField>

        <FormField label="Email" htmlFor={`home-email-${idPrefix}`} required>
          <Input
            id={`home-email-${idPrefix}`}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
          />
        </FormField>

        <FormField label="Service type" htmlFor={`home-serviceType-${idPrefix}`} required>
          <Select id={`home-serviceType-${idPrefix}`} name="serviceType" required defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            <option value="Clinical Nursing">Clinical Nursing</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Complex Care">Complex Care</option>
            <option value="Overnight Support">Overnight Support</option>
            <option value="Post-Hospital Support">Post-Hospital Support</option>
            <option value="Community Participation">
              Community Participation
            </option>
            <option value="Not sure yet">Not sure yet</option>
          </Select>
        </FormField>

        <FormField label="Message" htmlFor={`home-message-${idPrefix}`} required>
          <Textarea
            id={`home-message-${idPrefix}`}
            name="message"
            rows={4}
            required
            maxLength={2000}
            placeholder="Tell us a little about your situation or what you need."
          />
        </FormField>


        <div className="flex flex-col gap-2 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={status === "submitting" || status === "uncertain"}
          >
            {status === "submitting" ? "Sending..." : "Send enquiry"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            We&apos;ll discuss your enquiry with you. No obligation.
          </p>
        </div>
      </fieldset>
    </form>
  );
}
