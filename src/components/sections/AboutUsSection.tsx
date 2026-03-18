"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { TYPOGRAPHY, ANIMATION_VARIANTS, SPACING_SECTION } from "@/design-system/tokens";

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
    <section className={`${SPACING_SECTION.py} bg-warm-cream overflow-hidden`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={ANIMATION_VARIANTS.container}
          >
            <motion.div variants={ANIMATION_VARIANTS.item}>
              <Heading level="h2" className={`${TYPOGRAPHY.heading.h2} text-primary mb-8`}>
                {title}
              </Heading>
            </motion.div>
            <motion.div variants={ANIMATION_VARIANTS.item}>
              <p className={`${TYPOGRAPHY.body.lg} text-foreground/90 mb-6 leading-relaxed`}>
                {lead}
              </p>
            </motion.div>
            <motion.div variants={ANIMATION_VARIANTS.item}>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary/80 mb-2">
                Our Commitment
              </p>
              <p className={`${TYPOGRAPHY.body.base} text-foreground italic border-l-4 border-primary/20 pl-6 py-2`}>
                {statsLine}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[25rem] sm:h-[30rem] lg:h-[35rem] w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <Image
              src={sectionImage}
              alt={sectionImageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
