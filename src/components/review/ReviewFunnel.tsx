"use client";

import { useEffect, useRef, useState } from "react";
import { StarRating, type StarRatingValue } from "./StarRating";
import { SITE } from "@/lib/constants";
import { FeedbackSubmissionError, FEEDBACK_UNCONFIRMED_MESSAGE, submitPrivateFeedback } from "@/lib/feedback-client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, ExternalLink } from "lucide-react";

/** Both feedback choices are available to everyone, independent of rating. */
export function ReviewFunnel() {
  const feedbackButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState<StarRatingValue | null>(null);
  const resetFeedback = () => {
    setRating(null);
    setShowFeedback(false);
    feedbackButtonRef.current?.focus();
  };
  const choiceClass = "inline-flex items-center justify-center gap-2 rounded-xl border border-primary bg-card px-6 py-3 text-base font-semibold text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 transition-colors";

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-center text-muted-foreground">
        Share an honest review on Google or send feedback privately to our team.
        Both options are open to everyone, whatever your experience.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a href={SITE.gbpReviewUrl} className={choiceClass}>
          Leave a Google review
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
        <button
          type="button"
          className={choiceClass}
          ref={feedbackButtonRef}
          aria-expanded={showFeedback}
          aria-controls="private-feedback-panel"
          onClick={() => setShowFeedback(true)}
        >
          Send private feedback
          <Mail className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <div ref={panelRef} id="private-feedback-panel" className="mt-8">
        <AnimatePresence mode="wait">
          {showFeedback && (
            <motion.div key={rating === null ? "rating" : "feedback"}
              variants={{ initial: { opacity: 0, y: 10 }, enter: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } }}
              initial="initial" animate="enter" exit="exit" transition={{ duration: 0.25 }}
              onAnimationComplete={(definition) => {
                if (definition === "enter") panelRef.current?.querySelector<HTMLElement>("h2, h3")?.focus();
              }}>
              {rating === null ? (
                <>
                  <h2 tabIndex={-1} className="mb-5 text-center text-xl font-semibold">Private feedback</h2>
                  <StarRating onContinue={setRating} continueLabel="Continue to private feedback" />
                  <button type="button" onClick={resetFeedback}
                    className="mt-6 text-sm text-muted-foreground underline underline-offset-2">
                    Cancel
                  </button>
                </>
              ) : (
                <FeedbackFormInline rating={rating} onReset={resetFeedback} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Prefer email? <a href={`mailto:${SITE.email}`} className="underline underline-offset-2">{SITE.email}</a>
      </p>
    </div>
  );
}

/* Private feedback accepts every rating. Google remains available above. */

interface FeedbackFormInlineProps {
  rating: StarRatingValue;
  onReset: () => void;
}

function FeedbackFormInline({ rating, onReset }: FeedbackFormInlineProps) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "sent" | "error" | "uncertain"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const submissionLockedRef = useRef(false);
  const pendingRef = useRef(false);
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);
  useEffect(() => {
    if (status === "sent") successHeadingRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // React state alone cannot prevent two submits before the next render.
    if (submissionLockedRef.current) return;
    submissionLockedRef.current = true;
    pendingRef.current = true;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const data = new FormData(e.currentTarget);
      const payload = {
        rating,
        name: data.get("name")?.toString().trim() ?? "",
        contact: data.get("contact")?.toString().trim() ?? "",
        service: data.get("service")?.toString() ?? "",
        improvements: data.get("improvements")?.toString().trim() ?? "",
        allowFollowup: data.get("allowFollowup") === "on",
      };
      await submitPrivateFeedback(payload);
      if (mountedRef.current) setStatus("sent");
    } catch (error) {
      const rejected = error instanceof FeedbackSubmissionError && error.outcome === "rejected";
      // Only a confirmed pre-send rejection unlocks this mounted form.
      // Unknown outcomes retain the details and require contacting the team.
      if (rejected) submissionLockedRef.current = false;
      if (mountedRef.current) {
        setErrorMessage(rejected ? error.message : FEEDBACK_UNCONFIRMED_MESSAGE);
        setStatus(rejected ? "error" : "uncertain");
      }
    } finally {
      pendingRef.current = false;
    }
  }

  function handleBack() {
    // Guard the handler too, including a click before disabled renders.
    if (!pendingRef.current) onReset();
  }

  if (status === "sent") {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-8 text-center">
        <Mail className="mx-auto h-10 w-10 text-primary" aria-hidden />
        <h3 ref={successHeadingRef} tabIndex={-1} className="mt-4 font-[family-name:var(--font-serif)] text-2xl text-foreground">
          Thank you for telling us
        </h3>
        <p className="mt-2 text-base text-muted-foreground max-w-md mx-auto">
          Your feedback has been accepted for delivery to our team. We read every response and
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
        <h3 tabIndex={-1} className="font-[family-name:var(--font-serif)] text-2xl text-foreground">
          Help us understand
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Your feedback is sent privately to our team. Please do not include medical or other sensitive personal details.
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
          What would you like to share?
        </label>
        <textarea
          id="improvements"
          name="improvements"
          rows={4}
          placeholder="Please avoid sharing medical or other sensitive personal details."
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

      {(status === "error" || status === "uncertain") && (
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
          onClick={handleBack}
          disabled={status === "submitting"}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={status === "submitting" || status === "uncertain"}
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
