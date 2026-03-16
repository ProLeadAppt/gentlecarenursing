import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { CTA_REASSURANCE } from "@/lib/constants";

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
  /** Value pills shown between subheadline and CTAs */
  valuePills?: readonly string[];
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
  imageSrc = "/images/hero-hands.webp",
  imageAlt = "Caring hands. Personalised in-home nursing support",
}: HeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-light py-24 sm:py-28 lg:py-36"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center opacity-[0.07]"
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/88 via-primary/75 to-primary-light/75" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-white/[0.04] blur-3xl"
        aria-hidden
      />

      <Container size="md" className="relative">
        <div className="mx-auto max-w-2xl text-center">
          {trustLine && (
            <p className="mb-6 text-sm font-medium tracking-wide text-white/60 sm:text-base">
              {trustLine}
            </p>
          )}
          <Heading
            level="h1"
            as="h1"
            id="hero-heading"
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.2]"
          >
            {headline}
          </Heading>
          {subheadline && (
            <p className="mt-7 text-lg leading-relaxed text-white/85 sm:text-xl sm:leading-relaxed">
              {subheadline}
            </p>
          )}

          {valuePills && valuePills.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {valuePills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80"
                >
                  {pill}
                </span>
              ))}
            </div>
          )}

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={primaryCta.href} size="xl" variant="inverted">
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="invertedOutline" size="xl">
                {secondaryCta.label}
              </Button>
            )}
          </div>

          <p className="mt-10 max-w-md mx-auto text-[0.9375rem] leading-relaxed text-white/75">
            {CTA_REASSURANCE}
          </p>
        </div>
      </Container>
    </section>
  );
}
