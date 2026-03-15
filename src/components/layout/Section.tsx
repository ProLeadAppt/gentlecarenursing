import { cn } from "@/lib/utils";
import { SPACING_SECTION } from "@/design-system/tokens";

type SectionSize = "sm" | "md" | "lg";
type SectionVariant = "default" | "muted" | "card" | "primary" | "accent";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical padding */
  size?: SectionSize;
  /** Background variant */
  variant?: SectionVariant;
  /** Semantic element */
  as?: "section" | "article" | "div";
}

const sizeStyles: Record<SectionSize, string> = {
  sm: SPACING_SECTION.pySm,
  md: SPACING_SECTION.py,
  lg: SPACING_SECTION.pyLg,
};

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-background",
  muted: "bg-muted/30",
  card: "bg-card",
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent/10",
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
