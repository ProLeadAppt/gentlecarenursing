"use client";

import { useState } from "react";
import { StarRating, type StarRatingValue } from "./StarRating";
import { SITE } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, ExternalLink } from "lucide-react";

/**
 * /review — Gemma's private review funnel.
 *
 * 4–5 stars  → redirect to GBP (public, helps other families)
 * 1–3 stars  → inline slide-down to private feedback form
 *             (email to Gemma, no public airing)
 *
 * Compliance line ("If you'd still like to leave a Google review, you
 * can click here.") is always visible so users retain a public-review
 * path even on the low-rating branch — keeps the funnel Google's
 * policy-safe.
 */
export function ReviewFunnel() {
  const [rating, setRating] = useState<StarRatingValue | null>(null);

  // 4–5 star branch: smooth client-side redirect to GBP
  const handleHighRating = () => {
    // open in same tab so the user doesn't lose momentum
    window.location.href = SITE.gbpReviewUrl;
  };

  // 1–3 star branch: keep on page, reveal the form
  const handleLowRating = (value: StarRatingValue) => {
    setRating(value);
  };

  const onContinue = (value: StarRatingValue) => {
    if (value >= 4) handleHighRating(value);
    else handleLowRating(value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {rating === null || rating >= 4 ? (
          <motion.div
            key="stars"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <StarRating onContinue={onContinue} />
          </motion.div>
        ) : (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="text-left"
          >
            <FeedbackFormInline rating={rating} onReset={() => setRating(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always-visible compliance line, small + muted */}
      <div className="mt-12 text-center">
        <p className="text-xs text-muted-foreground/80">
          {rating === null || rating >= 4 ? (
            <>
              Prefer to email us instead?{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                {SITE.email}
              </a>
            </>
          ) : (
            <>
              If you&apos;d still like to leave a Google review,{" "}
              <a
                href={SITE.gbpReviewUrl}
                className="underline underline-offset-2 hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                click here
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
              .
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Inline low-rating feedback form (1–3 stars)                        */
/* ------------------------------------------------------------------ */

interface FeedbackFormInlineProps {
  rating: StarRatingValue;
  onReset: () => void;
}

function FeedbackFormInline({ rating, onReset }: FeedbackFormInlineProps) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Unable to send right now.");
      }
      setStatus("sent");
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email us directly."
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-8 text-center">
        <Mail className="mx-auto h-10 w-10 text-primary" aria-hidden />
        <h3 className="mt-4 font-[family-name:var(--font-serif)] text-2xl text-foreground">
          Thank you for telling us
        </h3>
        <p className="mt-2 text-base text-muted-foreground max-w-md mx-auto">
          Your feedback has been sent privately. We read every response and
          will use it to improve.
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
      noValidate
    >
      <div>
        <h3 className="font-[family-name:var(--font-serif)] text-2xl text-foreground">
          Help us understand
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          A few quick questions. Everything you share goes only to our team.
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
          What could we have done better?
        </label>
        <textarea
          id="improvements"
          name="improvements"
          rows={4}
          placeholder="Take your time. Specifics help us improve."
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
        className="block w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/15 transition-all"
      />
    </div>
  );
}
