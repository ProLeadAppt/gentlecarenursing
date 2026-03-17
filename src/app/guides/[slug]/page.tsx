import { GuidePageLayout } from "@/components/sections/GuidePageLayout";
import { getAllGuideSlugs, getGuideBySlug } from "@/content/guides";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/lib/integrations";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return createMetadata({
    title: guide.title,
    description: guide.snippetAnswer,
    canonical: `${INTEGRATIONS.siteUrl}/guides/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    // Let Next.js handle notFound via default behaviour
    return null;
  }

  return <GuidePageLayout guide={guide} />;
}

