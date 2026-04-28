import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, Heart, Users } from "lucide-react";

type TrustBadgeVariant = "default" | "trust" | "outline" | "solid";

const BADGE_ICONS: Record<string, React.ReactNode> = {
  "Registered NDIS Provider": <ShieldCheck className="h-4 w-4" />,
  "DVA Contracted Provider": <ShieldCheck className="h-4 w-4" />,
  "In-Home Nursing & Care": <Heart className="h-4 w-4" />,
  "Personalised Support": <Users className="h-4 w-4" />,
};

interface TrustBadgeProps {
  label: string;
  variant?: TrustBadgeVariant;
  className?: string;
}

export function TrustBadge({
  label,
  variant = "default",
  className,
}: TrustBadgeProps) {
  const icon = BADGE_ICONS[label];

  return (
    <Badge variant={variant} className={className}>
      {icon}
      {label}
    </Badge>
  );
}
