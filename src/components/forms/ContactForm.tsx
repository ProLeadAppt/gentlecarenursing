"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

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
      setErrorMessage("Something went wrong. Please try again or contact us directly.");
    }
  }

  useEffect(() => {
    if (status === "error") {
      firstFieldRef.current?.focus();
    }
  }, [status]);

  if (status === "success") {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-6 text-center" role="alert">
        <p className="text-lg font-semibold text-foreground">Thank you!</p>
        <p className="mt-2 text-muted-foreground">
          We&apos;ve received your message — you&apos;ll hear from us within minutes.
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
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <FormField label="Name" htmlFor="contact-name" required>
        <Input
          ref={firstFieldRef}
          id="contact-name"
          name="name"
          type="text"
          placeholder="Your name"
          required
          aria-invalid={status === "error"}
        />
      </FormField>
      <FormField label="Email" htmlFor="contact-email" required>
        <Input id="contact-email" name="email" type="email" placeholder="your@email.com" required />
      </FormField>
      <FormField label="Phone" htmlFor="contact-phone">
        <Input id="contact-phone" name="phone" type="tel" placeholder="Phone number (optional)" />
      </FormField>
      <FormField label="Message" htmlFor="contact-message" required>
        <Textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="How can we help?"
          required
        />
      </FormField>
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
