import { ServicePageLayout } from "@/components/sections/ServicePageLayout";
import {
  getAllConditionSlugs,
  getConditionBySlug,
} from "@/content/conditions";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ condition: string }> };

export async function generateStaticParams() {
  return getAllConditionSlugs().map((condition) => ({ condition }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { condition } = await params;
  const entry = getConditionBySlug(condition);
  if (!entry) return {};

  return createMetadata({
    title: entry.data.title,
    description: entry.data.snippetAnswer,
    canonical: `${INTEGRATIONS.siteUrl}/conditions/${entry.slug}`,
  });
}

export default async function ConditionPage({ params }: Props) {
  const { condition } = await params;
  const entry = getConditionBySlug(condition);

  if (!entry) {
    notFound();
  }

  return <ServicePageLayout data={entry.data} />;
}
