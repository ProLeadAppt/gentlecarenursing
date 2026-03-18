import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BentoServiceGrid } from "@/components/sections/BentoServiceGrid";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { CtaSection } from "@/components/sections/CtaSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/animations/Reveal";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { GMB_SERVICES } from "@/content/gmb-services";
import { ShieldCheck, Heart, UserCheck } from "lucide-react";

export const metadata = createMetadata({
  title: "Our Services",
  description:
    "Boutique in-home nursing and care services across NDIS, DVA, aged care, and private. Personalised clinical support led by experienced nurses.",
  keywords: [
    "in-home nursing Sydney",
    "NDIS registered provider",
    "DVA community nursing",
    "boutique aged care",
    "private nursing care",
    "complex care support",
  ],
});

export default function ServicesPage() {
  return (
    <>
      {/* Premium Hero Intro */}
      <Section size="lg" className="bg-white border-b border-border/40">
        <Container size="md">
          <Reveal>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Services" }]} className="mb-8" />
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/80 mb-4">What We Do</p>
            <Heading level="h1" as="h1" className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Clinical Excellence <br/> at Home
            </Heading>
            <p className="mt-8 text-xl leading-relaxed text-muted-foreground sm:text-2xl font-medium max-w-3xl">
              Gentle Care Nursing provides high-end, personalised in-home nursing and care. 
              We focus on quality over volume, ensuring every participant receives the 
              dedicated attention they deserve.
            </p>
          </Reveal>
        </Container>
      </Section>

      <TrustMarquee />

      {/* Service Highlights / Bento Focus */}
      <BentoServiceGrid />

      {/* Trust & Methodology Section */}
      <Section className="bg-muted/30">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: "Registered & Verified", 
                desc: "Fully registered NDIS and DVA provider meeting all quality and safety benchmarks.", 
                icon: ShieldCheck 
              },
              { 
                title: "Clinician-Led", 
                desc: "Owned and operated by experienced Registered Nurses with 10+ years of expertise.", 
                icon: UserCheck 
              },
              { 
                title: "Person-Centred", 
                desc: "We match you with the right carer who aligns with your personality and health goals.", 
                icon: Heart 
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.1} y={20}>
                  <div className="flex flex-col items-center text-center">
                    <div className="h-14 w-14 rounded-2xl bg-white shadow-sm border border-border/50 flex items-center justify-center mb-6">
                      <Icon className="h-7 w-7 text-primary" strokeWidth={2} />
                    </div>
                    <Heading level="h3" className="text-xl font-bold mb-3">{item.title}</Heading>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* All Specific Care Services — GMB-aligned */}
      <Section className="bg-white">
        <Container size="md">
          <Reveal>
            <div className="text-center mb-16">
              <Heading level="h2" as="h2" className="text-3xl sm:text-4xl font-bold mb-4">
                Clinical Service Directory
              </Heading>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                We offer {GMB_SERVICES.length}+ specialised clinical services across Sydney. 
                Our team is equipped for both complex medical Needs and daily living support.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GMB_SERVICES.map((service, index) => (
              <Reveal key={service.name} delay={index * 0.05} y={15}>
                <div className="group flex flex-col justify-between h-full rounded-[1.5rem] border border-border/60 bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_20px_40px_-15px_rgba(132,40,51,0.08)]">
                  <div>
                    <p className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{service.name}</p>
                    {service.description && (
                      <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                    )}
                  </div>
                  {service.href && (
                    <Link
                      href={service.href}
                      className="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary group-hover:gap-2 transition-all"
                    >
                      Learn more <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Ready to Discuss Your Care?"
        description="Whether you have an NDIS plan or need private clinical support, our team is ready to respond within 24 hours."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        variant="primary"
      />
    </>
  );
}
