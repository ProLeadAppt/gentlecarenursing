"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { useFormModal } from "@/contexts/FormModalContext";
import { Users, Building2, HeartHandshake, ArrowRight, ShieldCheck } from "lucide-react";

interface ReferralSectionProps {
  headline: string;
  subtitle: string;
}

const PARTNERS = [
  {
    icon: Building2,
    title: "Support Coordinators",
    description: "Responsive care solutions for your participants with daily updates and clear clinical reporting.",
  },
  {
    icon: Users,
    title: "Families & Carers",
    description: "Total peace of mind knowing your loved ones are supported with dignity, compassion and expert oversight.",
  },
  {
    icon: HeartHandshake,
    title: "Healthcare Partners",
    description: "Seamless hospital-to-home transitions and ongoing clinical collaboration for complex healthcare needs.",
  },
];

export function ReferralSection({ headline, subtitle }: ReferralSectionProps) {
  const { openModal } = useFormModal();

  return (
    <section className="py-24 sm:py-32 bg-[#FCF9F9] overflow-hidden relative">
      {/* Decorative backdrop elements */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px] -z-10" />

      <Container>
        <div className="text-center max-w-4xl mx-auto mb-20">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/80 mb-6 font-display">Concierge Partnerships</p>
            <Heading level="h2" as="h2" className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-8">
              {headline}
            </Heading>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              {subtitle}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PARTNERS.map((partner, index) => (
            <Reveal key={partner.title} delay={0.2 + index * 0.1}>
              <div className="h-full rounded-[2.5rem] border border-border/60 bg-white p-10 shadow-[0_20px_40px_-15px_rgba(45,42,38,0.05)] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 group">
                <div className="h-16 w-16 rounded-[1.25rem] bg-accent/10 text-accent flex items-center justify-center mb-10 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <partner.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-foreground tracking-tight group-hover:text-primary transition-colors">{partner.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground font-medium">{partner.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.6}>
          <div className="mt-20 text-center flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8 px-6 py-2 bg-white rounded-full border border-border/50 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">Certified NDIS & DVA Registered Provider</span>
            </div>
            
            <Button
              size="xl"
              variant="primary"
              onClick={() => openModal("referral")}
              className="group h-16 px-12 rounded-[1.25rem] shadow-xl hover:shadow-primary/20"
            >
              Start Referral Process
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <p className="mt-6 text-sm text-muted-foreground italic font-medium">
              Immediate clinical response – we respect your professional urgency.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
