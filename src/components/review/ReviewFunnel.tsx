"use client";

import { useRef, useState } from "react";
import { StarRating, type StarRatingValue } from "./StarRating";
import { SITE } from "@/lib/constants";
import { isSubmissionConfirmation } from "@/lib/form-client";
import { ArrowRight, Mail, ExternalLink } from "lucide-react";

/** Public reviews and private feedback are equally available, independent of sentiment. */
export function ReviewFunnel() {
  const [showPrivate, setShowPrivate] = useState(false);
  const [rating, setRating] = useState<StarRatingValue | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-center text-muted-foreground mb-6">
        All experiences are welcome. Choose a public Google review or private feedback to our team.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <a href={SITE.gbpReviewUrl} className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary px-6 py-4 text-base font-semibold text-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-4">
          Leave a Google review <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
        <button type="button" aria-expanded={showPrivate} aria-controls="private-feedback" onClick={() => setShowPrivate(true)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary px-6 py-4 text-base font-semibold text-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-4">
          Share private feedback <Mail className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <p className="mt-3 text-sm text-center text-muted-foreground">Google reviews are public. Private feedback is not posted publicly.</p>
      {showPrivate && (
        <div id="private-feedback" className="mt-8" data-clarity-mask="true">
          {rating === null ? (
            <StarRating onContinue={setRating} continueLabel="Continue with private feedback" />
          ) : (
            <FeedbackFormInline rating={rating} onReset={() => setRating(null)} />
          )}
        </div>
      )}
    </div>
  );
}

interface FeedbackFormInlineProps {
  rating: StarRatingValue;
  onReset: () => void;
}

function FeedbackFormInline({ rating, onReset }: FeedbackFormInlineProps) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle");
  const submitting = useRef(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      rating,
      name: data.get("name")?.toString().trim() ?? "",
      contact: data.get("contact")?.toString().trim() ?? "",
      service: data.get("service")?.toString() ?? "",
      improvements: data.get("improvements")?.toString().trim() ?? "",
      allowFollowup: data.get("allowFollowup") === "on",
    };

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 400) {
        setErrorMessage("Please check your feedback and enter a valid email address or phone number if you want us to follow up.");
        setStatus("error");
        return;
      }
      const json: unknown = await res.json();
      if (!res.ok || !isSubmissionConfirmation(json)) {
        throw new Error("Unable to send right now.");
      }
      setStatus("sent");
    } catch {
      setErrorMessage("Unable to confirm delivery. Please try again or email us directly.");
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-8 text-center">
        <Mail className="mx-auto h-10 w-10 text-primary" aria-hidden />
        <h3 className="mt-4 font-[family-name:var(--font-serif)] text-2xl text-foreground">
          Thank you for telling us
        </h3>
        <p className="mt-2 text-base text-muted-foreground max-w-md mx-auto">
          Our email service has accepted your private feedback for delivery.
          Thank you for sharing your experience.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 text-sm text-primary underline underline-offset-2 hover:text-primary-light transition-colors"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-5"
      data-clarity-mask="true"
      aria-busy={status === "submitting"}
    >
      <div>
        <h3 className="font-[family-name:var(--font-serif)] text-2xl text-foreground">
          Share your experience
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Tell us what worked well or what we could improve. Your feedback is sent to our team through our email service.
        </p>
      </div>

      {/* Star recap */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>You rated your experience</span>
        <span className="font-semibold text-foreground">{rating}/5</span>
      </div>

      <Field id="name" label="Your name (optional)" name="name" type="text" />
      <Field
        id="contact"
        label="Email or phone (only if you'd like a reply)"
        name="contact"
        type="text"
      />

      <div>
        <label
          htmlFor="service"
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          What service did we provide?
        </label>
        <select
          id="service"
          name="service"
          className="block w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/15 transition-all"
        >
          <option value="">Select one (optional)</option>
          <option value="clinical-nursing">Clinical Nursing</option>
          <option value="personal-care">Personal Care</option>
          <option value="complex-care">Complex Care</option>
          <option value="overnight-support">Overnight Support</option>
          <option value="post-hospital">Post-Hospital Support</option>
          <option value="community-participation">Community Participation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="improvements"
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          What would you like us to know?
        </label>
        <textarea
          id="improvements"
          name="improvements"
          rows={4}
          maxLength={5000}
          placeholder="Tell us about your experience. Please avoid sensitive personal details."
          className="block w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/15 transition-all resize-y"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="allowFollowup"
          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
        />
        <span>It&apos;s okay to follow up with me about this feedback.</span>
      </label>

      <p className="text-sm leading-relaxed text-muted-foreground">
        Include only what we need to understand your feedback. Please do not include medical records,
        detailed health information, identity document numbers or someone else&apos;s personal details.
        Read our <a href="/privacy" className="text-primary underline underline-offset-2">privacy policy</a>.
        {" "}This form is not for urgent care. For a medical emergency, call <a href="tel:000" className="text-primary underline">000</a>.
      </p>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-lg bg-primary/5 border border-primary/20 px-4 py-3 text-sm text-primary"
        >
          {errorMessage}
        </p>
      )}

      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onReset}
          disabled={status === "submitting"}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending…" : "Send privately"}
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  name: string;
  type: "text" | "email" | "tel";
}

function Field({ id, label, name, type }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        maxLength={254}
        className="block w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/15 transition-all"
      />
    </div>
  );
}
