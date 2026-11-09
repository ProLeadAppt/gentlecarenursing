import { ArrowRight } from "lucide-react";
import { CtaSection } from "@/components/sections/CtaSection";
import { ReferrerBlocksSection } from "@/components/sections/ReferrerBlocksSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTA_LINKS } from "@/lib/constants";
import { getBreadcrumbListSchema, getFaqSchema } from "@/lib/schema";

// Presentation only: all original referral information, consent conditions,
// FAQ/schema wording and destination links remain unchanged.
const REFERRER_FAQS = [
  {
    question: "How do I refer a client to Gentle Care Nursing Services?",
    answer:
      "You can use our Request Care form with the client’s details, care needs, and funding type, or contact us directly by phone or email.",
  },
  {
    question: "What information should I include in a referral?",
    answer:
      "Include the client’s contact details, primary diagnosis or needs, funding source (NDIS, DVA, aged care, private), urgency, and any relevant reports or discharge summaries. If something is missing, we’ll work with you to complete the picture.",
  },
  {
    question: "How quickly can services start after I refer?",
    answer:
      "Timeframes depend on location, funding, and the type of care required. For urgent referrals, we prioritise assessment and will let you know realistic start dates up front.",
  },
  {
    question: "Will I receive updates after care begins?",
    answer:
      "Yes. With the client’s consent, we provide clear updates at key points—after assessment, when care begins, and if there are significant changes. We’re happy to join case meetings or case conferences when needed.",
  },
] as const;

export function PremiumReferrers() {
  const faqSchema = getFaqSchema(
    REFERRER_FAQS.map((f) => ({ question: f.question, answer: f.answer }))
  );
  const breadcrumbSchema = getBreadcrumbListSchema([
    { name: "Home", item: "/" },
    { name: "For Coordinators & Referrers", item: "/referrers" },
  ]);
  // The visible "How to Refer" 3-step section below previously carried a
  // matching HowTo JSON-LD block. That was removed on 2026-07-28: Google
  // withdrew HowTo rich results in September 2023, so the markup produced
  // nothing. The visible steps are unchanged and remain the extractable asset.

  return (
    <div className="premium-care premium-referrers">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Intro */}
      <section className="care-section care-hero" aria-labelledby="referrers-title">
        <div className="care-wrap">
          <Breadcrumbs
            includeSchema={false}
            items={[
              { label: "Home", href: "/" },
              { label: "For Coordinators & Referrers" },
            ]}
            className="care-breadcrumbs"
          />
          <div className="care-hero-grid">
            <div>
              <h1 id="referrers-title">
                For Coordinators & Referrers
              </h1>
              <p className="care-lead">
                Whether you’re an NDIS support coordinator, plan manager, hospital
                discharge planner, GP, or other health professional, we make it easy
                to refer to Gentle Care Nursing Services and stay informed about your client’s care.
              </p>
            </div>
            <nav className="care-page-guide" aria-label="On this page">
              <a href="#how-to-refer"><span>How to Refer</span><ArrowRight aria-hidden="true" /></a>
              <a href="#referrer-professionals"><span>How We Work With Referrers</span><ArrowRight aria-hidden="true" /></a>
              <a href="#referrer-expectations"><span>What You Can Expect</span><ArrowRight aria-hidden="true" /></a>
              <a href="#referrer-fit"><span>When Gentle Care Is a Good Fit</span><ArrowRight aria-hidden="true" /></a>
              <a href="#referrer-questions"><span>Common Questions</span><ArrowRight aria-hidden="true" /></a>
            </nav>
          </div>
        </div>
      </section>

      {/* How to refer */}
      <section id="how-to-refer" className="care-section" aria-labelledby="how-to-refer-title">
        <div className="care-wrap">
          <div className="care-section-head">
            <h2 id="how-to-refer-title">How to Refer</h2>
            <p>Three simple steps to get your client safely connected with in-home nursing and care.</p>
          </div>
          <ol role="list" className="care-steps care-three-columns">
            <li>
              <h3>
                1. Share the Client’s Details
              </h3>
              <p className="referrer-copy">
                Submit our Request Care form or contact us directly with the client’s
                details, funding type, key needs, and any relevant reports or discharge
                summaries.
              </p>
            </li>
            <li>
              <h3>
                2. We Acknowledge and Assess
              </h3>
              <p className="referrer-copy">
                A member of our team will respond to you or the client with supportive
                guidance, next steps, and
                proposed timeframes for assessment and care commencement.
              </p>
            </li>
            <li>
              <h3>
                3. Care Begins and You Stay Informed
              </h3>
              <p className="referrer-copy">
                Once a care plan is agreed, we match the client with the right nurse or
                carer and begin visits. With consent, we keep you informed at key points
                so you always know how things are progressing.
              </p>
            </li>
          </ol>
          <div className="care-actions">
            <a
              href={CTA_LINKS.requestCare.href}
              className="care-button"
            >
              Use the Request Care Form
            </a>
          </div>
        </div>
      </section>

      {/* Referrer-specific information */}
      <div id="referrer-professionals" className="referrer-professionals">
        <ReferrerBlocksSection
          referrerTypes={[
            "ndis-support-coordinator",
            "plan-manager",
            "hospital-discharge-planner",
            "gp-primary-care",
          ]}
        />
      </div>

      {/* What you can expect */}
      <section id="referrer-expectations" className="care-section care-cream" aria-labelledby="referrer-expectations-title">
        <div className="care-wrap">
          <div className="care-section-head">
            <h2 id="referrer-expectations-title">What You Can Expect When You Refer</h2>
            <p>Clear communication, reliable follow-through, and clinically sound care for your clients.</p>
          </div>
          <div className="care-three-columns">
            <article className="care-approach">
              <h3>
                Clear Communication
              </h3>
              <p className="referrer-copy">
                We review referrals, outline realistic timeframes, and provide
                updates at agreed points.
              </p>
            </article>
            <article className="care-approach">
              <h3>
                Funding-Aware Support
              </h3>
              <p className="referrer-copy">
                We work within NDIS, DVA, aged care packages, and private funding. If there’s
                uncertainty, we help families understand what’s possible without jargon.
              </p>
            </article>
            <article className="care-approach">
              <h3>
                Clinical Quality and Safety
              </h3>
              <p className="referrer-copy">
                Our nurses and carers follow clear care plans, document what they do, and
                escalate appropriately to treating teams when things change.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* When we're a good fit */}
      <section id="referrer-fit" className="care-section" aria-labelledby="referrer-fit-title">
        <div className="care-wrap">
          <div className="care-section-head">
            <h2 id="referrer-fit-title">When Gentle Care Is a Good Fit</h2>
            <p>A few examples of the kinds of referrals we regularly support.</p>
          </div>
          <ul role="list" className="referrer-fit-list">
            <li>
              • NDIS participants needing stable, attentive in-home nursing or personal care,
              including complex support needs.
            </li>
            <li>
              • Veterans and war widows who require community nursing or post-hospital support
              under DVA.
            </li>
            <li>
              • Older Australians on Support at Home or CHSP who need extra nursing or daily
              living support to stay safely at home.
            </li>
            <li>
              • People coming home from hospital who will benefit from short-term, intensive
              nursing and personal care at home.
            </li>
            <li>
              • Clients with tracheostomies, PEG feeds, catheters, or complex wounds who can
              safely receive care at home with skilled clinical oversight.
            </li>
          </ul>
        </div>
      </section>

      {/* FAQs for referrers */}
      <section id="referrer-questions" className="care-section care-sage" aria-labelledby="referrer-questions-title">
        <div className="care-wrap">
          <div className="care-section-head">
            <h2 id="referrer-questions-title">Common Questions from Coordinators and Referrers</h2>
            <p>If you’re unsure about anything, we’d rather you ask. Here are some quick answers.</p>
          </div>
          <div className="referrer-questions">
            {REFERRER_FAQS.map((faq) => (
              <div key={faq.question}>
                <h3>
                  {faq.question}
                </h3>
                <p className="referrer-copy">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA to request care or contact */}
      <div className="care-existing-cta">
        <CtaSection
          title="Ready to Refer or Talk Through a Case?"
          description="Submit the Request Care form or contact us directly. We’ll help you work out the safest, most practical next step for your client."
          primaryCta={CTA_LINKS.requestCare}
          secondaryCta={CTA_LINKS.contact}
          variant="primary"
        />
      </div>
    </div>
  );
}
