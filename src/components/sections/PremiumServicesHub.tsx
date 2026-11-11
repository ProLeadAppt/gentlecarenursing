import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTA_LINKS } from "@/lib/constants";
import { SERVICES } from "@/content/services";
import { GMB_SERVICES } from "@/content/gmb-services";

const pathways = [
  { title: "NDIS support", href: "/ndis", body: "For participants, families, plan managers, and support coordinators needing in-home nursing, personal care, community access, or complex supports.", kicker: "For disability support plans" },
  { title: "DVA community nursing", href: "/dva", body: "For eligible veterans and families who need clinically necessary care at home, directly claimed through DVA.", kicker: "For veteran care and referrals" },
  { title: "Aged care at home", href: "/aged-care", body: "For older Australians who want help staying safe at home with nursing, personal care, and recovery support.", kicker: "For older adults and families" },
  { title: "Private nursing", href: "/private-nursing", body: "For people arranging fee-for-service care. Contact the team to confirm suitable support, costs and availability.", kicker: "For fee-for-service care" },
];
const approach = [
  { title: "Registered & Verified", desc: "Fully registered NDIS and DVA provider meeting all quality and safety benchmarks." },
  { title: "Experienced Care Team", desc: "Led by an experienced care professional with hands-on work across disability, aged care and in-home support." },
  { title: "Person-Centred", desc: "We match you with the right carer who aligns with your personality and health goals." },
];

export function PremiumServicesHub() {
  const clinical = SERVICES.find(service => service.slug === "nursing-care")!;
  return (
    <div className="premium-care">
      <section className="care-hero care-section" aria-labelledby="services-title">
        <div className="care-wrap">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Services" }]} className="care-breadcrumbs" />
          <div className="care-hero-grid">
            <div>
              <p className="care-eyebrow">What We Do</p>
              <h1 id="services-title">Personalised Care <span>at Home</span></h1>
              <p className="care-lead">Gentle Care provides personalised in-home care and support, focused on consistency, dignity, and giving every person the attention they deserve.</p>
            </div>
            <nav className="care-page-guide" aria-label="On this page">
              <p className="care-eyebrow">Our Services</p>
              <a href="#care-support"><span>Personalised Care &amp; Support</span><ArrowRight aria-hidden="true" /></a>
              <a href="#care-pathways"><span>Choose the right pathway</span><ArrowRight aria-hidden="true" /></a>
              <a href="#care-directory"><span>Care Service Directory</span><ArrowRight aria-hidden="true" /></a>
            </nav>
          </div>
        </div>
      </section>

      <section id="care-support" className="care-section care-sage" aria-labelledby="care-support-title">
        <div className="care-wrap">
          <div className="care-section-head">
            <h2 id="care-support-title">Personalised Care &amp; Support</h2>
            <p>Personalised in-home support focused on quality care, consistency and independence.</p>
          </div>
          <div className="care-service-selection">
            <article className="care-featured-service">
              <p className="care-eyebrow">01</p>
              <h3>{clinical.title}</h3>
              <p>{clinical.benefitLine}</p>
              <Link className="care-text-link" href={clinical.href}>View {clinical.title}<ArrowRight aria-hidden="true" /></Link>
            </article>
            <div className="care-service-list">
              {SERVICES.filter(service => service.slug !== "nursing-care").map((service, index) => (
                <article className="care-service-row" key={service.slug}>
                  <span className="care-number" aria-hidden="true">{String(index + 2).padStart(2, "0")}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.benefitLine}</p>
                    <Link className="care-text-link" href={service.href}>View {service.title}<ArrowRight aria-hidden="true" /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="care-pathways" className="care-section" aria-labelledby="care-pathways-title">
        <div className="care-wrap">
          <p className="care-eyebrow">Choose the right pathway</p>
          <div className="care-section-head">
            <h2 id="care-pathways-title">Start with the service that matches the funding and the need</h2>
            <p>Most families arrive with one of three jobs to be done: funded NDIS support, veteran care through DVA, or fast private help without waiting for approvals.</p>
          </div>
          <div className="care-pathways">
            {pathways.map((item, index) => (
              <article className="care-pathway" key={item.href}>
                <span className="care-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p className="care-kicker">{item.kicker}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <Link className="care-text-link" href={item.href}>Explore {item.title}<ArrowRight aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="care-section care-cream" aria-label="Our approach">
        <div className="care-wrap care-three-columns">
          {approach.map(item => (
            <article className="care-approach" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="care-directory" className="care-section" aria-labelledby="care-directory-title">
        <div className="care-wrap">
          <div className="care-section-head">
            <h2 id="care-directory-title">Care Service Directory</h2>
            <p>We offer {GMB_SERVICES.length}+ in-home care services across Sydney — from complex care needs to everyday support at home.</p>
          </div>
          <div className="care-directory">
            {GMB_SERVICES.map(service => (
              <article className="care-directory-item" key={service.name}>
                <h3>{service.name}</h3>
                {service.description && <p>{service.description}</p>}
                {service.href && <Link className="care-text-link" href={service.href}>Explore {service.name}<ArrowRight aria-hidden="true" /></Link>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="care-section care-contact" aria-labelledby="services-contact-title">
        <div className="care-wrap care-contact-grid">
          <h2 id="services-contact-title">Ready to Discuss Your Care?</h2>
          <div>
            <p>Whether you have an NDIS plan, DVA referral, or need private clinical support, contact us to discuss your needs.</p>
            <div className="care-actions">
              <Link className="care-button" href={CTA_LINKS.requestCare.href}>{CTA_LINKS.requestCare.label}<ArrowRight aria-hidden="true" /></Link>
              <Link className="care-button care-button-secondary" href={CTA_LINKS.contact.href}>{CTA_LINKS.contact.label}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
