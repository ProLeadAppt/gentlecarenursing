"use client";

import { useState } from "react";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
  /** "inline" for footer row, "section" for standalone block */
  variant?: "inline" | "section";
  className?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterSignup({
  variant = "inline",
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "submitting") return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  if (variant === "section") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-border/50 bg-white p-8 sm:p-10 text-center max-w-xl mx-auto",
          className
        )}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-pw-sage mb-3">
          Stay Informed
        </p>
        <h3 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-bold text-foreground">
          Expert care tips, delivered to your inbox
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Practical advice for families and carers. No spam, unsubscribe any
          time.
        </p>

        {status === "success" ? (
          <div className="mt-6 flex items-center justify-center gap-2 text-pw-sage font-medium">
            <Check className="h-5 w-5" />
            You&apos;re subscribed. Welcome!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-[#6b2028] px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(132,40,51,0.25)] transition-all hover:shadow-[0_8px_24px_rgba(132,40,51,0.3)] active:scale-[0.98] disabled:opacity-60"
            >
              {status === "submitting" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-destructive">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    );
  }

  // Inline variant (footer)
  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
        Stay Informed
      </p>

      {status === "success" ? (
        <div className="flex items-center gap-2 text-sm text-accent font-medium">
          <Check className="h-4 w-4" />
          Subscribed!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/10"
            aria-label="Email address for newsletter"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            aria-label="Subscribe to newsletter"
            className="shrink-0 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {status === "submitting" ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <ArrowRight className="h-4 w-4" aria-hidden />
            )}
          </button>
        </form>
      )}
    </div>
  );
}
