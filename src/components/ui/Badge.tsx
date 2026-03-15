import { cn } from "@/lib/utils";
import { TRUST_BADGE_BASE, TRUST_BADGE_VARIANTS } from "@/design-system/tokens";

type BadgeVariant = keyof typeof TRUST_BADGE_VARIANTS;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/**
 * Badge / trust pill component.
 * Use for credentials (NDIS, DVA), labels, and trust signals.
 */
export function Badge({
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(TRUST_BADGE_BASE, TRUST_BADGE_VARIANTS[variant], className)}
      {...props}
    />
  );
}
