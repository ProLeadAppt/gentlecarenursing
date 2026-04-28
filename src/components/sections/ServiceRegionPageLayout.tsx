import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/animations/Reveal";
import { Magnetic } from "@/components/animations/Magnetic";
import { FormModalTrigger } from "@/components/ui/FormModalTrigger";
import { FaqPreview } from "./FaqPreview";
import { ServiceCtaWithModal } from "./ServiceCtaWithModal";
import { CTA_LINKS, SITE } from "@/lib/constants";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import type { ServiceRegionPageData } from "@/content/service-regions";
import { SERVICES as SERVICE_REGION_SERVICES } from "@/content/service-regions";

interface Props {
  data: ServiceRegionPageData;
}

export function ServiceRegionPageLayout({ data }: Props) {
  const { service, region } = data;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title, href: service.parentHref },
    { label: region.region },
  ];

  const relatedServices = service.related
    .map((slug) => SERVICE_REGION_SERVICES.find((s) => s.slug === slug))
    .filter((s): s is (typeof SERVICE_REGION_SERVICES)[number] => s != null);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/[0.08] blur-[120px]" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-primary/[0.04] blur-[100px]" />
        </div>

        <Container size="md" className="relative z-10">
          <Reveal delay={0.1}>
            <div className="flex justify-center mb-10">
              <Breadcrumbs items={breadcrumbItems} />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="text-center">
              <span className="mb-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70">
                <MapPin className="h-3 w-3" />
                {region.region} · Sydney
              </span>
              <Heading
                level="h1"
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 font-[family-name:var(--font-serif)] leading-[1.1]"
              >
                {data.h1}
              </Heading>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mx-auto mb-12 max-w-3xl rounded-[3rem] bg-accent/[0.03] border border-accent/15 p-10 shadow-sm backdrop-blur-sm">
              <p className="text-center text-xl font-medium leading-relaxed text-foreground italic font-[family-name:var(--font-serif)]">
                &ldquo;{service.snippetAnswer}&rdquo;
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted-foreground font-medium">
              {data.hero}
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-14 flex flex-col sm:flex-row justify-center gap-6">
              <Magnetic>
                <FormModalTrigger
                  formType="care-finder"
                  size="xl"
                  variant="primary"
                  className="px-12 shadow-xl shadow-primary/20 rounded-2xl h-16"
                >
                  Request Care in {region.region}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </FormModalTrigger>
              </Magnetic>
              <Magnetic>
                <Link
                  href={SITE.phoneHref}
                  className="inline-flex h-16 items-center justify-center rounded-2xl border-2 border-primary/20 bg-white px-12 text-lg font-bold text-primary shadow-sm transition-all hover:-translate-y-1 hover:border-primary"
                >
                  <PhoneCall className="mr-2 h-5 w-5" />
                  Call {SITE.phone}
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Service overview + suburbs sidebar */}
      <Section className="bg-muted/30 border-y border-border/40">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7 space-y-12">
              <Reveal>
                <div className="space-y-6">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                    Service Overview
                  </span>
                  <Heading
                    level="h2"
                    className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-serif)] text-foreground"
                  >
                    What {service.title} Looks Like in {region.region}
                  </Heading>
                  <p className="text-lg leading-[1.8] text-muted-foreground font-medium whitespace-pre-line">
                    {data.serviceOverview}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-[2.5rem] border border-border/60 bg-white p-10 sm:p-12 shadow-sm">
                  <Heading
                    level="h3"
                    className="text-2xl font-bold mb-8 font-[family-name:var(--font-serif)]"
                  >
                    What's included
                  </Heading>
                  <ul className="grid gap-5 sm:grid-cols-2">
                    {data.included.map((item) => (
                      <li key={item} className="flex gap-4">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <span className="text-base leading-relaxed text-muted-foreground font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <aside className="lg:col-span-5 lg:sticky lg:top-32">
              <Reveal delay={0.2}>
                <div className="rounded-[2.5rem] border border-border bg-white p-10 shadow-sm overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 text-primary/5 pointer-events-none">
                    <MapPin className="h-32 w-32" strokeWidth={1} />
                  </div>

                  <Heading
                    level="h3"
                    className="text-2xl font-bold mb-2 font-[family-name:var(--font-serif)] relative z-10"
                  >
                    {region.region} Suburbs We Serve
                  </Heading>
                  <p className="mb-8 text-sm text-muted-foreground relative z-10">
                    {region.positionLine}
                  </p>

                  <ul className="flex flex-wrap gap-2.5 relative z-10">
                    {region.suburbs.map((suburb) => (
                      <li key={suburb}>
                        <span className="inline-block rounded-full bg-primary/[0.03] px-5 py-2 text-[13px] font-bold text-primary/80 ring-1 ring-primary/10">
                          {suburb}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 pt-8 border-t border-border/60 relative z-10 space-y-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Registered NDIS provider and DVA Contracted Community
                        Nursing Provider.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <PhoneCall className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Prompt response within business hours, with urgent
                        referrals prioritised.
                      </p>
                    </div>

                    <FormModalTrigger
                      formType="care-finder"
                      className="w-full h-14 rounded-2xl gap-2 font-bold shadow-lg shadow-primary/10 mt-4"
                    >
                      Request Care in {region.region}
                      <ArrowRight className="h-4 w-4" />
                    </FormModalTrigger>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Regional context */}
      <Section className="bg-white">
        <Container size="md">
          <Reveal>
            <div className="text-center mb-12">
              <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                Local Context
              </span>
              <Heading
                level="h2"
                className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-serif)]"
              >
                Why families and coordinators in {region.region} choose us
              </Heading>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-[1.85] text-muted-foreground font-medium whitespace-pre-line">
              {data.regionalContext}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Funding & access */}
      <Section className="bg-primary/[0.02] border-y border-primary/10">
        <Container size="md">
          <Reveal>
            <div className="text-center mb-12">
              <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                Funding & Access
              </span>
              <Heading
                level="h2"
                className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-serif)]"
              >
                How to access {service.title.toLowerCase()} in {region.region}
              </Heading>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-[1.85] text-muted-foreground font-medium whitespace-pre-line">
              {data.fundingAndAccess}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Magnetic>
                <FormModalTrigger
                  formType="care-finder"
                  size="lg"
                  variant="primary"
                  className="px-10 rounded-2xl h-14"
                >
                  Free Initial Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </FormModalTrigger>
              </Magnetic>
              <Magnetic>
                <Link
                  href={CTA_LINKS.contact.href}
                  className="inline-flex h-14 items-center justify-center rounded-2xl border-2 border-primary/20 bg-white px-10 text-base font-bold text-primary transition-all hover:border-primary"
                >
                  {CTA_LINKS.contact.label}
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* FAQs */}
      <FaqPreview
        title={`Common questions about ${service.title.toLowerCase()} in ${region.region}`}
        items={data.faqs.map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
        }))}
        viewAllHref="/faq"
        viewAllLabel="View all FAQs"
      />

      {/* Internal linking */}
      <Section className="bg-muted/30 border-t border-border/40">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <Heading
                level="h2"
                className="text-3xl font-bold font-[family-name:var(--font-serif)]"
              >
                Related services and pages
              </Heading>
              <p className="mt-4 text-muted-foreground font-medium">
                Explore the rest of our care across {region.region} and Sydney.
              </p>
            </div>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-4">
            <RelatedLink href={service.parentHref} label={`${service.title} (overview)`} />
            <RelatedLink href={`/areas/${region.slug}`} label={`In-home nursing in ${region.region}`} />
            {relatedServices.map((s) => (
              <RelatedLink
                key={s.slug}
                href={`/services/${s.slug}/${region.slug}`}
                label={`${s.shortTitle} in ${region.region}`}
              />
            ))}
            <RelatedLink href="/about" label="About Gentle Care Nursing" />
            <RelatedLink href="/contact" label="Contact us" />
          </div>
        </Container>
      </Section>

      <ServiceCtaWithModal
        title={data.ctaTitle}
        description={data.ctaDescription}
      />
    </>
  );
}

function RelatedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 rounded-2xl border border-border/60 bg-white px-8 py-4 text-base font-bold text-foreground shadow-sm transition-all duration-500 hover:border-primary/30 hover:text-primary hover:shadow-xl hover:-translate-y-1"
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
