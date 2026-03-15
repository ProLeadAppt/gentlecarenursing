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
  /** Visual variant */
  variant?: CtaSectionVariant;
  className?: string;
}

const variantStyles: Record<CtaSectionVariant, string> = {
  primary: "bg-primary text-primary-foreground",
  muted: "bg-muted/50 text-foreground",
  outline: "border-y border-border bg-card text-foreground",
  accent: "bg-accent/10 text-foreground",
};

export function CtaSection({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = "primary",
  className,
}: CtaSectionProps) {
  const isInverted = variant === "primary";

  return (
    <section
      className={cn(
        "py-16 sm:py-20",
        variantStyles[variant],
        className
      )}
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "mt-4 text-lg",
                isInverted ? "opacity-90" : "text-muted-foreground"
              )}
            >
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={primaryCta.href}
              size="lg"
              variant={isInverted ? "inverted" : "primary"}
            >
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                variant={isInverted ? "invertedOutline" : "outline"}
                size="lg"
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
