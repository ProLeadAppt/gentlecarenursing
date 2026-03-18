import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { TrustMarquee } from "./TrustMarquee";
import { FaqPreview } from "./FaqPreview";
import { ServiceCtaWithModal } from "./ServiceCtaWithModal";
import { Testimonials } from "./Testimonials";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { FormModalTrigger } from "@/components/ui/FormModalTrigger";
import { CTA_LINKS } from "@/lib/constants";
import { getServiceSchema, getFaqSchema } from "@/lib/schema";
import { SERVICES } from "@/content/services";
import { ALL_GUIDES } from "@/content/guides";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/animations/Reveal";
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
  /** Optional anonymised case stories to illustrate real-world outcomes */
  caseStories?: {
    title: string;
    summary: string;
  }[];
  /** Optional service or region-specific testimonials to surface on the page */
  testimonials?: {
    quote: string;
    name: string;
    role: string;
    rating?: number;
  }[];
  /** Optional guide slugs that are especially relevant to this service */
  relatedGuideSlugs?: string[];
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

  const schemas = [
    getServiceSchema({
      name: data.title,
      description: data.intro,
      url: data.href ?? "",
    }),
    ...(faqItems.length > 0 ? [getFaqSchema(data.faqs)] : []),
  ];

  const relatedGuides =
    data.relatedGuideSlugs?.map((slug) => ALL_GUIDES.find((g) => g.slug === slug)).filter(
      (g): g is (typeof ALL_GUIDES)[number] => g != null
    ) ?? [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas),
        }}
      />

      {/* Premium Service Hero — Soft Gradients & Motion */}
      <section className="relative overflow-hidden bg-white py-24 lg:py-32 border-b border-border/40">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/15 blur-[120px]" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <Container size="md" className="relative z-10">
          <Reveal delay={0.1}>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: data.title },
              ]}
              className="mb-10 justify-center"
            />
          </Reveal>
          
          <Reveal delay={0.2} y={30}>
            <Heading level="h1" as="h1" className="text-center text-5xl sm:text-6xl font-bold tracking-tight mb-6">
              {data.title}
            </Heading>
          </Reveal>

          <Reveal delay={0.3} y={15}>
            <p className="mx-auto text-center text-xl font-semibold text-primary mb-10 tracking-[0.05em] uppercase sm:text-base">
              Sydney-Wide Boutique Clinical Care
            </p>
          </Reveal>

          {data.snippetAnswer && (
            <Reveal delay={0.4} y={15}>
              <div className="mx-auto mb-10 max-w-3xl rounded-[2rem] bg-accent/5 border border-accent/20 p-8 shadow-sm">
                <p className="text-center text-lg font-bold leading-relaxed text-foreground sm:text-xl italic" role="doc-abstract">
                  "{data.snippetAnswer}"
                </p>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.5} y={10}>
            <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {data.intro}
            </p>
          </Reveal>

          <Reveal delay={0.6} y={10}>
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
              <Magnetic>
                <FormModalTrigger formType="referral" size="xl" variant="primary" className="px-10 shadow-lg shadow-primary/20">
                  {CTA_LINKS.requestCare.label}
                </FormModalTrigger>
              </Magnetic>
              <Magnetic>
                <FormModalTrigger formType="contact" variant="outline" size="xl" className="px-10">
                  {CTA_LINKS.contact.label}
                </FormModalTrigger>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </section>

      <TrustMarquee />

      {/* Who It Helps — Enhanced Layout */}
      <Section className="bg-muted/30">
        <Container>
          <Reveal>
            <div className="text-center mb-16">
              <Heading level="h2" as="h2" className="text-3xl sm:text-4xl font-bold mb-4">
                {data.whoItHelps.title}
              </Heading>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium">
                {data.whoItHelps.description}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.whoItHelps.audiences.map((audience, i) => (
              <Reveal key={audience} delay={i * 0.1} y={15}>
                <div className="group h-full flex items-center gap-4 rounded-2xl border border-border bg-white px-6 py-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <span className="text-base font-bold text-foreground">{audience}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Support Available — Premium Card Reveal */}
      <Section className="bg-white">
        <Container>
          <Reveal>
            <div className="text-center mb-16">
               <Heading level="h2" as="h2" className="text-3xl sm:text-4xl font-bold mb-4">
                {data.supportAvailable.title}
               </Heading>
               <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                {data.supportAvailable.description}
               </p>
            </div>
          </Reveal>

          <Grid cols={2} gap="lg" className="mt-12">
            {data.supportAvailable.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.1} y={20}>
                <div className="group h-full rounded-[2.5rem] border border-border/60 bg-white p-10 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_40px_80px_-20px_rgba(132,40,51,0.06)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-primary/5 group-hover:text-primary/10 transition-colors">
                    <Activity className="h-24 w-24" strokeWidth={1} />
                  </div>
                  <Heading level="h3" as="h3" className="text-2xl font-bold mb-4 relative z-10 group-hover:text-primary transition-colors">
                    {feature.title}
                  </Heading>
                  <p className="text-lg leading-relaxed text-muted-foreground relative z-10">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Why Choose Gentle Care — Clinical Focus */}
      <Section className="bg-primary/[0.02] border-y border-primary/5">
        <Container>
          <Reveal>
            <div className="text-center mb-16">
              <Heading level="h2" as="h2" className="text-3xl sm:text-4xl font-bold mb-4">
                {data.whyChoose.title}
              </Heading>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                {data.whyChoose.description}
              </p>
            </div>
          </Reveal>

          <Grid cols={3} gap="lg" className="mt-12">
            {data.whyChoose.reasons.map((reason, i) => {
              const icons = [ShieldCheck, Sparkles, Heart];
              const Icon = icons[i % 3];
              return (
                <Reveal key={reason.title} delay={i * 0.15} y={15}>
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-[1.5rem] bg-white shadow-md border border-border/50 flex items-center justify-center mb-8 rotate-3 transform transition-transform hover:rotate-0">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <Heading level="h3" as="h3" className="text-xl font-bold mb-4">
                      {reason.title}
                    </Heading>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </Grid>
        </Container>
      </Section>

      {data.caseStories && data.caseStories.length > 0 && (
        <Section className="bg-white">
          <Container>
            <Reveal>
              <div className="text-center mb-16">
                 <Heading level="h2" as="h2" className="text-3xl sm:text-4xl font-bold mb-4">
                  Real Examples of How This Helps
                 </Heading>
                 <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                   Names and details are changed for privacy, but these situations reflect the quality clinical support we provide daily across Sydney.
                 </p>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {data.caseStories.map((story, i) => (
                <Reveal key={story.title} delay={i * 0.1} y={20}>
                  <article className="group h-full rounded-[2rem] border border-border bg-card p-10 text-left shadow-sm transition-all hover:border-primary/30 hover:shadow-xl">
                    <div className="mb-6 inline-flex px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold uppercase tracking-widest text-accent">Anonymised Case Story</div>
                    <Heading level="h3" as="h3" className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {story.title}
                    </Heading>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {story.summary}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* FAQ Preview */}
      {faqItems.length > 0 && (
        <FaqPreview
          title="Common Questions"
          items={data.faqs}
          viewAllHref="/faq"
          viewAllLabel="View all FAQs"
        />
      )}

      {/* Related services — internal linking with premium treatment */}
      <Section className="bg-muted/30">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
               <Heading level="h2" as="h2" className="text-2xl font-bold">Related Services</Heading>
               <p className="mt-2 text-muted-foreground">Explore our other in-home nursing and care options.</p>
            </div>
          </Reveal>
          <ul className="mt-8 flex flex-wrap justify-center gap-6">
            {SERVICES.filter((s) => s.href !== data.href)
              .slice(0, 3)
              .map((service, i) => (
                <Reveal key={service.href} delay={i * 0.1}>
                  <li>
                    <Link
                      href={service.href}
                      className="group inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-8 py-4 text-base font-bold text-foreground shadow-sm transition-all hover:border-primary hover:text-primary hover:shadow-lg hover:-translate-y-1"
                    >
                      {service.title}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                </Reveal>
              ))}
          </ul>
        </Container>
      </Section>

      {relatedGuides.length > 0 && (
        <Section className="bg-white">
          <Container>
            <Reveal>
              <div className="text-center mb-12">
                 <Heading level="h2" as="h2" className="text-2xl font-bold">Short Guides for Common Situations</Heading>
                 <p className="mt-2 text-muted-foreground">Practical advice for families and coordinators.</p>
              </div>
            </Reveal>
            <ul className="mt-8 grid gap-8 md:grid-cols-2">
              {relatedGuides.map((guide, i) => (
                <Reveal key={guide.slug} delay={i * 0.1} y={20}>
                  <li className="h-full">
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="group block h-full rounded-[2rem] border border-border bg-white p-10 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-2xl"
                    >
                      <Heading level="h3" as="h3" className="text-xl font-bold group-hover:text-primary transition-colors">
                        {guide.title}
                      </Heading>
                      <p className="mt-5 line-clamp-3 text-base text-muted-foreground leading-relaxed">
                        {guide.snippetAnswer}
                      </p>
                      <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary border-b-2 border-primary/20 group-hover:border-primary transition-all">
                        Read full guide <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {data.testimonials && data.testimonials.length > 0 && (
        <Testimonials
          title="What Our Clients Say About This Type of Care"
          subtitle="Real experiences from families, coordinators, and health professionals."
          label={undefined}
          testimonials={data.testimonials}
          sectionVariant="default"
        />
      )}

      {/* CTA */}
      <ServiceCtaWithModal
        title={data.cta.title}
        description={data.cta.description}
      />
    </>
  );
}