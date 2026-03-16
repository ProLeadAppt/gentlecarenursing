import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface CtaLink {
  href: string;
  label: string;
}

type CtaSectionVariant = "primary" | "muted" | "outline" | "accent";

interface CtaSectionProps {
  title: string;
  description?: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  reassurance?: string;
  /** When set, primary CTA fires onClick instead of navigating */
  onPrimaryClick?: () => void;
  /** When set, secondary CTA fires onClick instead of navigating */
  onSecondaryClick?: () => void;
  variant?: CtaSectionVariant;
  className?: string;
}

const variantStyles: Record<CtaSectionVariant, string> = {
  primary: "bg-gradient-to-br from-primary via-primary to-primary-light text-white",
  muted: "bg-muted text-foreground",
  outline: "border-y border-border bg-card text-foreground",
  accent: "bg-accent/[0.08] text-foreground",
};

export function CtaSection({
  title,
  description,
  primaryCta,
  secondaryCta,
  reassurance,
  onPrimaryClick,
  onSecondaryClick,
  variant = "primary",
  className,
}: CtaSectionProps) {
  const isInverted = variant === "primary";

  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 sm:py-28",
        variantStyles[variant],
        className
      )}
    >
      {isInverted && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          aria-hidden
        >
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-dots)" />
          </svg>
        </div>
      )}
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "mt-4 text-lg",
                isInverted ? "text-white/80" : "text-muted-foreground"
              )}
            >
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={onPrimaryClick ? undefined : primaryCta.href}
              onClick={onPrimaryClick}
              size="lg"
              variant={isInverted ? "inverted" : "primary"}
            >
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button
                href={onSecondaryClick ? undefined : secondaryCta.href}
                onClick={onSecondaryClick}
                variant={isInverted ? "invertedOutline" : "outline"}
                size="lg"
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
          {reassurance && (
            <p className={cn("mt-4 text-sm", isInverted ? "text-white/70" : "text-muted-foreground")}>
              {reassurance}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
