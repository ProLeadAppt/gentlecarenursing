"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface ReferralFormProps {
  /** When true, shows minimal fields first with an expand option */
  compact?: boolean;
}

export function ReferralForm({ compact = false }: ReferralFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [expanded, setExpanded] = useState(!compact);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "error") {
      firstFieldRef.current?.focus();
    }
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      type: "referral",
      referrerName: data.get("referrerName"),
      referrerEmail: data.get("referrerEmail"),
      referrerPhone: data.get("referrerPhone"),
      referrerRole: data.get("referrerRole"),
      clientName: data.get("clientName"),
      serviceType: data.get("serviceType"),
      notes: data.get("notes"),
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or contact us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-6 text-center" role="alert">
        <p className="text-lg font-semibold text-foreground">Enquiry Submitted</p>
        <p className="mt-2 text-muted-foreground">
          Thank you — we&apos;ve received your enquiry. You&apos;ll hear from us within minutes.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Need to talk? Call us or send another message.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-primary hover:underline"
        >
          Submit another referral
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <FormField label="Your name" htmlFor="referrer-name" required>
        <Input
          ref={firstFieldRef}
          id="referrer-name"
          name="referrerName"
          type="text"
          placeholder="Name"
          required
          aria-invalid={status === "error"}
        />
      </FormField>
      <FormField label="Your phone" htmlFor="referrer-phone" required>
        <Input id="referrer-phone" name="referrerPhone" type="tel" placeholder="Phone number" required />
      </FormField>
      <FormField label="Service type" htmlFor="service-type">
        <Select id="service-type" name="serviceType">
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
          <FormField label="Your email" htmlFor="referrer-email">
            <Input id="referrer-email" name="referrerEmail" type="email" placeholder="your@email.com" />
          </FormField>
          <FormField label="Your role" htmlFor="referrer-role">
            <Select id="referrer-role" name="referrerRole">
              <option value="">Select...</option>
              <option value="family">Family member</option>
              <option value="ndis">NDIS support coordinator</option>
              <option value="hospital">Hospital discharge planner</option>
              <option value="healthcare">Healthcare professional</option>
              <option value="self">Self-referral</option>
              <option value="other">Other</option>
            </Select>
          </FormField>
          <FormField label="Client / participant name" htmlFor="client-name">
            <Input id="client-name" name="clientName" type="text" placeholder="Client name" />
          </FormField>
          <FormField label="Notes" htmlFor="referral-notes" hint="Tell us about the care needed.">
            <Textarea
              id="referral-notes"
              name="notes"
              rows={3}
              placeholder="Describe the care needs..."
            />
          </FormField>
        </>
      )}

      {status === "error" && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive" role="alert">
          {errorMessage}
        </div>
      )}
      <Button type="submit" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit Referral"}
      </Button>
    </form>
  );
}
