import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FormModalTrigger } from "@/components/ui/FormModalTrigger";
import { EvidencePanel } from "./EvidencePanel";
import { FaqAccordion } from "./FaqAccordion";
import { ServiceCtaWithModal } from "./ServiceCtaWithModal";
import {
  PERSONAL_CARE_PAGE, POST_HOSPITAL_PAGE, DAILY_LIVING_PAGE,
  COMMUNITY_PARTICIPATION_PAGE, COMPLEX_CARE_PAGE, HOSPITAL_AT_HOME_PAGE,
  OVERNIGHT_SUPPORT_PAGE, PALLIATIVE_CARE_PAGE,
} from "@/content/services";
import { CTA_LINKS, SITE_LAST_UPDATED } from "@/lib/constants";
import { getServiceSchema, getFaqSchema, getMedicalProcedureSchema } from "@/lib/schema";

// Explicit opt-in for existing standalone service routes. Funding and regional
// pages retain their shared layouts. Keep original data and interactions;
// this changes presentation, not service claims.
const pageData = {
  "personal-care": PERSONAL_CARE_PAGE,
  "post-hospital-care": POST_HOSPITAL_PAGE,
  "assistance-with-daily-living": DAILY_LIVING_PAGE,
  "community-participation": COMMUNITY_PARTICIPATION_PAGE,
  "complex-care": COMPLEX_CARE_PAGE,
  "hospital-at-home": HOSPITAL_AT_HOME_PAGE,
  "overnight-support": OVERNIGHT_SUPPORT_PAGE,
  "palliative-care": PALLIATIVE_CARE_PAGE,
} as const;

// Existing service-layout wording, retained verbatim.
const steps = [
  { title: "Send an enquiry or referral", description: "Tell us what support is needed, where the person lives, what funding is involved, and whether the matter is urgent. Our team will review your enquiry and contact you." },
  { title: "Clinical review and care match", description: "Our team reviews the request, confirms we’re the right fit, and identifies the right support model, frequency, and team for the job." },
  { title: "Care starts at home", description: "We confirm the plan, communication preferences, and start date, then begin support with a clear, person-centred routine." },
];

export function PremiumSupportCare({ service }: { service: keyof typeof pageData }) {
  const data = pageData[service];
  // Keep the same schema inputs and ordering as ServicePageLayout. No new
  // clinical reviewer, date, procedure, eligibility or service claim is added.
  const schemas = [
    getServiceSchema({
      name: data.title,
      description: data.intro,
      url: data.href ?? "",
      dateModified: data.reviewedAt ?? SITE_LAST_UPDATED,
      reviewedBy: data.reviewer,
      areaServed: [
        { "@type": "City", name: "Sydney", containedInPlace: { "@type": "State", name: "New South Wales" } },
        { "@type": "State", name: "New South Wales" },
        { "@type": "Country", name: "Australia" },
      ],
    }),
    ...(data.procedures && data.href ? data.procedures.map(procedure => getMedicalProcedureSchema({ ...procedure, pageUrl: data.href! })) : []),
    ...(data.faqs.length ? [getFaqSchema(data.faqs, { dateModified: data.reviewedAt ?? SITE_LAST_UPDATED })] : []),
  ];

  return (
    <div className="premium-care">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <section className="care-hero care-section" aria-labelledby={`${service}-title`}>
        <div className="care-wrap">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, data.breadcrumbParent ?? { label: "Services", href: "/services" }, { label: data.title }]} className="care-breadcrumbs" />
          <div className="care-hero-grid">
            <div>
              <p className="care-eyebrow">Personalised Clinical Care</p>
              <h1 id={`${service}-title`}>{data.title}</h1>
              <p className="care-lead">{data.intro}</p>
              <div className="care-actions">
                <FormModalTrigger formType="contact" size="xl" variant="primary" className="care-button">{CTA_LINKS.requestCare.label}<ArrowRight aria-hidden="true" /></FormModalTrigger>
                <FormModalTrigger formType="contact" size="xl" variant="outline" className="care-button care-button-secondary">{CTA_LINKS.contact.label}</FormModalTrigger>
              </div>
              <p className="care-updated">Last updated {data.reviewedAt ?? SITE_LAST_UPDATED}{data.reviewer ? ` · Reviewed by ${data.reviewer.name}${data.reviewer.role ? `, ${data.reviewer.role}` : ""}` : ""}</p>
            </div>
            <div className="care-summary">
              {data.snippetAnswer && <p className="care-summary-answer">{data.snippetAnswer}</p>}
              <nav className="care-page-guide" aria-label="On this page">
                <a href={`#${service}-support`}><span>{data.supportAvailable.title}</span><ArrowRight aria-hidden="true" /></a>
                <a href={`#${service}-who`}><span>{data.whoItHelps.title}</span><ArrowRight aria-hidden="true" /></a>
                <a href={`#${service}-steps`}><span>How it works</span><ArrowRight aria-hidden="true" /></a>
                <a href={`#${service}-questions`}><span>Common Questions</span><ArrowRight aria-hidden="true" /></a>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {data.evidence && <div className="care-evidence"><EvidencePanel {...data.evidence} /></div>}

      <section id={`${service}-support`} className="care-section care-sage" aria-labelledby={`${service}-support-title`}>
        <div className="care-wrap">
          <p className="care-eyebrow">Service Highlights</p>
          <div className="care-section-head"><h2 id={`${service}-support-title`}>{data.supportAvailable.title}</h2><p>{data.supportAvailable.description}</p></div>
          <div className="care-feature-grid">
            {data.supportAvailable.features.map((feature, index) => <article className="care-feature" key={feature.title}><span className="care-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}
          </div>
        </div>
      </section>

      <section id={`${service}-who`} className="care-section" aria-labelledby={`${service}-who-title`}>
        <div className="care-wrap care-split">
          <div><p className="care-eyebrow">Tailored Support</p><h2 id={`${service}-who-title`}>{data.whoItHelps.title}</h2><p className="care-intro">{data.whoItHelps.description}</p></div>
          <ul role="list" className="care-audiences">{data.whoItHelps.audiences.map(audience => <li key={audience}><span aria-hidden="true">✓</span>{audience}</li>)}</ul>
        </div>
      </section>

      <section id={`${service}-steps`} className="care-section care-cream" aria-labelledby={`${service}-steps-title`}>
        <div className="care-wrap">
          <p className="care-eyebrow">How it works</p>
          <div className="care-section-head"><h2 id={`${service}-steps-title`}>Three calm steps to getting support started</h2><p>We keep the setup process simple, clear, and human — so you know exactly what happens next.</p></div>
          <ol role="list" className="care-steps care-three-columns">{steps.map((step, index) => <li key={step.title}><span className="care-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
        </div>
      </section>

      <section className="care-section" aria-labelledby={`${service}-why-title`}>
        <div className="care-wrap">
          <p className="care-eyebrow">The Gentle Care Difference</p>
          <div className="care-section-head"><h2 id={`${service}-why-title`}>{data.whyChoose.title}</h2><p>{data.whyChoose.description}</p></div>
          <div className="care-three-columns">{data.whyChoose.reasons.map(reason => <article className="care-approach" key={reason.title}><h3>{reason.title}</h3><p>{reason.description}</p></article>)}</div>
        </div>
      </section>

      <section id={`${service}-questions`} className="care-section care-cream" aria-labelledby={`${service}-questions-title`}>
        <div className="care-wrap care-split">
          <div><h2 id={`${service}-questions-title`}>Common Questions</h2><Link className="care-text-link" href="/faq">View all FAQs<ArrowRight aria-hidden="true" /></Link></div>
          <FaqAccordion items={data.faqs} allowMultiple={false} className="care-faq" />
        </div>
      </section>

      {(data.relatedLinks?.length ?? 0) > 0 && <section className="care-section" aria-labelledby={`${service}-related-title`}>
        <div className="care-wrap">
          <div className="care-section-head"><h2 id={`${service}-related-title`}>Related pages that help families move faster</h2><p>Useful next steps, reading, and referral paths for people comparing options.</p></div>
          <div className="care-three-columns">{data.relatedLinks!.map(link => <article className="care-related" key={link.href}><h3>{link.title}</h3>{link.description && <p>{link.description}</p>}<Link className="care-text-link" href={link.href}>Explore {link.title}<ArrowRight aria-hidden="true" /></Link></article>)}</div>
        </div>
      </section>}

      <div className="care-existing-cta"><ServiceCtaWithModal title={data.cta.title} description={data.cta.description || "Our clinical lead is ready to guide you through a tailored care plan."} /></div>
    </div>
  );
}
