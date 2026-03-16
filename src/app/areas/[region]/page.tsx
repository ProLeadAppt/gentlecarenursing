import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { getAreaContentBySlug, getAllAreaSlugs } from "@/content/areas-content";
import { getAreaPageSchema, getBreadcrumbListSchema } from "@/lib/schema";
import { INTEGRATIONS } from "@/config/integrations";
import { getBreadcrumbPaths } from "@/content/topical-map";

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
      item: i === 0 ? INTEGRATIONS.siteUrl + item.path : INTEGRATIONS.siteUrl + item.path,
    }))
  );
  const areaPageSchema = getAreaPageSchema(area.region, path, area.description);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, areaPageSchema]) }}
      />
      <Section size="lg" variant="default">
        <Container>
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />
          <SectionHeader
            title={`In-Home Nursing & Care in ${area.region}`}
            subtitle={area.headline}
            size="lg"
          />
          <div className="mx-auto max-w-2xl">
            <p className="text-lg leading-relaxed text-muted-foreground">{area.body}</p>
            <h2 className="mt-10 font-[family-name:var(--font-dm-sans)] text-xl font-semibold text-foreground">
              Suburbs we serve in {area.region}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {area.suburbs.map((suburb) => (
                <li key={suburb}>
                  <span className="rounded-lg bg-muted/80 px-3 py-1.5 text-sm text-foreground">
                    {suburb}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base text-muted-foreground">
              We work with support coordinators, discharge planners, and families across Sydney. Submit an enquiry and you'll get a personal response within 24 hours with clear next steps.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={CTA_LINKS.requestCare.href}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                {CTA_LINKS.requestCare.label}
              </Link>
              <Link
                href={CTA_LINKS.contact.href}
                className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-border px-8 font-medium text-foreground transition hover:bg-muted/50"
              >
                {CTA_LINKS.contact.label}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
