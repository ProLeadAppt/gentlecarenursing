"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/animations/Reveal";
import { Heart, Sparkles } from "lucide-react";

interface AboutUsSectionProps {
  title: string;
  lead: string;
  statsLine: string;
  sectionImage?: string;
  sectionImageAlt?: string;
}

export function AboutUsSection({
  title,
  lead,
  statsLine,
  sectionImage = "/images/hero-hands.webp",
  sectionImageAlt = "Compassionate care at home",
}: AboutUsSectionProps) {
  return (
    <section className="py-24 sm:py-32 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content Side */}
          <div className="space-y-12">
            <Reveal>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/80 mb-6">Our Care Philosophy</p>
                <Heading level="h2" as="h2" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-[1.15]">
                  {title}
                </Heading>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl font-medium">
                {lead}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                    <Heart className="h-6 w-6 text-accent group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Over 10 Years of Hands-On Care Experience</h3>
                    <p className="text-muted-foreground">{statsLine}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <Sparkles className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Personalised Care Management</h3>
                    <p className="text-muted-foreground">Every client receives personalised coordination and consistent support.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Image Side - Cinematic Layering */}
          <div className="relative">
            <Reveal delay={0.3} x={40} fullHeight width="100%" className="h-full">
              <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(132,40,51,0.12)] border-[12px] border-white ring-1 ring-border/50">
                <Image
                  src={sectionImage}
                  alt={sectionImageAlt}
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </Reveal>

            {/* Background Decorative Blob */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </Container>
    </section>
  );
}
