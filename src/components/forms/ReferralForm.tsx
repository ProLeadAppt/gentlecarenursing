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

interface ReferralFormProps {
  /** When true, shows minimal fields first with an expand option */
  compact?: boolean;
}

export function ReferralForm({ compact = false }: ReferralFormProps) {
  const idPrefix = useId();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [expanded, setExpanded] = useState(!compact);
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
      outcomeRef.current?.focus();
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
      type: "referral" as const,
      referrerName: String(data.get("referrerName") ?? ""),
      referrerEmail: String(data.get("referrerEmail") ?? ""),
      referrerPhone: String(data.get("referrerPhone") ?? ""),
      referrerRole: String(data.get("referrerRole") ?? ""),
      clientName: String(data.get("clientName") ?? ""),
      serviceType: String(data.get("serviceType") ?? ""),
      notes: String(data.get("notes") ?? ""),
    };

    try {
      const { submissionId } = await submitWebsiteForm(payload);
      dispatchAnalyticsEvent("referral_submit", {
        form_type: "referral",
        service_type: payload.serviceType,
        cta_location: compact ? "compact_referral_form" : "referral_form",
        submission_id: submissionId,
      });
      if (mountedRef.current) {
        setStatus("success");
        form.reset();
      }
    } catch (error) {
      dispatchAnalyticsEvent("form_error", {
        form_type: "referral",
        cta_location: compact ? "compact_referral_form" : "referral_form",
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
        aria-labelledby={`referral-success-${idPrefix}`}
        className="rounded-lg border border-accent/30 bg-accent/5 p-6 text-center"
      >
        <p id={`referral-success-${idPrefix}`} className="text-lg font-semibold text-foreground">Referral accepted for delivery</p>
        <p className="mt-2 text-muted-foreground">
          Thank you. Your referral email has been accepted for delivery. This does not confirm inbox receipt, a booking or service availability.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Need to check on your referral? Please contact us before submitting it again.
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
          Submit another referral
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onInput={clearFieldValidation} aria-busy={status === "submitting"}>
      {status === "submitting" && (
        <div ref={outcomeRef} data-form-outcome tabIndex={-1} role="status" aria-atomic="true" className="mb-4 scroll-mt-24 rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm">
          Sending your referral. Please wait for confirmation before sending again.
        </div>
      )}
      {(status === "rejected" || status === "uncertain") && (
        <div ref={outcomeRef} data-form-outcome tabIndex={-1} role="alert" aria-atomic="true" className="mb-4 scroll-mt-24 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {status === "rejected" ? (
            "Your referral was not sent. Please review your details and try again, or call us on 1300 004 267."
          ) : (
            <>
              We couldn’t confirm whether your referral was accepted for delivery. Your details are still here.
              {" "}Please call us on 1300 004 267 to check the outcome. This form is paused to avoid a duplicate referral.
            </>
          )}
        </div>
      )}
      <fieldset disabled={status === "submitting" || status === "uncertain"} className="min-w-0 space-y-5">
        <FormField label="Your name" htmlFor={`referrer-name-${idPrefix}`} required>
          <Input
            ref={firstFieldRef}
            id={`referrer-name-${idPrefix}`}
            name="referrerName"
            type="text"
            placeholder="Name"
            required
          />
        </FormField>
        <FormField label="Your phone" htmlFor={`referrer-phone-${idPrefix}`} required>
          <Input id={`referrer-phone-${idPrefix}`} name="referrerPhone" type="tel" placeholder="Phone number" required />
        </FormField>
        <FormField label="Service type" htmlFor={`service-type-${idPrefix}`}>
          <Select id={`service-type-${idPrefix}`} name="serviceType">
            <option value="">Select...</option>
            <option value="ndis">NDIS</option>
            <option value="dva">DVA / Community Nursing</option>
            <option value="aged-care">Aged Care</option>
            <option value="private">Private</option>
            <option value="unsure">Not sure yet</option>
          </Select>
        </FormField>

        {!expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-sm font-medium text-primary hover:underline"
          >
            + Add more details
          </button>
        )}

        {expanded && (
          <>
            <FormField label="Your email" htmlFor={`referrer-email-${idPrefix}`}>
              <Input id={`referrer-email-${idPrefix}`} name="referrerEmail" type="email" placeholder="your@email.com" />
            </FormField>
            <FormField label="Your role" htmlFor={`referrer-role-${idPrefix}`}>
              <Select id={`referrer-role-${idPrefix}`} name="referrerRole">
                <option value="">Select...</option>
                <option value="family">Family member</option>
                <option value="ndis">NDIS support coordinator</option>
                <option value="hospital">Hospital discharge planner</option>
                <option value="healthcare">Healthcare professional</option>
                <option value="self">Self-referral</option>
                <option value="other">Other</option>
              </Select>
            </FormField>
            <FormField label="Client / participant name" htmlFor={`client-name-${idPrefix}`}>
              <Input id={`client-name-${idPrefix}`} name="clientName" type="text" placeholder="Client name" />
            </FormField>
            <FormField label="Notes" htmlFor={`referral-notes-${idPrefix}`} hint="Tell us about the care needed.">
              <Textarea
                id={`referral-notes-${idPrefix}`}
                aria-describedby={`referral-notes-${idPrefix}-hint`}
                name="notes"
                rows={3}
                placeholder="Describe the care needs..."
              />
            </FormField>
          </>
        )}

        <Button type="submit" className="w-full" disabled={status === "submitting" || status === "uncertain"}>
          {status === "submitting" ? "Submitting..." : "Submit Referral"}
        </Button>
      </fieldset>
    </form>
  );
}
