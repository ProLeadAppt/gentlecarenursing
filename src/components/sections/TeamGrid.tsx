"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ANIMATION_VARIANTS } from "@/design-system/tokens";

interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly imageSrc?: string;
}

interface TeamGridProps {
  members: readonly TeamMember[];
}

const AVATAR_GRADIENTS = [
  "from-pw-sage to-[#5a8050]",
  "from-pw-teal to-[#155a5c]",
  "from-primary to-[#6b2028]",
  "from-pw-terracotta to-[#9a4a2d]",
] as const;

export function TeamGrid({ members }: TeamGridProps) {
  return (
    <Section size="lg" variant="muted">
      <Container>
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pw-sage mb-4">
            Our Team
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            The People Behind the Care
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            A small, dedicated team of clinicians and coordinators committed to
            boutique care.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto"
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {members.map((member, i) => (
            <motion.div
              key={member.name}
              variants={ANIMATION_VARIANTS.item}
              className="group flex flex-col items-center text-center rounded-2xl border border-border/50 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
            >
              {/* Avatar */}
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-md mb-5 ${
                  AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]
                }`}
              >
                <User className="h-8 w-8" />
              </div>

              <h3 className="text-lg font-bold text-foreground">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                {member.role}
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
