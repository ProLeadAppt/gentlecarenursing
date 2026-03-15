import { cn } from "@/lib/utils";
import { SPACING_SECTION } from "@/design-system/tokens";

type SectionSize = "sm" | "md" | "lg";
type SectionVariant = "default" | "muted" | "card" | "primary" | "accent" | "gradient";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: SectionSize;
  variant?: SectionVariant;
  as?: "section" | "article" | "div";
}

const sizeStyles: Record<SectionSize, string> = {
  sm: SPACING_SECTION.pySm,
  md: SPACING_SECTION.py,
  lg: SPACING_SECTION.pyLg,
};

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-background",
  muted: "bg-[hsl(210,20%,95%)]",
  card: "bg-card",
  primary: "bg-gradient-to-br from-primary via-primary to-primary-light text-primary-foreground",
  accent: "bg-accent/8",
  gradient: "bg-gradient-to-b from-primary/[0.04] to-background",
};

export function Section({
  size = "md",
  variant = "default",
  as: Component = "section",
  className,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(sizeStyles[size], variantStyles[variant], className)}
      {...props}
    />
  );
}
