"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { MessageSquare, PhoneCall, UserPlus, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useFormModal } from "@/contexts/FormModalContext";

const STEPS = [
  {
    title: "Make an Enquiry",
    description:
      "Tell us about your care needs. Takes just 2 minutes.",
    icon: MessageSquare,
    stepLabel: "Step 1",
    color: "#6b9360",
    colorLight: "rgba(107,147,96,0.12)",
    borderClass: "border-pw-sage",
    shadowClass: "shadow-[0_4px_16px_rgba(107,147,96,0.12)]",
  },
  {
    title: "We Aim to Respond Within 24 Hours",
    description:
      "A registered nurse personally reviews your needs and calls you.",
    icon: PhoneCall,
    stepLabel: "Step 2",
    color: "#1b6b6d",
    colorLight: "rgba(27,107,109,0.12)",
    borderClass: "border-pw-teal",
    shadowClass: "shadow-[0_4px_16px_rgba(27,107,109,0.12)]",
  },
  {
    title: "We Match You With Your Carer",
    description:
      "Matched for skills, personality, and location.",
    icon: UserPlus,
    stepLabel: "Step 3",
    color: "#c4704b",
    colorLight: "rgba(196,112,75,0.12)",
    borderClass: "border-pw-terracotta",
    shadowClass: "shadow-[0_4px_16px_rgba(196,112,75,0.12)]",
  },
  {
    title: "Care Begins",
    description:
      "Ongoing support with a team that truly knows you.",
    icon: Heart,
    stepLabel: "Step 4",
    color: "#842833",
    colorLight: "rgba(132,40,51,0.12)",
    borderClass: "border-primary",
    shadowClass: "shadow-[0_4px_16px_rgba(132,40,51,0.12)]",
  },
] as const;

function TimelineStep({
  step,
}: {
  step: (typeof STEPS)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const isActive = isInView || !!prefersReducedMotion;
  const Icon = step.icon;

  return (
    <div ref={ref} className="relative pl-16 sm:pl-20 pb-12 last:pb-0">
      {/* Circle */}
      <motion.div
        className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors duration-700"
        initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0.4 }}
        animate={
          isActive
            ? { scale: 1, opacity: 1 }
            : { scale: 0.8, opacity: 0.4 }
        }
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundColor: isActive ? step.color : "#e8e0d4",
          borderColor: isActive ? step.color : "#d5cfc5",
        }}
      >
        <Icon
          className="h-5 w-5 transition-all duration-700"
          style={{ color: isActive ? "#ffffff" : "#a09888" }}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        className={`rounded-2xl border bg-white p-6 sm:p-7 transition-all duration-700 ${
          isActive
            ? `${step.borderClass} ${step.shadowClass}`
            : "border-pw-border"
        }`}
        initial={prefersReducedMotion ? false : { opacity: 0.4, x: 20 }}
        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.4, x: 20 }}
        transition={{
          duration: 0.7,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 transition-colors duration-700"
          style={{ color: isActive ? step.color : "#5a544a" }}
        >
          {step.stepLabel}
        </p>
        <h3
          className="text-lg font-bold transition-colors duration-700"
          style={{ color: isActive ? "#2d2926" : "#5a544a" }}
        >
          {step.title}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed transition-colors duration-700"
          style={{ color: isActive ? "#5a544a" : "#6b6557" }}
        >
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

export function ProcessTimeline() {
  const { openModal } = useFormModal();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  // Scroll progress for the self-drawing line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.8"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="py-28 sm:py-32 bg-muted/30 overflow-hidden"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 sm:mb-20">
          <motion.p
            className="text-xs font-bold uppercase tracking-[0.2em] text-pw-sage mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Your Journey
          </motion.p>
          <motion.h2
            className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            From Enquiry to Peace of Mind
          </motion.h2>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Self-drawing line */}
          <div className="absolute left-[1.375rem] top-0 bottom-0 w-0.5 bg-pw-border">
            <motion.div
              className="w-full bg-gradient-to-b from-pw-sage via-pw-teal to-primary"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          {STEPS.map((step) => (
            <TimelineStep key={step.title} step={step} />
          ))}
        </div>

        {/* Inline CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            onClick={() => openModal("care-finder")}
            variant="primary"
            size="lg"
            className="group"
          >
            Ready to start?
            <span
              className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
