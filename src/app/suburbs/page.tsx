import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import { getBreadcrumbListSchema } from "@/lib/schema";
import { SUBURBS } from "@/content/suburbs";
import { ArrowRight, MapPin } from "lucide-react";

const canonical = `${INTEGRATIONS.siteUrl}/suburbs`;

export const metadata = createMetadata({
  title: "In-Home Nursing by Sydney Suburb",
  description:
    "Suburb-by-suburb in-home nursing across Sydney — local LGA, nearest hospitals, and the wider region for every suburb we serve. NDIS, DVA, aged care, and private nursing.",
  canonical,
});

/**
 * /suburbs — index of suburb-level location pages.
 *
 * Each /suburbs/[slug] page has substantive local content (LGA, nearest
 * hospitals, neighbouring suburbs, distinctive local context). This index
 * resolves their breadcrumb parent and gives humans a clean way to find
 * the right suburb page. Suburbs are grouped by region — the same six
 * regions used in /areas — so the index doubles as a Sydney map of where
 * we deliver care.
 */

const breadcrumbItems = [
  { name: "Home", item: "/" },
  { name: "Suburbs", item: "/suburbs" },
];

const REGIONS = [
  "Inner West",
  "North Shore",
  "Northern Beaches",
  "Sydney CBD & East",
  "Western Sydney",
  "South Sydney",
] as const;

export default function SuburbsIndexPage() {
  const schemas = [
    getBreadcrumbListSchema(breadcrumbItems),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "In-Home Nursing by Sydney Suburb",
      url: canonical,
      description:
        "Suburb-level in-home nursing and care across Sydney — listed by suburb with local hospitals, LGA, and neighbouring suburbs.",
      isPartOf: { "@type": "WebSite", url: INTEGRATIONS.siteUrl },
      hasPart: SUBURBS.map((s) => ({
        "@type": "Place",
        name: s.name,
        url: `${INTEGRATIONS.siteUrl}/suburbs/${s.slug}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: s.name,
          addressRegion: "NSW",
          postalCode: s.postcode,
          addressCountry: "AU",
        },
      })),
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
              { label: "Suburbs" },
            ]}
            className="mb-8"
          />

          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
            <MapPin className="h-3 w-3" /> Suburbs we serve
          </span>

          <Heading
            level="h1"
            as="h1"
            className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
          >
            In-home nursing by Sydney suburb
          </Heading>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground">
            Find the suburb you're looking for. Each suburb page lists the
            local LGA, the nearest hospitals we coordinate with, and the
            neighbouring suburbs we also serve — so you know exactly what
            in-home care across this part of Sydney involves.
          </p>
        </Container>
      </Section>

      <Section size="md" variant="default">
        <Container size="md" className="space-y-10">
          {REGIONS.map((region) => {
            const suburbsInRegion = SUBURBS.filter((s) => s.region === region);
            if (suburbsInRegion.length === 0) return null;
            return (
              <section
                key={region}
                id={region.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}
                className="scroll-mt-24"
              >
                <Heading
                  level="h2"
                  as="h2"
                  className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-serif)] mb-4"
                >
                  {region}
                </Heading>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {suburbsInRegion.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/suburbs/${s.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-4 py-3 transition hover:border-primary/40 hover:bg-card/70"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-foreground">
                          {s.name}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {s.lga}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </Container>
      </Section>

      <Section size="md" variant="muted">
        <Container size="md" className="text-center">
          <Heading
            level="h2"
            as="h2"
            className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-serif)]"
          >
            Suburb not listed?
          </Heading>
          <p className="mt-4 mx-auto max-w-2xl text-base text-muted-foreground">
            We serve every Sydney region we list — these are just the suburbs
            with dedicated pages. If yours isn't here, get in touch and we'll
            confirm we cover your area and what care could look like.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={CTA_LINKS.requestCare.href}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              {CTA_LINKS.requestCare.label}
            </Link>
            <Link
              href="/areas"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-6 text-sm font-medium text-foreground transition hover:bg-muted/50"
            >
              See all areas we serve
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
