"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 5-star rating with rich hover micro-interactions.
 * Behavioural split:
 *   - 4 or 5 stars: funnel to Google (parent handles via onRate)
 *   - 1, 2 or 3 stars: funnel to private feedback (parent handles via onRate)
 *
 * Emotional labels update on hover/select so the user feels heard
 * regardless of which path they take.
 */

export type StarRatingValue = 1 | 2 | 3 | 4 | 5;

const LABELS: Record<StarRatingValue, string> = {
  1: "Tell us what went wrong",
  2: "We'd like to understand",
  3: "We can do better",
  4: "That means a lot",
  5: "Wonderful — thank you",
};

const SUBTITLES: Record<StarRatingValue, string> = {
  1: "Your honest feedback goes straight to us, not to the public.",
  2: "We read every response. Help us improve.",
  3: "There's clearly room to grow — thank you for telling us.",
  4: "Would you mind sharing the good on Google for other families?",
  5: "Would you mind sharing the good on Google for other families?",
};

interface StarRatingProps {
  /** Called when the user picks a value and clicks "Continue". */
  onContinue: (value: StarRatingValue) => void;
  /** Optional label for the continue button. */
  continueLabel?: string;
  /** Hide the continue button — fire onContinue on star click instead. */
  instantRedirect?: boolean;
}

export function StarRating({
  onContinue,
  continueLabel = "Continue",
  instantRedirect = false,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<StarRatingValue | null>(null);
  const [selected, setSelected] = useState<StarRatingValue | null>(null);

  const active = hovered ?? selected;

  const handleStarClick = (value: StarRatingValue) => {
    setSelected(value);
    if (instantRedirect) {
      // tiny delay so the user sees their selection light up
      window.setTimeout(() => onContinue(value), 220);
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* Stars row */}
      <div
        className="flex items-center justify-center gap-2 sm:gap-3"
        role="radiogroup"
        aria-label="Rate your experience"
        onMouseLeave={() => setHovered(null)}
      >
        {([1, 2, 3, 4, 5] as const).map((value) => {
          const isActive = active !== null && value <= active;
          const isCurrent = active === value;
          return (
            <motion.button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected === value}
              aria-label={`${value} star${value === 1 ? "" : "s"}`}
              onMouseEnter={() => setHovered(value)}
              onFocus={() => setHovered(value)}
              onClick={() => handleStarClick(value)}
              className={cn(
                "relative p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
                "transition-transform"
              )}
              whileTap={{ scale: 0.92 }}
              animate={{
                scale: isCurrent ? 1.12 : 1,
                y: isCurrent ? -4 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <Star
                className={cn(
                  "h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 transition-colors duration-200",
                  isActive
                    ? "fill-amber-400 text-amber-500"
                    : "fill-transparent text-muted-foreground/40"
                )}
                strokeWidth={1.5}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Emotional label + subtitle */}
      <div className="mt-6 h-16 sm:h-20 flex flex-col items-center justify-start">
        <AnimatePresence mode="wait">
          {active !== null ? (
            <motion.div
              key={`label-${active}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center"
            >
              <p className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-foreground">
                {LABELS[active]}
              </p>
              <p className="mt-1.5 text-sm sm:text-base text-muted-foreground max-w-md">
                {SUBTITLES[active]}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm sm:text-base text-muted-foreground"
            >
              Tap a star to begin
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Continue button — only when not instant */}
      {!instantRedirect && (
        <AnimatePresence>
          {selected !== null && (
            <motion.button
              key="continue"
              type="button"
              onClick={() => onContinue(selected)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 transition-colors"
            >
              {continueLabel}
              <span aria-hidden className="ml-2">→</span>
            </motion.button>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
