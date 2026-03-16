import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Heading } from "@/components/ui/Heading";
import { UserCheck, Sparkles, Zap, ShieldCheck, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const DIFF_ICONS: LucideIcon[] = [UserCheck, Sparkles, Zap, ShieldCheck, MessageCircle];

export interface DifferentiatorItem {
  headline: string;
  description: string;
}

interface WhyDifferentProps {
  title?: string;
  subtitle?: string;
  differentiators: readonly DifferentiatorItem[];
  /** Optional image to show alongside differentiators */
  imageSrc?: string;
  imageAlt?: string;
}

export function WhyDifferent({
  title = "Why Gentle Care Is Different",
  subtitle = "We focus on quality over volume.",
  differentiators,
  imageSrc = "/images/carer-elderly.webp",
  imageAlt = "Gentle Care nurse supporting an elderly client at home",
}: WhyDifferentProps) {
  return (
    <Section variant="default">
      <Container>
        <SectionHeader title={title} subtitle={subtitle} size="lg" />
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl lg:max-w-none">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={600}
              height={450}
              className="h-auto w-full rounded-2xl object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Differentiators */}
          <div className="grid gap-6 sm:grid-cols-2">
            {differentiators.map((item, i) => {
              const Icon = DIFF_ICONS[i % DIFF_ICONS.length];
              return (
                <div key={item.headline}>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  </div>
                  <Heading level="h3" as="h3" className="text-lg">
                    {item.headline}
                  </Heading>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
