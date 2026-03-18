import { cn } from "@/lib/utils";
import { SPACING_SECTION } from "@/design-system/tokens";

type SectionSize = "sm" | "md" | "lg" | "xl";
type SectionVariant = "default" | "muted" | "card" | "primary" | "accent" | "gradient" | "teal" | "clinical-white" | "premium-accent";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: SectionSize;
  variant?: SectionVariant;
  as?: "section" | "article" | "div";
}

const sizeStyles: Record<SectionSize, string> = {
  sm: SPACING_SECTION.pySm,
  md: SPACING_SECTION.py,
  lg: SPACING_SECTION.pyLg,
  xl: SPACING_SECTION.pyXl,
};

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-background",
  muted: "bg-muted",
  card: "bg-card",
  primary: "bg-gradient-to-br from-primary via-primary to-primary-light text-primary-foreground",
  accent: "bg-accent/[0.10]",
  gradient: "bg-gradient-to-b from-accent/[0.08] to-background",
  teal: "bg-[hsl(var(--color-section-teal))]",
  "clinical-white": "bg-white relative",
  "premium-accent": "bg-accent/[0.03] border-y border-accent/10",
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
