"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ANIMATION_VARIANTS } from "@/design-system/tokens";

interface FounderStoryProps {
  name: string;
  title: string;
  bio: string;
  quote: string;
  imageSrc: string;
  imageAlt: string;
}

export function FounderStory({
  name,
  title,
  bio,
  quote,
  imageSrc,
  imageAlt,
}: FounderStoryProps) {
  return (
    <Section size="lg">
      <Container>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Image */}
          <motion.div variants={ANIMATION_VARIANTS.item} className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-pw-lg image-brand-overlay aspect-[4/5] max-h-[32rem]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-6">
            <motion.div variants={ANIMATION_VARIANTS.item}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pw-sage mb-2">
                Meet Our Founder
              </p>
              <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {name}
              </h2>
              <p className="mt-1 text-base font-medium text-muted-foreground">
                {title}
              </p>
            </motion.div>

            <motion.div
              variants={ANIMATION_VARIANTS.item}
              className="space-y-4 text-base leading-relaxed text-muted-foreground"
            >
              {bio.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </motion.div>

            {/* Pull quote */}
            <motion.blockquote
              variants={ANIMATION_VARIANTS.item}
              className="relative border-l-2 border-primary/40 pl-6 py-2"
            >
              <p className="font-[family-name:var(--font-serif)] text-xl text-foreground leading-relaxed">
                &ldquo;{quote}&rdquo;
              </p>
              <cite className="mt-3 block text-sm font-semibold text-primary not-italic">
                — {name}
              </cite>
            </motion.blockquote>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
