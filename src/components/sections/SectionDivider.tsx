import { cn } from "@/lib/utils";

export type SectionDividerVariant = "whiteToTeal" | "tealToWhite";

interface SectionDividerProps {
  variant: SectionDividerVariant;
  className?: string;
}

export function SectionDivider({ variant, className }: SectionDividerProps) {
  const gradient =
    variant === "whiteToTeal"
      ? "linear-gradient(to bottom, hsl(var(--color-background)), hsl(var(--color-section-teal)))"
      : "linear-gradient(to bottom, hsl(var(--color-section-teal)), hsl(var(--color-background)))";

  return (
    <div
      role="presentation"
      aria-hidden
      className={cn("h-12 w-full shrink-0 sm:h-14", className)}
      style={{ background: gradient }}
    />
  );
}
