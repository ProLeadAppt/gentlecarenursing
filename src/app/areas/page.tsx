import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { AREAS_CONTENT } from "@/content/areas-content";
import { getBreadcrumbListSchema } from "@/lib/schema";
import { INTEGRATIONS } from "@/config/integrations";

export const metadata = createMetadata({
  title: "Areas We Serve | Sydney Regions",
  description:
    "In-home nursing and care across Sydney: Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, and Sydney CBD & East. NDIS, DVA, aged care, and private.",
  canonical: `${INTEGRATIONS.siteUrl}/areas`,
});

export default function AreasIndexPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Areas We Serve" },
  ];
  const breadcrumbSchema = getBreadcrumbListSchema(
    breadcrumbItems.map((item, i) => ({
      name: item.label,
      item: i === 0 ? INTEGRATIONS.siteUrl + "/" : INTEGRATIONS.siteUrl + "/areas",
    }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Section size="lg" variant="default">
        <Container>
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />
          <SectionHeader
            title="Areas We Serve"
            subtitle="We provide in-home nursing and personal care across Sydney and surrounds. Choose your region to find out how we can help you or your loved one."
            size="lg"
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS_CONTENT.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/areas/${area.slug}`}
                  className="block rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
                >
                  <h2 className="font-[family-name:var(--font-dm-sans)] text-xl font-semibold text-foreground">
                    {area.region}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {area.suburbs.slice(0, 3).join(", ")}
                    {area.suburbs.length > 3 ? "…" : ""}
                  </p>
                  <span className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
                    In-home nursing in {area.region} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Link
              href={CTA_LINKS.requestCare.href}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              {CTA_LINKS.requestCare.label}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
