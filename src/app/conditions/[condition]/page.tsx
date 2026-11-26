import "../../premium-editorial.css";
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

  const titles: Record<string, string> = {
    "multiple-sclerosis": "MS Nursing Care at Home Sydney | Gentle Care",
    "motor-neurone-disease": "MND Nursing Care at Home Sydney | Gentle Care",
    "parkinsons-disease": "Parkinson's Care at Home Sydney | Gentle Care",
    "spinal-cord-injury": "Spinal Cord Injury Care Sydney | Gentle Care",
    "acquired-brain-injury": "Acquired Brain Injury Care Sydney | Gentle Care",
    "cerebral-palsy": "Cerebral Palsy Care at Home Sydney | Gentle Care",
  };
  const descriptions: Record<string, string> = {
    "multiple-sclerosis":
      "In-home nursing for multiple sclerosis across Sydney, including medication support, mobility, continence care, and relapse support.",
    "motor-neurone-disease":
      "In-home nursing for motor neurone disease across Sydney, including PEG feeding, tracheostomy support, ventilation help, and symptom relief.",
    "parkinsons-disease":
      "In-home nursing for Parkinson's across Sydney, including medication timing, falls prevention, and swallowing safety.",
    "spinal-cord-injury":
      "In-home nursing for spinal cord injury across Sydney, including bowel and bladder care, pressure care, and respiratory support.",
    "acquired-brain-injury":
      "In-home nursing for acquired brain injury across Sydney, including medication support, falls prevention, and swallowing safety.",
    "cerebral-palsy":
      "In-home nursing for cerebral palsy across Sydney, including NDIS-funded routines, PEG feeding, catheter care, and pressure care.",
  };

  return createMetadata({
    title: { absolute: titles[entry.slug] ?? entry.data.title },
    description: descriptions[entry.slug] ?? entry.data.snippetAnswer,
    canonical: `${INTEGRATIONS.siteUrl}/conditions/${entry.slug}`,
  });
}

export default async function ConditionPage({ params }: Props) {
  const { condition } = await params;
  const entry = getConditionBySlug(condition);

  if (!entry) {
    notFound();
  }

  return (
    <div className="premium-condition">
      <ServicePageLayout data={entry.data} />
    </div>
  );
}

// Only the explicitly generated content URLs are valid in this route family.
export const dynamicParams = false;
