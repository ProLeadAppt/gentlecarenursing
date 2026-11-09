import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FormModalTrigger } from "@/components/ui/FormModalTrigger";
import { EvidencePanel } from "./EvidencePanel";
import { FaqAccordion } from "./FaqAccordion";
import { ServiceCtaWithModal } from "./ServiceCtaWithModal";
import { NDIS_PAGE, DVA_PAGE, AGED_CARE_PAGE, PRIVATE_NURSING_PAGE } from "@/content/services";
import { CTA_LINKS, SITE_LAST_UPDATED } from "@/lib/constants";
import { getServiceSchema, getFaqSchema, getMedicalProcedureSchema } from "@/lib/schema";

// Explicit opt-in for existing funded and self-funded care pathways.
// Programme and private-care wording is retained, not newly verified.
// Keep funding qualifications with their claims and the original section order.
const pageData = {
  ndis: NDIS_PAGE,
  dva: DVA_PAGE,
  "aged-care": AGED_CARE_PAGE,
  "private-nursing": PRIVATE_NURSING_PAGE,
} as const;

// Original ServicePageLayout process wording, without new promises or timings.
const steps = [
  { title: "Send an enquiry or referral", description: "Tell us what support is needed, where the person lives, what funding is involved, and whether the matter is urgent. Our team will review your enquiry and contact you." },
  { title: "Clinical review and care match", description: "Our team reviews the request, confirms we’re the right fit, and identifies the right support model, frequency, and team for the job." },
  { title: "Care starts at home", description: "We confirm the plan, communication preferences, and start date, then begin support with a clear, person-centred routine." },
];

export function PremiumFundingCare({ pathway }: { pathway: keyof typeof pageData }) {
  const data = pageData[pathway];
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
    <div className="premium-care premium-funding">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <section className="care-hero care-section" aria-labelledby={`${pathway}-title`}>
        <div className="care-wrap">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, data.breadcrumbParent ?? { label: "Services", href: "/services" }, { label: data.title }]} className="care-breadcrumbs" />
          <div className="care-hero-grid">
            <div>
              <p className="care-eyebrow">Personalised Clinical Care</p>
              <h1 id={`${pathway}-title`}>{data.title}</h1>
              {data.snippetAnswer && <p className="funding-answer">{data.snippetAnswer}</p>}
              <p className="care-lead">{data.intro}</p>
              <p className="care-updated">Last updated {data.reviewedAt ?? SITE_LAST_UPDATED}{data.reviewer ? ` · Reviewed by ${data.reviewer.name}${data.reviewer.role ? `, ${data.reviewer.role}` : ""}` : ""}</p>
              <div className="care-actions">
                <FormModalTrigger formType="contact" size="xl" variant="primary" className="care-button">{CTA_LINKS.requestCare.label}<ArrowRight aria-hidden="true" /></FormModalTrigger>
                <FormModalTrigger formType="contact" size="xl" variant="outline" className="care-button care-button-secondary">{CTA_LINKS.contact.label}</FormModalTrigger>
              </div>
            </div>
            <div className="funding-guide">
              {data.image && <figure className="funding-image">
                <div className="funding-image-frame">
                  <Image src={data.image.src} alt={data.image.alt} fill className="object-cover" sizes="(max-width: 759px) calc(100vw - 40px), (max-width: 999px) 40vw, (max-width: 1440px) 36vw, 480px" />
                </div>
                {data.image.caption && <figcaption>{data.image.caption}</figcaption>}
              </figure>}
              <nav className="care-page-guide" aria-label="On this page">
                {data.evidence && <a href={`#${pathway}-facts`}><span>Quick facts</span><ArrowRight aria-hidden="true" /></a>}
                <a href={`#${pathway}-steps`}><span>How it works</span><ArrowRight aria-hidden="true" /></a>
                <a href={`#${pathway}-who`}><span>{data.whoItHelps.title}</span><ArrowRight aria-hidden="true" /></a>
                <a href={`#${pathway}-support`}><span>{data.supportAvailable.title}</span><ArrowRight aria-hidden="true" /></a>
                <a href={`#${pathway}-questions`}><span>Common Questions</span><ArrowRight aria-hidden="true" /></a>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {data.evidence && <div id={`${pathway}-facts`} className="care-evidence"><EvidencePanel {...data.evidence} /></div>}

      <section id={`${pathway}-steps`} className="care-section care-cream" aria-labelledby={`${pathway}-steps-title`}>
        <div className="care-wrap">
          <p className="care-eyebrow">How it works</p>
          <div className="care-section-head"><h2 id={`${pathway}-steps-title`}>Three calm steps to getting support started</h2><p>We keep the setup process simple, clear, and human — so you know exactly what happens next.</p></div>
          <ol role="list" className="care-steps care-three-columns">{steps.map((step, index) => <li key={step.title}><span className="care-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
        </div>
      </section>

      <section id={`${pathway}-who`} className="care-section" aria-labelledby={`${pathway}-who-title`}>
        <div className="care-wrap care-split">
          <div><p className="care-eyebrow">Tailored Support</p><h2 id={`${pathway}-who-title`}>{data.whoItHelps.title}</h2><p className="care-intro">{data.whoItHelps.description}</p></div>
          <ul role="list" className="care-audiences">{data.whoItHelps.audiences.map(audience => <li key={audience}><span aria-hidden="true">✓</span>{audience}</li>)}</ul>
        </div>
      </section>

      <section id={`${pathway}-support`} className="care-section care-sage" aria-labelledby={`${pathway}-support-title`}>
        <div className="care-wrap">
          <p className="care-eyebrow">Service Highlights</p>
          <div className="care-section-head"><h2 id={`${pathway}-support-title`}>{data.supportAvailable.title}</h2><p>{data.supportAvailable.description}</p></div>
          <div className="care-feature-grid">{data.supportAvailable.features.map((feature, index) => <article className="care-feature" key={feature.title}><span className="care-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
        </div>
      </section>

      {(data.relatedLinks?.length ?? 0) > 0 && <section className="care-section" aria-labelledby={`${pathway}-related-title`}>
        <div className="care-wrap">
          <div className="care-section-head"><h2 id={`${pathway}-related-title`}>Related pages that help families move faster</h2><p>Useful next steps, reading, and referral paths for people comparing options.</p></div>
          <div className="care-three-columns">{data.relatedLinks!.map(link => <article className="care-related" key={link.href}><h3>{link.title}</h3>{link.description && <p>{link.description}</p>}<Link className="care-text-link" href={link.href}>Explore {link.title}<ArrowRight aria-hidden="true" /></Link></article>)}</div>
        </div>
      </section>}

      <section className="care-section care-cream" aria-labelledby={`${pathway}-why-title`}>
        <div className="care-wrap">
          <p className="care-eyebrow">The Gentle Care Difference</p>
          <div className="care-section-head"><h2 id={`${pathway}-why-title`}>{data.whyChoose.title}</h2><p>{data.whyChoose.description}</p></div>
          <div className="care-three-columns">{data.whyChoose.reasons.map(reason => <article className="care-approach" key={reason.title}><h3>{reason.title}</h3><p>{reason.description}</p></article>)}</div>
        </div>
      </section>

      <section id={`${pathway}-questions`} className="care-section" aria-labelledby={`${pathway}-questions-title`}>
        <div className="care-wrap care-split">
          <div><h2 id={`${pathway}-questions-title`}>Common Questions</h2><Link className="care-text-link" href="/faq">View all FAQs<ArrowRight aria-hidden="true" /></Link></div>
          <FaqAccordion items={data.faqs} allowMultiple={false} className="care-faq" />
        </div>
      </section>

      <div className="care-existing-cta"><ServiceCtaWithModal title={data.cta.title} description={data.cta.description || "Our clinical lead is ready to guide you through a tailored care plan."} /></div>
    </div>
  );
}
