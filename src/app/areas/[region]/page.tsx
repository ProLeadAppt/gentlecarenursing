import { notFound } from "next/navigation";
import { SuburbLandingPage } from "@/components/sections/SuburbLandingPage";
import { areaToLanding } from "@/content/premium-location";
import { SITE_LAST_UPDATED } from "@/lib/constants";
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
    openGraph: {
      images: [{ url: `${INTEGRATIONS.siteUrl}/areas/${area.slug}/opengraph-image`, width: 1200, height: 630, alt: `In-home nursing in ${area.region} | Gentle Care Nursing Services` }],
    },
  });
}

export default async function AreaRegionPage({ params }: Props) {
  const { region: slug } = await params;
  const area = getAreaContentBySlug(slug);
  if (!area) notFound();

  const path = `/areas/${area.slug}`;
  const breadcrumbSchema = getBreadcrumbListSchema(
    getBreadcrumbPaths(path, area.region).map((item) => ({
      name: item.label,
      item: INTEGRATIONS.siteUrl + item.path,
    }))
  );
  const areaPageSchema = getAreaPageSchema(area.region, path, area.description, SITE_LAST_UPDATED);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, areaPageSchema]) }}
      />
      <SuburbLandingPage page={areaToLanding(area)} documentSchemas={null} />
    </>
  );
}

export const dynamicParams = false;
