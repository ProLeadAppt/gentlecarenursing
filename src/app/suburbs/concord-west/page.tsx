import type { Metadata } from "next";
import { SuburbLandingPage } from "@/components/sections/SuburbLandingPage";
import { getSuburbLandingPage } from "@/content/suburb-landing-pages";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";

const page = getSuburbLandingPage("concord-west");
const canonical = `${INTEGRATIONS.siteUrl}/suburbs/${page.slug}`;

export const metadata: Metadata = createMetadata({
  title: { absolute: page.seoTitle },
  description: page.metaDescription,
  canonical,
  openGraph: {
    title: page.seoTitle,
    description: page.metaDescription,
    url: canonical,
  },
  twitter: {
    title: page.seoTitle,
    description: page.metaDescription,
  },
});

export default function ConcordWestSuburbPage() {
  return <SuburbLandingPage page={page} />;
}
