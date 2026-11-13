import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocalityReviewEnabled, LOCALITY_REVIEW_APPROVAL_NOTE } from "@/content/locality-review";
import "../premium-locality.css";
import "./review.css";

export const metadata: Metadata = {
  title: "Local care pages | Unpublished review",
  description: "Five unpublished locality drafts for clinical, operational and editorial review.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function LocalityReviewLayout({ children }: { children: React.ReactNode }) {
  if (!isLocalityReviewEnabled()) notFound();
  return <div className="premium-locality locality-review-shell">
    <aside className="review-banner" aria-label="Draft status">
      <div><strong>Unpublished review preview</strong><span>{LOCALITY_REVIEW_APPROVAL_NOTE}</span><span>Not approved for publication. No bookings or enquiries are taken on these draft pages.</span></div>
    </aside>
    {children}
  </div>;
}
