"use client";

import { useState, useRef, useId, useEffect, type FormEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { dispatchAnalyticsEvent } from "@/lib/analytics";
import { submitWebsiteForm, WebsiteSubmissionError } from "@/lib/form-client";
import { clearFieldValidation, reportFormValidity } from "@/lib/form-validation";

type FormStatus = "idle" | "submitting" | "success" | "rejected" | "uncertain";

export function ContactForm({ active = true, onRetainSessionChange }: { active?: boolean; onRetainSessionChange?: (retain: boolean) => void }) {
  const idPrefix = useId();
  const [status, setStatus] = useState<FormStatus>("idle");
  const outcomeRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restartFocusRef = useRef(false);
  const submittingRef = useRef(false);
  const submissionLockedRef = useRef(false);
  const mountedRef = useRef(true);
  const formRef = useRef<HTMLFormElement>(null);
  const [detailsCleared, setDetailsCleared] = useState(false);
  const [wasActive, setWasActive] = useState(active);
  if (wasActive !== active) {
    setWasActive(active);
    if (!active) setDetailsCleared(true);
  }

  useEffect(() => {
    if (!active) {
      // The modal hides this panel immediately. Discard displayed details while
      // retaining only the local delivery outcome and duplicate-submit lock.
      formRef.current?.reset();
    }
  }, [active]);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!active || submissionLockedRef.current || submittingRef.current) return;
    const form = e.currentTarget;
    if (!reportFormValidity(form)) return;
    submittingRef.current = true;
    submissionLockedRef.current = true;
    onRetainSessionChange?.(true);
    setDetailsCleared(false);
    setStatus("submitting");

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
      if (mountedRef.current) {
        setStatus("success");
        form.reset();
      }
    } catch (error) {
      dispatchAnalyticsEvent("form_error", {
        form_type: "contact",
        cta_location: "contact_form",
        error_type: "delivery",
      });
      const rejected = error instanceof WebsiteSubmissionError && error.outcome === "rejected";
      // Only a verified pre-delivery rejection permits a revalidated retry.
      // A timeout, lost response or invalid receipt cannot establish non-delivery.
      submissionLockedRef.current = !rejected;
      if (mountedRef.current) {
        onRetainSessionChange?.(!rejected);
        setStatus(rejected ? "rejected" : "uncertain");
      }
    } finally {
      submittingRef.current = false;
    }
  }

  useEffect(() => {
    if (active && status !== "idle") {
      outcomeRef.current?.focus({ preventScroll: true });
      outcomeRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    } else if (active && status === "idle" && restartFocusRef.current) {
      restartFocusRef.current = false;
      firstFieldRef.current?.focus();
    }
  }, [active, status]);

  if (status === "success") {
    return (
      <div
        ref={outcomeRef}
        data-form-outcome
        tabIndex={-1}
        role="status"
        aria-atomic="true"
        aria-labelledby={`contact-success-${idPrefix}`}
        className="scroll-mt-24 rounded-lg border border-accent/30 bg-accent/5 p-6 text-center"
      >
        <p id={`contact-success-${idPrefix}`} className="text-lg font-semibold text-foreground">Enquiry accepted for delivery</p>
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
            onRetainSessionChange?.(false);
            setDetailsCleared(false);
            restartFocusRef.current = true;
            setStatus("idle");
          }}
          className="mt-4 text-sm font-medium text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} onInput={clearFieldValidation} aria-busy={status === "submitting"}>
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
              We couldn’t confirm whether your enquiry was accepted for delivery. {detailsCleared ? "Your entered details have been cleared." : "Your details are still here."}
              {" "}Please call us on 1300 004 267 to check the outcome. This form is paused to avoid a duplicate enquiry.
            </>
          )}
        </div>
      )}
      <fieldset disabled={status === "submitting" || status === "uncertain"} className="min-w-0 space-y-6">
        <FormField label="Name" htmlFor={`contact-name-${idPrefix}`} required>
          <Input
            ref={firstFieldRef}
            id={`contact-name-${idPrefix}`}
            name="name"
            type="text"
            placeholder="Your name"
            required
          />
        </FormField>
        <FormField label="Email" htmlFor={`contact-email-${idPrefix}`} required>
          <Input id={`contact-email-${idPrefix}`} name="email" type="email" placeholder="your@email.com" required />
        </FormField>
        <FormField label="Phone" htmlFor={`contact-phone-${idPrefix}`}>
          <Input id={`contact-phone-${idPrefix}`} name="phone" type="tel" placeholder="Phone number (optional)" />
        </FormField>
        <FormField label="Message" htmlFor={`contact-message-${idPrefix}`} required>
          <Textarea
            id={`contact-message-${idPrefix}`}
            name="message"
            rows={4}
            placeholder="How can we help?"
            required
          />
        </FormField>
        <Button type="submit" className="w-full" disabled={status === "submitting" || status === "uncertain"}>
          {status === "submitting" ? "Sending..." : "Send Message"}
        </Button>
      </fieldset>
    </form>
  );
}
