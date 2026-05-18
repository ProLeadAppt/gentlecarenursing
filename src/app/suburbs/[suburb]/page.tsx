import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTA_LINKS, SITE } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import { getBreadcrumbListSchema } from "@/lib/schema";
import {
  getAllSuburbSlugs,
  getSuburbBySlug,
  type SuburbEntry,
} from "@/content/suburbs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Hospital, Building2 } from "lucide-react";

type Props = { params: Promise<{ suburb: string }> };

export async function generateStaticParams() {
  return getAllSuburbSlugs().map((suburb) => ({ suburb }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb } = await params;
  const entry = getSuburbBySlug(suburb);
  if (!entry) return {};

  return createMetadata({
    title: `In-Home Nursing & Care in ${entry.name}`,
    description: `In-home nursing, NDIS, DVA Community Nursing, and aged care for ${entry.name} (${entry.postcode}, ${entry.lga}). We coordinate with ${entry.nearestHospitals[0]} and serve the wider ${entry.region}.`,
    canonical: `${INTEGRATIONS.siteUrl}/suburbs/${entry.slug}`,
  });
}

/**
 * /suburbs/[suburb] — long-tail suburb-level location page.
 *
 * Each page targets a specific Sydney suburb's search lane (e.g.
 * "in-home nursing Strathfield", "NDIS provider Manly") with substantive
 * local content — LGA, nearest hospitals, neighbouring suburbs — rather
 * than thin keyword-targeting. Page emits per-suburb Place schema so AI
 * engines can bind Gentle Care to the location entity cleanly.
 *
 * Internally links to:
 *   - The relevant /areas/[region] page for regional context
 *   - The relevant service pages (NDIS, DVA, aged-care, private nursing)
 */

export default async function SuburbPage({ params }: Props) {
  const { suburb } = await params;
  const entry = getSuburbBySlug(suburb);
  if (!entry) notFound();

  const canonical = `${INTEGRATIONS.siteUrl}/suburbs/${entry.slug}`;

  const schemas = [
    getBreadcrumbListSchema([
      { name: "Home", item: "/" },
      { name: "Suburbs", item: "/suburbs" },
      { name: entry.name, item: `/suburbs/${entry.slug}` },
    ]),
    // Place schema binds the suburb to Gentle Care as an areaServed.
    // AI engines use this for "is X provider serving Y suburb" lookups.
    {
      "@context": "https://schema.org",
      "@type": "Place",
      "@id": `${canonical}#place`,
      name: entry.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: entry.name,
        addressRegion: "NSW",
        postalCode: entry.postcode,
        addressCountry: "AU",
      },
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: entry.lga,
      },
    },
    // MedicalService scoped to this suburb — the actual citable claim that
    // GCN serves this specific suburb, with the provider linked back to the
    // Organization @id so the entity graph stays connected.
    {
      "@context": "https://schema.org",
      "@type": "MedicalService",
      name: `In-home nursing in ${entry.name}, Sydney`,
      description: `In-home nursing and personal care across ${entry.name} (${entry.postcode}, ${entry.lga}). Funded by NDIS, DVA Community Nursing, Support at Home, CHSP, or private fee-for-service.`,
      url: canonical,
      areaServed: {
        "@id": `${canonical}#place`,
      },
      provider: {
        "@id": `${INTEGRATIONS.siteUrl}/#organization`,
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <Section size="lg" variant="card">
        <Container size="md">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Suburbs", href: "/suburbs" },
              { label: entry.name },
            ]}
            className="mb-8"
          />

          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
            <MapPin className="h-3 w-3" /> {entry.region}
          </span>

          <Heading
            level="h1"
            as="h1"
            className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
          >
            In-Home Nursing &amp; Care in {entry.name}
          </Heading>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground">
            Gentle Care Nursing Services provides in-home nursing and personal
            care in {entry.name} ({entry.postcode}) — a {entry.lga} suburb in
            the {entry.region}. We work across NDIS, DVA Community Nursing,
            Support at Home / CHSP, and private fee-for-service, and we
            coordinate with discharge planners at the local hospitals
            residents most often use.
          </p>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {entry.localContext}
          </p>
        </Container>
      </Section>

      <Section size="md" variant="default">
        <Container size="md">
          <div className="grid gap-6 md:grid-cols-2">
            <SuburbFactCard
              icon={<MapPin className="h-4 w-4" />}
              title="Local government area"
              body={entry.lga}
              footnote={`${entry.name} ${entry.postcode}`}
            />
            <SuburbFactCard
              icon={<Building2 className="h-4 w-4" />}
              title="Wider region"
              body={entry.region}
              footnote={
                <Link href={entry.regionHref} className="text-primary hover:underline">
                  See all of {entry.region} →
                </Link>
              }
            />
            <SuburbFactCard
              icon={<Hospital className="h-4 w-4" />}
              title="Hospitals coordinated with"
              body={
                <ul className="space-y-1">
                  {entry.nearestHospitals.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              }
            />
            <SuburbFactCard
              icon={<MapPin className="h-4 w-4" />}
              title="Neighbouring suburbs we also serve"
              body={entry.neighbouringSuburbs.join(", ")}
            />
          </div>
        </Container>
      </Section>

      <Section size="md" variant="muted">
        <Container size="md">
          <Heading
            level="h2"
            as="h2"
            className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-serif)] mb-6"
          >
            What we cover in {entry.name}
          </Heading>
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Whether you're an {entry.name} resident, a family member organising
            care, a support coordinator, or a discharge planner referring
            from one of the local hospitals, we deliver the same scope of care
            across every Sydney suburb we serve.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/ndis", label: "NDIS in-home nursing" },
              { href: "/dva", label: "DVA Community Nursing" },
              { href: "/aged-care", label: "Aged care at home" },
              { href: "/private-nursing", label: "Private in-home nursing" },
              { href: "/services/nursing-care", label: "General nursing care" },
              { href: "/services/complex-care", label: "Complex care" },
              { href: "/services/palliative-care", label: "Palliative care" },
              { href: "/services/post-hospital-care", label: "Post-hospital care" },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-card/70"
              >
                <span>{s.label}</span>
                <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="md" variant="default">
        <Container size="md" className="text-center">
          <Heading
            level="h2"
            as="h2"
            className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-serif)]"
          >
            Arrange in-home care in {entry.name}
          </Heading>
          <p className="mt-4 mx-auto max-w-2xl text-base text-muted-foreground">
            Submit an enquiry or call us on{" "}
            <a href={SITE.phoneHref} className="font-semibold text-primary hover:underline">
              {SITE.phone}
            </a>
            . We aim to respond within 24 hours during business hours, with
            urgent referrals — particularly from {entry.nearestHospitals[0]} —
            prioritised.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={CTA_LINKS.requestCare.href}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              {CTA_LINKS.requestCare.label}
            </Link>
            <Link
              href={CTA_LINKS.contact.href}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-6 text-sm font-medium text-foreground transition hover:bg-muted/50"
            >
              {CTA_LINKS.contact.label}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

function SuburbFactCard({
  icon,
  title,
  body,
  footnote,
}: {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
  footnote?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-6">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        {title}
      </div>
      <div className="mt-3 text-base font-semibold text-foreground">{body}</div>
      {footnote && (
        <div className="mt-2 text-sm text-muted-foreground">{footnote}</div>
      )}
    </div>
  );
}
