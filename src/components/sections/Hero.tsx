import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { ShieldCheck } from "lucide-react";

export interface HeroCta {
  href: string;
  label: string;
}

interface HeroProps {
  headline: string;
  subheadline?: string;
  /** Location + authority line (e.g. Sydney's trusted provider). Shown below trust badge. */
  locationLine?: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  /** Short reassurance (e.g. response time). Shown below CTAs. */
  reassurance?: string;
  /** Optional hero image path */
  imageSrc?: string;
  imageAlt?: string;
}

export function Hero({
  headline,
  subheadline,
  locationLine,
  primaryCta,
  secondaryCta,
  reassurance,
  imageSrc = "/images/hero-hands.webp",
  imageAlt = "Caring hands — personalised in-home nursing support",
}: HeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[hsl(210,50%,18%)] via-primary to-primary-light py-20 sm:py-24 lg:py-32"
      aria-labelledby="hero-heading"
    >
      {/* Background image overlay */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center opacity-10"
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,50%,18%)]/90 via-primary/80 to-primary-light/80" />
      </div>

      {/* Decorative pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
      </div>
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-white/[0.03] blur-3xl"
        aria-hidden
      />

      <Container size="md" className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Trust micro-line */}
          <div className="mb-6 flex flex-col items-center gap-1">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-5 w-5 text-accent-light" />
              <span className="text-sm font-medium tracking-wide text-white/70 uppercase">
                Registered NDIS & DVA Provider
              </span>
            </div>
            {locationLine && (
              <span className="text-sm text-white/60">{locationLine}</span>
            )}
          </div>

          <Heading
            level="h1"
            as="h1"
            id="hero-heading"
            className="text-4xl text-white sm:text-5xl lg:text-6xl"
          >
            {headline}
          </Heading>
          {subheadline && (
            <p className="mt-6 text-lg leading-relaxed text-white/80 sm:text-xl">
              {subheadline}
            </p>
          )}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={primaryCta.href} size="xl" variant="inverted">
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="invertedOutline" size="xl">
                {secondaryCta.label}
              </Button>
            )}
          </div>
          {reassurance && (
            <p className="mt-4 text-sm text-white/70">{reassurance}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
