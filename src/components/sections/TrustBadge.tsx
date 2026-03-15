import { Badge } from "@/components/ui/Badge";

type TrustBadgeVariant = "default" | "trust" | "outline" | "solid";

interface TrustBadgeProps {
  label: string;
  variant?: TrustBadgeVariant;
  className?: string;
}

/**
 * Standalone trust badge for use in TrustBar or elsewhere.
 */
export function TrustBadge({
  label,
  variant = "default",
  className,
}: TrustBadgeProps) {
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
