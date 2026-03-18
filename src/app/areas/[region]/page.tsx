import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/animations/Magnetic";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { getAreaContentBySlug, getAllAreaSlugs } from "@/content/areas-content";
import { getAreaPageSchema, getBreadcrumbListSchema } from "@/lib/schema";
import { INTEGRATIONS } from "@/config/integrations";
import { getBreadcrumbPaths } from "@/content/topical-map";
import { MapPin, ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { FormModalTrigger } from "@/components/ui/FormModalTrigger";

type Props = { params: Promise<{ region: string }> };

export async function generateStaticParams() {
  return getAllAreaSlugs().map((slug) => ({ region: slug }));
}

export async function generateMetadata({ params }: Props) {
  const { region: slug } = await params;
  const area = getAreaContentBySlug(slug);
  if (!area) return {};
  return createMetadata({
    title: `In-Home Nursing ${area.region} | Sydney`,
    description: area.description,
    canonical: `${INTEGRATIONS.siteUrl}/areas/${area.slug}`,
  });
}

export default async function AreaRegionPage({ params }: Props) {
  const { region: slug } = await params;
  const area = getAreaContentBySlug(slug);
  if (!area) notFound();

  const path = `/areas/${area.slug}`;
  const breadcrumbItems = getBreadcrumbPaths(path, area.region).map((item, i, arr) => ({
    label: item.label,
    href: i < arr.length - 1 ? item.path : undefined,
  }));
  const breadcrumbSchema = getBreadcrumbListSchema(
    getBreadcrumbPaths(path, area.region).map((item, i) => ({
      name: item.label,
      item: INTEGRATIONS.siteUrl + item.path,
    }))
  );
  const areaPageSchema = getAreaPageSchema(area.region, path, area.description);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, areaPageSchema]) }}
      />
      
      {/* Cinematic Area Hero */}
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
                Service Location
              </span>
              <Heading level="h1" className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 font-[family-name:var(--font-serif)] leading-[1.1]">
                In-Home Nursing & Care in {area.region}
              </Heading>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mx-auto max-w-2xl text-center text-xl leading-relaxed text-muted-foreground font-medium">
              {area.headline}
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-14 flex flex-col sm:flex-row justify-center gap-6">
              <Magnetic>
                <FormModalTrigger formType="care-finder" size="xl" variant="primary" className="px-12 shadow-xl shadow-primary/20 rounded-2xl h-16">
                  Check Availability in {area.region}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </FormModalTrigger>
              </Magnetic>
              <Magnetic>
                <FormModalTrigger formType="contact" variant="outline" size="xl" className="px-12 rounded-2xl h-16 border-2">
                  Speak to a Clinical Lead
                </FormModalTrigger>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Main Content Area */}
      <Section className="bg-muted/30 border-y border-border/40">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7 space-y-12">
              <Reveal>
                <div className="space-y-6">
                  <Heading level="h2" className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-serif)] text-foreground">
                    Clinical Care Delivered Your Way
                  </Heading>
                  <p className="text-xl leading-relaxed text-muted-foreground font-medium">
                    {area.body}
                  </p>
                </div>
              </Reveal>

              {area.examples && area.examples.length > 0 && (
                <Reveal delay={0.1}>
                  <div className="rounded-[2.5rem] border border-border/60 bg-white p-10 sm:p-12 shadow-sm transition-all duration-500 hover:shadow-xl">
                    <Heading level="h3" className="text-2xl font-bold mb-8 font-[family-name:var(--font-serif)]">
                      How we help families in {area.region}
                    </Heading>
                    <div className="grid gap-6">
                      {area.examples.map((example, i) => (
                        <div key={i} className="flex gap-4 group">
                          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <p className="text-lg leading-relaxed text-muted-foreground font-medium">{example}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            <aside className="lg:col-span-5 lg:sticky lg:top-32">
              <Reveal delay={0.2}>
                <div className="rounded-[2.5rem] border border-border bg-white p-10 shadow-sm overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 text-primary/5 pointer-events-none">
                    <MapPin className="h-32 w-32" strokeWidth={1} />
                  </div>
                  
                  <Heading level="h3" className="text-2xl font-bold mb-8 font-[family-name:var(--font-serif)] relative z-10">
                    Communities We Serve in {area.region}
                  </Heading>
                  
                  <ul className="flex flex-wrap gap-2.5 relative z-10">
                    {area.suburbs.map((suburb) => (
                      <li key={suburb}>
                        <span className="inline-block rounded-full bg-primary/[0.03] px-5 py-2 text-[13px] font-bold text-primary/80 ring-1 ring-primary/10 transition-all hover:bg-primary hover:text-white hover:ring-primary">
                          {suburb}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 pt-8 border-t border-border/60 relative z-10">
                    <p className="text-base text-muted-foreground leading-relaxed mb-8">
                      We work with support coordinators, discharge planners, and families across Sydney. Submit an enquiry for a clinical response within 24 hours.
                    </p>
                    <FormModalTrigger formType="care-finder" className="w-full h-14 rounded-2xl gap-2 font-bold shadow-lg shadow-primary/10">
                      Start Care Journey
                      <ArrowRight className="h-4 w-4" />
                    </FormModalTrigger>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Trust Quote Section */}
      <Section className="bg-white">
        <Container size="sm">
          <Reveal>
            <div className="text-center">
              <div className="mb-10 inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-accent/5 text-accent">
                <PhoneCall className="h-8 w-8" />
              </div>
              <Heading level="h2" className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-serif)] mb-8 leading-tight">
                Ready to discuss care in {area.region}?
              </Heading>
              <p className="text-xl text-muted-foreground font-medium mb-12">
                Our clinical lead, Gemma, is available to discuss your specific requirements and ensure a seamless start to boutique support.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Magnetic>
                  <Link
                    href={CTA_LINKS.contact.href}
                    className="inline-flex h-16 items-center justify-center rounded-2xl bg-primary px-10 text-lg font-bold text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-1"
                  >
                    Contact Clinical Lead
                  </Link>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
