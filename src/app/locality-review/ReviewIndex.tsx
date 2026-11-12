import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { LOCALITY_REVIEW_DRAFTS, isLocalityReviewEnabled } from "@/content/locality-review";

export default function LocalityReviewIndex() {
  if (!isLocalityReviewEnabled()) notFound();
  return <>
    <Section className="locality-hero"><Container>
      <p className="review-eyebrow">Five places. Five care conversations.</p>
      <Heading level="h1">Local care, with the details that matter.</Heading>
      <p className="locality-intro">Review the proposed pages for North Strathfield, Homebush, Concord West, Homebush West and Rhodes in the existing Gentle Care design.</p>
      <p>Each draft separates practical questions for families from the facts and service arrangements that still need Gemma’s confirmation. These pages are not part of the public suburb directory.</p>
    </Container></Section>
    <Section><Container>
      <Heading level="h2">Explore the five drafts</Heading>
      <div className="review-index-grid">
        {LOCALITY_REVIEW_DRAFTS.map((draft, index) => <Link key={draft.slug} href={`/locality-review/${draft.slug}`} className="review-index-card">
          <span className="review-card-number">0{index + 1}</span><h3>{draft.name}</h3><p>{draft.focus}</p><span>View draft <span aria-hidden="true">→</span></span>
        </Link>)}
      </div>
    </Container></Section>
    <Section className="locality-guides"><Container>
      <Heading level="h2">What to review</Heading>
      <ul className="review-checklist"><li>Clinical and operational wording, including which services and arrangements can actually be offered.</li><li>Whether the local information helps families make a useful enquiry, rather than repeating a regional page.</li><li>The proposed questions, which are editorial intent hypotheses. Current search-query data could not be fetched.</li></ul>
      <p>Local sources do not prove clinical scope or availability. Google indexing, rankings and AI citations are not guaranteed. Each page includes its sources and open review questions.</p>
      <p className="review-small">The ordinary site header and footer remain visible for context. Their links may lead to existing enquiry pages; no form submissions are part of this review.</p>
    </Container></Section>
  </>;
}
