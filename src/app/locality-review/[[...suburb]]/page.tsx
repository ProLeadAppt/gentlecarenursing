import type { Metadata } from "next";
import LocalityReviewIndex from "../ReviewIndex";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { LOCALITY_REVIEW_DRAFTS, LOCALITY_REVIEW_SOURCES, getLocalityReview, isLocalityReviewEnabled } from "@/content/locality-review";

type Props = { params: Promise<{ suburb?: string[] }> };
export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

export function generateStaticParams() {
  return isLocalityReviewEnabled() ? [{ suburb: [] }, ...LOCALITY_REVIEW_DRAFTS.map(({ slug }) => ({ suburb: [slug] }))] : [];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isLocalityReviewEnabled()) return {};
  const segments = (await params).suburb ?? [];
  if (segments.length === 0) return {};
  const draft = segments.length === 1 ? getLocalityReview(segments[0]) : undefined;
  if (!draft) return {};
  return {
    title: `${draft.name} care enquiries | Review draft`,
    description: draft.focus,
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  };
}

export default async function LocalityReviewPage({ params }: Props) {
  if (!isLocalityReviewEnabled()) notFound();
  const segments = (await params).suburb ?? [];
  if (segments.length === 0) return <LocalityReviewIndex />;
  const draft = segments.length === 1 ? getLocalityReview(segments[0]) : undefined;
  if (!draft) notFound();
  const sources = LOCALITY_REVIEW_SOURCES.filter((source) => draft.sourceIds.includes(source.id));
  return <>
    <Section className="locality-hero"><Container>
      <nav className="review-breadcrumb" aria-label="Draft breadcrumb"><Link href="/locality-review">All five drafts</Link><span aria-hidden="true">/</span><span>{draft.name}</span></nav>
      <p className="review-eyebrow">{draft.eyebrow}</p>
      <Heading level="h1">In-home nursing &amp; care enquiries in {draft.name}</Heading>
      <p className="locality-intro">{draft.intro}</p>
      <p>{draft.local}</p>
      <div className="locality-actions flex"><a href="#prepare-enquiry">Prepare for a care conversation</a><a href="#review-notes">Gemma’s review notes</a></div>
    </Container></Section>
    <Section><Container className="review-reading-grid">
      <div className="review-sections">{draft.sections.map(([title, paragraphs], index) => <section key={title} aria-labelledby={`care-section-${index}`}>
        <span className="review-section-number" aria-hidden="true">0{index + 1}</span>
        <Heading level="h2" id={`care-section-${index}`}>{title}</Heading>
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>)}</div>
      <aside id="prepare-enquiry" className="review-preparation" aria-labelledby="prepare-heading">
        <p className="review-eyebrow">A useful first conversation</p>
        <Heading level="h2" id="prepare-heading">What to have ready</Heading>
        <ul className="review-checklist">{draft.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
        <p>Use a short description of the support requested. Ask how to share detailed records, participant identifiers and access instructions securely.</p>
        <p className="review-small">Preview only. This page has no enquiry form and does not confirm a service, appointment or start date.</p>
      </aside>
    </Container></Section>
    <Section className="locality-guides"><Container>
      <p className="review-eyebrow">Questions before you decide</p>
      <Heading level="h2">Care enquiries in {draft.name}</Heading>
      <div className="review-faq-list">{draft.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </Container></Section>
    <Section id="review-notes" className="review-notes"><Container>
      <p className="review-eyebrow">Not part of the proposed public copy</p>
      <Heading level="h2">For Gemma’s review</Heading>
      <p>Clinical and operational content must be reviewed before publication. A locality page does not verify credentials, funding eligibility, hospital relationships or current capacity.</p>
      <div className="review-notes-grid"><div><h3>Decisions still needed</h3><ul className="review-checklist">{draft.reviewQuestions.map((question) => <li key={question}>{question}</li>)}</ul></div>
        <div><h3>Search intent and scope</h3><p>{draft.focus}</p><p>This is an editorial intent hypothesis, not a measured search-query finding. Current query data was unavailable. The draft questions need review against permitted search evidence and real enquiry needs.</p><p>No service/locality page multiplication, guaranteed rankings or AI citation claims are proposed. The five drafts are separate from the public sitemap and suburb coverage data.</p></div></div>
      <details className="review-source-details"><summary>Sources, checked 12 November 2026</summary><ul>{sources.map((source) => <li key={source.id}><strong>{source.url ? <a href={source.url} rel="noreferrer">{source.label}</a> : source.label}</strong><p>{source.supports}</p><p className="review-small">{source.limits}</p></li>)}</ul><p>Practical questions about a home are not claims about every resident or property in the suburb. Programme information does not establish Gentle Care’s provider status.</p></details>
      <nav className="review-next-pages" aria-label="Other locality drafts">{LOCALITY_REVIEW_DRAFTS.map((item) => <Link key={item.slug} href={`/locality-review/${item.slug}`} aria-current={item.slug === draft.slug ? "page" : undefined}>{item.name}</Link>)}</nav>
      <p className="review-small">Existing site navigation remains available for context. Do not submit enquiries or patient information during this review.</p>
    </Container></Section>
  </>;
}
