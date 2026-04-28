import { notFound } from "next/navigation";
import { ServiceRegionPageLayout } from "@/components/sections/ServiceRegionPageLayout";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import {
  getAllServiceRegionParams,
  getServiceRegionPage,
} from "@/content/service-regions";
import {
  getBreadcrumbListSchema,
  getFaqSchema,
  getServiceRegionSchemas,
} from "@/lib/schema";

type Props = { params: Promise<{ service: string; region: string }> };

export async function generateStaticParams() {
  return getAllServiceRegionParams();
}

export async function generateMetadata({ params }: Props) {
  const { service, region } = await params;
  const page = getServiceRegionPage(service, region);
  if (!page) return {};
  return createMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    canonical: `${INTEGRATIONS.siteUrl}${page.path}`,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${INTEGRATIONS.siteUrl}${page.path}`,
    },
  });
}

export default async function ServiceRegionPage({ params }: Props) {
  const { service, region } = await params;
  const page = getServiceRegionPage(service, region);
  if (!page) notFound();

  const breadcrumbItems = [
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: page.service.title, item: page.service.parentHref },
    { name: page.region.region, item: page.path },
  ];

  const schemas = [
    getBreadcrumbListSchema(breadcrumbItems),
    ...getServiceRegionSchemas({
      serviceName: page.service.title,
      serviceDescription: page.service.schemaDescription.replace(
        /\{region\}/g,
        page.region.region
      ),
      region: page.region.region,
      suburbs: page.region.suburbs,
      path: page.path,
      pageTitle: page.metaTitle,
      pageDescription: page.metaDescription,
    }),
    getFaqSchema([...page.faqs]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ServiceRegionPageLayout data={page} />
    </>
  );
}
