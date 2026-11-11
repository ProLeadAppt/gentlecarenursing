"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** A rating for private feedback only; it never selects a destination. */
export type StarRatingValue = 1 | 2 | 3 | 4 | 5;

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
  // Motion is opt-in after hydration; the existing hook tracks live changes.
  const reduceMotion = !useMediaQuery("(prefers-reduced-motion: no-preference)");
  const [hovered, setHovered] = useState<StarRatingValue | null>(null);
  const [selected, setSelected] = useState<StarRatingValue | null>(null);

  const starRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = hovered ?? selected;

  const handleStarClick = (value: StarRatingValue) => {
    setSelected(value);
    if (instantRedirect) {
      onContinue(value);
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
              ref={(element) => { starRefs.current[value - 1] = element; }}
              tabIndex={(selected ?? 1) === value ? 0 : -1}
              onKeyDown={(event) => {
                let next: StarRatingValue;
                switch (event.key) {
                  case "ArrowRight":
                  case "ArrowDown":
                    next = (value === 5 ? 1 : value + 1) as StarRatingValue;
                    break;
                  case "ArrowLeft":
                  case "ArrowUp":
                    next = (value === 1 ? 5 : value - 1) as StarRatingValue;
                    break;
                  case "Home": next = 1; break;
                  case "End": next = 5; break;
                  default: return;
                }
                event.preventDefault();
                handleStarClick(next);
                starRefs.current[next - 1]?.focus();
              }}
              aria-checked={selected === value}
              aria-label={`${value} star${value === 1 ? "" : "s"}`}
              onMouseEnter={() => setHovered(value)}
              onFocus={() => setHovered(value)}
              onBlur={() => setHovered(null)}
              onClick={() => handleStarClick(value)}
              className={cn(
                "relative p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
                reduceMotion ? "transition-none" : "transition-transform"
              )}
              whileTap={reduceMotion ? { scale: 1 } : { scale: 0.92 }}
              animate={{
                scale: !reduceMotion && isCurrent ? 1.12 : 1,
                y: !reduceMotion && isCurrent ? -4 : 0,
              }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 18 }}
            >
              <Star
                className={cn(
                  "h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14",
                  reduceMotion ? "transition-none" : "transition-colors duration-200",
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

      {/* Neutral rating confirmation */}
      <div className="mt-6 h-16 sm:h-20 flex flex-col items-center justify-start">
        {selected !== null ? (
          <div className="flex flex-col items-center">
            <p className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-foreground">
              {selected} out of 5
            </p>
            <p className="mt-1.5 text-sm sm:text-base text-muted-foreground max-w-md">
              Your rating will be included with your private feedback.
            </p>
          </div>
        ) : (
          <p
            className="text-sm sm:text-base text-muted-foreground"
          >
            Tap a star to begin
          </p>
        )}
      </div>

      {/* Continue button — only when not instant */}
      {!instantRedirect && selected !== null && (
        <button
          type="button"
          onClick={() => onContinue(selected)}
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 transition-colors"
        >
          {continueLabel}
          <span aria-hidden className="ml-2">→</span>
        </button>
      )}
    </div>
  );
}
