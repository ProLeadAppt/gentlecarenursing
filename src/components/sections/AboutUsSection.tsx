"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/animations/Reveal";
import { ShieldCheck, Heart, Sparkles } from "lucide-react";

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
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/80 mb-6">Our Boutique Philosophy</p>
                <Heading level="h2" as="h2" className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
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
                    <h3 className="text-lg font-bold mb-1">Clinical Excellence Since 2014</h3>
                    <p className="text-muted-foreground">{statsLine}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <Sparkles className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Personalised Care Management</h3>
                    <p className="text-muted-foreground">Every client has a dedicated Clinical Lead – no generic call centres.</p>
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

            {/* Floating Trust Element */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute -bottom-10 -right-6 sm:right-6 bg-white p-8 rounded-[2rem] shadow-2xl border border-border/50 max-w-[280px]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sydney Regionwide</span>
              </div>
              <p className="text-sm font-medium leading-relaxed italic text-foreground/80">
                "Our smaller caseload ensures your family gets the attention they deserve."
              </p>
            </motion.div>
            
            {/* Background Decorative Blob */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse" />
          </div>
        </div>
      </Container>
    </section>
  );
}
