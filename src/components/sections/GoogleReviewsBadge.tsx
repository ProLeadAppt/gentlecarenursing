import { Star } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/content/reviews";
import { cn } from "@/lib/utils";

interface GoogleReviewsBadgeProps {
  className?: string;
}

export function GoogleReviewsBadge({ className }: GoogleReviewsBadgeProps) {
  const { averageRating, reviewCount, googleUrl } = GOOGLE_REVIEWS;

  const content = (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-xl border border-border/50 bg-white px-5 py-3 shadow-sm",
        googleUrl && "transition-all hover:shadow-md hover:-translate-y-0.5",
        className
      )}
    >
      {/* Stars */}
      <div className="flex gap-0.5" aria-label={`${averageRating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-4 w-4",
              star <= Math.round(averageRating)
                ? "text-amber-400 fill-amber-400"
                : "text-muted/30"
            )}
            strokeWidth={1}
          />
        ))}
      </div>

      {/* Rating + count */}
      <div className="text-sm">
        <span className="font-bold text-foreground">{averageRating.toFixed(1)}</span>
        <span className="text-muted-foreground ml-1">
          ({reviewCount} review{(reviewCount as number) !== 1 ? "s" : ""})
        </span>
      </div>
    </div>
  );

  if (googleUrl) {
    return (
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${averageRating} stars from ${reviewCount} Google reviews`}
      >
        {content}
      </a>
    );
  }

  return content;
}
