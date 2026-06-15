import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { FaqPreview } from "./FaqPreview";
import { ServiceCtaWithModal } from "./ServiceCtaWithModal";
import { EvidencePanel, type EvidenceItem } from "./EvidencePanel";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { FormModalTrigger } from "@/components/ui/FormModalTrigger";
import { CTA_LINKS } from "@/lib/constants";
import { getServiceSchema, getFaqSchema, getMedicalProcedureSchema } from "@/lib/schema";
import { SERVICES } from "@/content/services";
// ALL_GUIDES + ALL_COMPARES imports removed 2026-06-10 — /guides and /compare pages deleted
import { Reveal } from "@/components/animations/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Magnetic } from "@/components/animations/Magnetic";
import { CheckCircle2, ArrowRight, UserCheck, Heart, ShieldCheck, Sparkles, Activity } from "lucide-react";
import type { FaqItem } from "./FaqAccordion";
import Link from "next/link";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServicePageData {
  title: string;
  /** Optional: one-sentence direct answer for featured snippet / AEO (shown first in hero) */
  snippetAnswer?: string;
  intro: string;
  href?: string;
  whoItHelps: {
    title: string;
    description: string;
    audiences: string[];
  };
  supportAvailable: {
    title: string;
    description: string;
    features: ServiceFeature[];
  };
  whyChoose: {
    title: string;
    description: string;
    reasons: ServiceFeature[];
  };
  faqs: { id: string; question: string; answer: string }[];
  cta: {
    title: string;
    description?: string;
  };
  /** Optional hero image shown on the service page. */
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  // caseStudies removed 2026-06-15 per Gemma's brief — section intentionally omitted from all service pages.
  /** Optional service or region-specific testimonials to surface on the page */
  testimonials?: {
    quote: string;
    name: string;
    role: string;
    rating?: number;
  }[];
  /** Optional guide slugs that are especially relevant to this service —
   * field kept for data compatibility but no longer rendered since
   * /guides was removed 2026-06-10. */
  relatedGuideSlugs?: string[];
  /**
   * Optional comparison-page slugs (see src/content/compares.ts) that are
   * especially relevant to this service. Field kept for data compatibility
   * but no longer rendered since /compare was removed 2026-06-10.
   */
  relatedCompareSlugs?: string[];
  /**
   * Optional AEO/GEO evidence panel. When provided, renders a "Quick facts"
   * block immediately after the hero, surfacing citable factual claims
   * (registration, area, response window, funding, scope) for AI engines.
   */
  evidence?: {
    eyebrow?: string;
    heading?: string;
    intro?: string;
    items: readonly EvidenceItem[];
  };
  /** ISO date (YYYY-MM-DD) the page content was last clinically reviewed. */
  reviewedAt?: string;
  /** Named clinician who reviewed the page. Populate only with consent and AHPRA confirmation. */
  reviewer?: { name: string; role?: string };
  /**
   * Override the breadcrumb parent (default: {label: "Services", href: "/services"}).
   * Used by /conditions/* pages to surface "Conditions" instead of "Services" in
   * the hero breadcrumb, since those pages are routed under /conditions but
   * still use this layout's component shape.
   */
  breadcrumbParent?: { label: string; href: string };
  /**
   * Optional list of clinical procedures this service page describes.
   *
   * Each entry is emitted as a MedicalProcedure schema node alongside the
   * page's MedicalService schema, so AI engines and Google's clinical
   * content classifier can resolve the page to specific procedure-level
   * intents — e.g. "PEG feeding home care Sydney", "tracheostomy care at
   * home", "catheter management Sydney".
   *
   * Only populate this with procedures the page actually describes in
   * body content. Schema/content mismatch hurts rather than helps.
   */
  procedures?: readonly {
    name: string;
    alternateName?: string;
    description?: string;
  }[];
}

interface ServicePageLayoutProps {
  data: ServicePageData;
}

export function ServicePageLayout({ data }: ServicePageLayoutProps) {
  const faqItems: FaqItem[] = data.faqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
  }));

  // Only emit MedicalProcedure schema when we have a stable page URL to
  // bind each procedure to — `provider` and `url` both depend on it.
  const procedureSchemas = data.procedures && data.href
    ? data.procedures.map((p) =>
        getMedicalProcedureSchema({
          name: p.name,
          alternateName: p.alternateName,
          description: p.description,
          pageUrl: data.href!,
        })
      )
    : [];

  const schemas = [
    getServiceSchema({
      name: data.title,
      description: data.intro,
      url: data.href ?? "",
    }),
    ...procedureSchemas,
    ...(faqItems.length > 0 ? [getFaqSchema(data.faqs)] : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas),
        }}
      />

      {/* Cinematic Service Hero */}
      <section className="relative overflow-hidden bg-white pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/[0.08] blur-[120px]" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-primary/[0.04] blur-[100px]" />
        </div>

        <Container size="md" className="relative z-10">
          <Reveal delay={0.1}>
            <div className="flex justify-center mb-10">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  data.breadcrumbParent ?? { label: "Services", href: "/services" },
                  { label: data.title },
                ]}
              />
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="text-center">
              <span className="mb-6 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70">
                Personalised Clinical Care
              </span>
              <Heading level="h1" className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 font-[family-name:var(--font-serif)] leading-[1.1]">
                {data.title}
              </Heading>
            </div>
          </Reveal>

          {data.snippetAnswer && (
            <Reveal delay={0.3}>
              <div className="mx-auto mb-12 max-w-3xl rounded-[3rem] bg-accent/[0.03] border border-accent/15 p-10 shadow-sm backdrop-blur-sm">
                <p className="text-center text-xl font-medium leading-relaxed text-foreground italic font-[family-name:var(--font-serif)]">
                  &ldquo;{data.snippetAnswer}&rdquo;
                </p>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.4}>
            <p className="mx-auto max-w-2xl text-center text-xl leading-relaxed text-muted-foreground font-medium">
              {data.intro}
            </p>
          </Reveal>

          {data.image && (
            <Reveal delay={0.5}>
              <div className="mx-auto mt-14 max-w-4xl">
                <div className="overflow-hidden rounded-[2.5rem] border border-border/50 bg-white shadow-[0_24px_60px_-24px_rgba(132,40,51,0.18)]">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={data.image.src}
                      alt={data.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 80vw"
                    />
                  </div>
                  {data.image.caption && (
                    <p className="px-6 py-4 text-sm font-medium text-muted-foreground">
                      {data.image.caption}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.6}>
            <div className="mt-14 flex flex-col sm:flex-row justify-center gap-6">
              <Magnetic>
                <FormModalTrigger formType="contact" size="xl" variant="primary" className="px-12 shadow-xl shadow-primary/20 rounded-2xl h-16">
                  {CTA_LINKS.requestCare.label}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </FormModalTrigger>
              </Magnetic>
              <Magnetic>
                <FormModalTrigger formType="contact" variant="outline" size="xl" className="px-12 rounded-2xl h-16 border-2">
                  {CTA_LINKS.contact.label}
                </FormModalTrigger>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </section>

      {data.evidence && (
        <EvidencePanel
          eyebrow={data.evidence.eyebrow}
          heading={data.evidence.heading}
          intro={data.evidence.intro}
          items={data.evidence.items}
        />
      )}

      {/* Who It Helps — Personalised Grid */}
      <Section className="bg-muted/30 border-y border-border/40">
        <Container>
          <Reveal>
            <div className="text-center mb-20">
              <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Tailored Support</span>
              <Heading level="h2" className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-serif)] mb-6">
                {data.whoItHelps.title}
              </Heading>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium">
                {data.whoItHelps.description}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.whoItHelps.audiences.map((audience, i) => (
              <Reveal key={audience} delay={i * 0.1}>
                <div className="group h-full flex items-center gap-5 rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-500 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <UserCheck className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-lg font-bold tracking-tight text-foreground">{audience}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Support Available — Premium Features */}
      <Section className="bg-white overflow-hidden">
        <Container>
          <Reveal>
            <div className="text-center mb-20">
               <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Service Highlights</span>
               <Heading level="h2" className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-serif)] mb-6">
                {data.supportAvailable.title}
               </Heading>
               <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium">
                {data.supportAvailable.description}
               </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {data.supportAvailable.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.1}>
                <div className="group relative h-full rounded-[3rem] border border-border/50 bg-card/30 p-10 sm:p-12 transition-all duration-700 hover:border-accent/30 hover:bg-card/50 hover:shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 text-primary/5 group-hover:text-primary/[0.08] transition-all duration-1000 group-hover:scale-125">
                    <Activity className="h-32 w-32" strokeWidth={0.5} />
                  </div>
                  
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary mb-8 ring-1 ring-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <CheckCircle2 className="h-7 w-7" strokeWidth={1.5} />
                  </div>

                  <Heading level="h3" className="text-2xl sm:text-3xl font-bold mb-6 tracking-tight relative z-10 group-hover:text-primary transition-colors font-[family-name:var(--font-serif)]">
                    {feature.title}
                  </Heading>
                  <p className="text-lg leading-[1.8] text-muted-foreground relative z-10 font-medium">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Choose Gentle Care — Clinical Focus */}
      <Section className="bg-primary/[0.02] border-y border-primary/10">
        <Container>
          <Reveal>
            <div className="text-center mb-20">
              <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">The Gentle Care Difference</span>
              <Heading level="h2" className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-serif)] mb-6">
                {data.whyChoose.title}
              </Heading>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium">
                {data.whyChoose.description}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {data.whyChoose.reasons.map((reason, i) => {
              const icons = [ShieldCheck, Sparkles, Heart];
              const Icon = icons[i % 3];
              return (
                <Reveal key={reason.title} delay={i * 0.15}>
                  <div className="flex flex-col items-center text-center group">
                    <div className="h-20 w-20 rounded-[2rem] bg-white shadow-xl border border-border/50 flex items-center justify-center mb-10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-primary/10 border-b-4 border-b-primary/20 group-hover:border-b-primary">
                      <Icon className="h-10 w-10 text-primary" strokeWidth={1.5} />
                    </div>
                    <Heading level="h3" className="text-2xl font-bold mb-6 tracking-tight">
                      {reason.title}
                    </Heading>
                    <p className="text-lg leading-relaxed text-muted-foreground font-medium">
                      {reason.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Case studies section removed 2026-06-15 per Gemma's brief */}

      {/* FAQ Preview */}
      {faqItems.length > 0 && (
        <FaqPreview
          title="Common Questions"
          items={data.faqs}
          viewAllHref="/faq"
          viewAllLabel="View all FAQs"
        />
      )}

      {/* Premium Internal Linking */}
      <Section className="bg-muted/30 border-t border-border/40">
        <Container>
          <Reveal>
            <div className="text-center mb-16">
               <Heading level="h2" className="text-3xl font-bold font-[family-name:var(--font-serif)]">Explore Related Services</Heading>
               <p className="mt-4 text-muted-foreground font-medium">Personalised clinical care tailored to your unique required outcomes.</p>
            </div>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-6">
            {SERVICES.filter((s) => s.href !== data.href)
              .slice(0, 3)
              .map((service, i) => (
                <Reveal key={service.href} delay={i * 0.1}>
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-3 rounded-2xl border border-border/60 bg-white px-10 py-5 text-lg font-bold text-foreground shadow-sm transition-all duration-500 hover:border-primary/30 hover:text-primary hover:shadow-xl hover:-translate-y-1"
                  >
                    {service.title}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Reveal>
              ))}
          </div>
        </Container>
      </Section>

      {/* Related guides & compare sections removed 2026-06-10 — the
          /guides and /compare pages were deleted per Gemma's brief. */}

      {/* Testimonials removed pending consented client quotes. */}

      {/* CTA Section — High Impact */}
      <ServiceCtaWithModal
        title={data.cta.title}
        description={data.cta.description || "Our clinical lead is ready to guide you through a tailored care plan."}
      />
    </>
  );
}
