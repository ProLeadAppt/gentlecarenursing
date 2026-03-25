"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

interface Milestone {
  readonly year: string;
  readonly title: string;
  readonly description: string;
}

interface MilestoneTimelineProps {
  milestones: readonly Milestone[];
}

const STEP_COLORS = [
  "#6b9360",
  "#1b6b6d",
  "#c4704b",
  "#842833",
  "#6b9360",
] as const;

function MilestoneItem({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const color = STEP_COLORS[index % STEP_COLORS.length];

  return (
    <div ref={ref} className="relative pl-16 sm:pl-20 pb-10 last:pb-0">
      {/* Year badge */}
      <motion.div
        className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full text-white text-xs font-bold shadow-md transition-colors duration-700"
        initial={{ scale: 0.8, opacity: 0.3 }}
        animate={
          isInView
            ? { scale: 1, opacity: 1 }
            : { scale: 0.8, opacity: 0.3 }
        }
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: isInView ? color : "#e8e0d4" }}
      >
        {milestone.year}
      </motion.div>

      {/* Content card */}
      <motion.div
        className="rounded-xl border bg-white p-5 sm:p-6 transition-all duration-700"
        initial={{ opacity: 0.3, x: 16 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 16 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          borderColor: isInView ? `${color}33` : "#e8e0d4",
        }}
      >
        <h3
          className="text-base font-bold transition-colors duration-700"
          style={{ color: isInView ? "#2d2926" : "#736e62" }}
        >
          {milestone.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {milestone.description}
        </p>
      </motion.div>
    </div>
  );
}

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  return (
    <Section size="lg">
      <Container size="md">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pw-sage mb-4">
            Our Journey
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Key Milestones
          </h2>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-[1.375rem] top-0 bottom-0 w-0.5 bg-pw-border" />

          {milestones.map((milestone, i) => (
            <MilestoneItem
              key={milestone.year}
              milestone={milestone}
              index={i}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
