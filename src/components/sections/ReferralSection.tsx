"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { TYPOGRAPHY, ANIMATION_VARIANTS, SPACING_SECTION, CARD_VARIANTS } from "@/design-system/tokens";
import { useFormModal } from "@/contexts/FormModalContext";
import { Users, Building2, HeartHandshake, ArrowRight } from "lucide-react";

interface ReferralSectionProps {
  headline: string;
  subtitle: string;
}

const PARTNERS = [
  {
    icon: Building2,
    title: "Support Coordinators",
    description: "Responsive care solutions for your participants with clear communication.",
  },
  {
    icon: Users,
    title: "Families & Carers",
    description: "Peace of mind knowing your loved ones are supported with dignity.",
  },
  {
    icon: HeartHandshake,
    title: "Healthcare Partners",
    description: "Seamless hospital-to-home transitions and clinical collaboration.",
  },
];

export function ReferralSection({ headline, subtitle }: ReferralSectionProps) {
  const { openModal } = useFormModal();

  return (
    <section className={`${SPACING_SECTION.py} bg-white overflow-hidden`}>
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={ANIMATION_VARIANTS.container}
          >
            <motion.div variants={ANIMATION_VARIANTS.item}>
              <Heading level="h2" className={`${TYPOGRAPHY.heading.h2} text-foreground mb-6`}>
                {headline}
              </Heading>
            </motion.div>
            <motion.div variants={ANIMATION_VARIANTS.item}>
              <p className={TYPOGRAPHY.body.lg}>{subtitle}</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`${CARD_VARIANTS.elevated} border-primary/5 hover:border-primary/20 transition-all`}
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6">
                <partner.icon size={24} />
              </div>
              <h3 className={`${TYPOGRAPHY.heading.h3} mb-4 text-foreground`}>{partner.title}</h3>
              <p className={TYPOGRAPHY.body.base}>{partner.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button
            size="xl"
            variant="primary"
            onClick={() => openModal("care-finder")}
            className="group"
          >
            Make a Referral
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
