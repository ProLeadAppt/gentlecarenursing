import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BentoServiceGrid } from "@/components/sections/BentoServiceGrid";
import { CtaSection } from "@/components/sections/CtaSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/animations/Reveal";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import { GMB_SERVICES } from "@/content/gmb-services";
import { ShieldCheck, Heart, UserCheck } from "lucide-react";

export const metadata = createMetadata({
  title: "Our Services Sydney | NDIS, DVA & Private Home Care",
  description:
    "Explore in-home nursing, personal care, disability support, DVA community nursing, aged care, and private care across Sydney with Gentle Care Nursing Services.",
  canonical: `${INTEGRATIONS.siteUrl}/services`,
  openGraph: {
    images: [{ url: "/images/og/services.png", width: 1200, height: 630, alt: "In-Home Services | Gentle Care Nursing Services" }],
  },
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
              Personalised Care <br/> at Home
            </Heading>
            <p className="mt-8 text-xl leading-relaxed text-muted-foreground sm:text-2xl font-medium max-w-3xl">
              Gentle Care provides personalised in-home care and support, focused on
              consistency, dignity, and giving every person the attention they deserve.
            </p>
          </Reveal>
        </Container>
      </Section>

      <BentoServiceGrid />

      {/* Choose the right service */}
      <Section className="bg-white border-y border-border/40">
        <Container size="lg">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/80 mb-4">Choose the right pathway</p>
              <Heading level="h2" as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Start with the service that matches the funding and the need
              </Heading>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed">
                Most families arrive with one of three jobs to be done: funded NDIS support, veteran care through DVA, or fast private help without waiting for approvals.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "NDIS support",
                href: "/ndis",
                body: "For participants, families, plan managers, and support coordinators needing in-home nursing, personal care, community access, or complex supports.",
                kicker: "For disability support plans",
              },
              {
                title: "DVA community nursing",
                href: "/dva",
                body: "For eligible veterans and families who need clinically necessary care at home, directly claimed through DVA.",
                kicker: "For veteran care and referrals",
              },
              {
                title: "Aged care at home",
                href: "/aged-care",
                body: "For older Australians who want help staying safe at home with nursing, personal care, and recovery support.",
                kicker: "For older adults and families",
              },
              {
                title: "Private nursing",
                href: "/private-nursing",
                body: "For people who want immediate, flexible fee-for-service care with no waitlists, no package admin, and no approval delays.",
                kicker: "For immediate fee-for-service care",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <Link href={item.href} className="group block h-full rounded-[2rem] border border-border/60 bg-muted/20 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70 mb-4">{String(i + 1).padStart(2, "0")}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80 mb-3">{item.kicker}</p>
                  <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{item.body}</p>
                  <p className="mt-6 text-sm font-bold text-primary">Learn more →</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

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
                title: "Experienced Care Team",
                desc: "Led by an experienced care professional with hands-on work across disability, aged care and in-home support.",
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
                Care Service Directory
              </Heading>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                We offer {GMB_SERVICES.length}+ in-home care services across Sydney —
                from complex care needs to everyday support at home.
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
        description="Whether you have an NDIS plan, DVA referral, or need private clinical support, our team is ready to respond within 24 hours."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        variant="primary"
      />
    </>
  );
}
