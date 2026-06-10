"use client";

import { useState, type FormEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

type FormStatus = "idle" | "submitting" | "success" | "error";

/**
 * Simple contact / referral form for the homepage — per Gemma's brief 2026-06-10.
 * Fields: name, phone, service type, email (for follow-up), message.
 * Submits to /api/submit (type: "contact"), which forwards to the LeadConnector
 * contact webhook (services.leadconnectorhq.com/hooks/...).
 */
export function SimpleContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      type: "contact",
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      serviceType: data.get("serviceType"),
      message: data.get("message"),
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
      setErrorMessage(
        "Something went wrong. Please try again or call us on 1300 004 267."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border/60 bg-white p-8 text-center">
        <h3 className="text-xl font-semibold text-foreground">
          Thanks — we&apos;ve got your message.
        </h3>
        <p className="mt-2 text-muted-foreground">
          Our team will be in touch within 24 hours. If your enquiry is urgent,
          please call us on 1300 004 267.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-border/60 bg-white p-6 sm:p-8 shadow-sm"
      noValidate
    >
      <FormField label="Your name" htmlFor="home-name" required>
        <Input
          id="home-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={120}
        />
      </FormField>

      <FormField label="Phone number" htmlFor="home-phone" required>
        <Input
          id="home-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          maxLength={40}
        />
      </FormField>

      <FormField label="Email" htmlFor="home-email" required>
        <Input
          id="home-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
        />
      </FormField>

      <FormField label="Service type" htmlFor="home-serviceType" required>
        <Select id="home-serviceType" name="serviceType" required defaultValue="">
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

      <FormField label="Message" htmlFor="home-message" required>
        <Textarea
          id="home-message"
          name="message"
          rows={4}
          required
          maxLength={2000}
          placeholder="Tell us a little about your situation or what you need."
        />
      </FormField>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="flex flex-col gap-2 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Send enquiry"}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          We&apos;ll respond within 24 hours. No obligation.
        </p>
      </div>
    </form>
  );
}
