"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type StarRatingValue = 1 | 2 | 3 | 4 | 5;

interface StarRatingProps {
  onContinue: (value: StarRatingValue) => void;
  continueLabel?: string;
}

/** Native radios provide arrow-key selection without sentiment-based routing. */
export function StarRating({ onContinue, continueLabel = "Continue" }: StarRatingProps) {
  const [selected, setSelected] = useState<StarRatingValue | null>(null);
  return (
    <div className="flex flex-col items-center text-center">
      <fieldset>
        <legend className="text-lg font-medium text-foreground mb-4">How would you rate your experience?</legend>
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {([1, 2, 3, 4, 5] as const).map(value => (
            <label key={value} className="relative cursor-pointer rounded-full p-1">
              <input type="radio" name="private-feedback-rating" value={value} checked={selected === value} onChange={() => setSelected(value)} className="peer sr-only" />
              <span className="sr-only">{value} {value === 1 ? "star" : "stars"}</span>
              <Star aria-hidden="true" className={cn("h-10 w-10 sm:h-12 sm:w-12 rounded-sm peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 transition-colors", selected !== null && value <= selected ? "fill-amber-400 text-amber-500" : "fill-transparent text-muted-foreground/60")} />
            </label>
          ))}
        </div>
      </fieldset>
      <p className="mt-4 text-muted-foreground" aria-live="polite">{selected === null ? "Choose a rating from 1 to 5." : `${selected} out of 5 selected. Thank you for your feedback.`}</p>
      <button type="button" disabled={selected === null} onClick={() => selected !== null && onContinue(selected)} className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50 disabled:cursor-not-allowed">
        {continueLabel}
      </button>
    </div>
  );
}
