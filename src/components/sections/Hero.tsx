import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { TYPOGRAPHY } from "@/design-system/tokens";
import { HERO_REASSURANCE } from "@/lib/constants";
import { Check } from "lucide-react";

export interface HeroCta {
  href: string;
  label: string;
}

interface HeroProps {
  headline: string;
  subheadline?: string;
  /** Optional soft trust line above headline (e.g. "Registered NDIS & DVA provider") */
  trustLine?: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  /** Trust bullets shown below reassurance (with Check icons) */
  valuePills?: readonly string[];
  /** Reassurance line under CTAs (default: HERO_REASSURANCE, team notified) */
  reassurance?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function Hero({
  headline,
  subheadline,
  trustLine,
  primaryCta,
  secondaryCta,
  valuePills,
  reassurance = HERO_REASSURANCE,
  imageSrc = "/images/carer-elderly.webp",
  imageAlt = "Nurse assisting a patient in a home environment",
}: HeroProps) {
  return (
    <section
      className="relative min-h-[28rem] lg:min-h-[80vh] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 xl:gap-16 lg:items-center">
        {/* Left column: warm light background, copy + CTAs + reassurance + trust bullets */}
        <div className="order-1 flex flex-col justify-center bg-background py-16 sm:py-20 lg:py-24">
          <Container size="lg" className="relative">
            <div className="max-w-xl animate-hero-in">
              {trustLine && (
                <p className="mb-5 text-sm font-medium tracking-wide text-muted-foreground sm:text-base">
                  {trustLine}
                </p>
              )}
              <Heading
                level="h1"
                as="h1"
                id="hero-heading"
                className={TYPOGRAPHY.heading.h1 + " text-foreground text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] leading-tight mb-6"}
              >
                {headline}
              </Heading>
              {subheadline && (
                <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground mt-2">
                  {subheadline}
                </p>
              )}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button href={primaryCta.href} size="xl" variant="primary">
                  {primaryCta.label}
                </Button>
                {secondaryCta && (
                  <Button href={secondaryCta.href} variant="outline" size="xl">
                    {secondaryCta.label}
                  </Button>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-md">
                {reassurance}
              </p>

              {valuePills && valuePills.length > 0 && (
                <ul className="mt-8 flex flex-col gap-3" role="list">
                  {valuePills.map((item, index) => (
                    <li
                      key={item}
                      className="animate-hero-pill flex items-center gap-3"
                      style={{ animationDelay: `${index * 60}ms` }}
                    >
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent"
                        aria-hidden
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <span className="text-sm font-medium text-foreground sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Container>
        </div>

        {/* Right column: large hero image */}
        <div className="order-2 relative h-[24rem] min-h-[24rem] w-full lg:min-h-[32rem] lg:h-[80vh] lg:max-h-[42rem]">
          <div className="animate-hero-image absolute inset-0 overflow-hidden rounded-xl shadow-xl lg:rounded-2xl">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
