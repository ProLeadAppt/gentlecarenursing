import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SimpleContactForm } from "@/components/forms/SimpleContactForm";
import { HOMEPAGE_HERO, WHO_WE_SUPPORT, OUR_SERVICES, WHY_CHOOSE } from "@/content/homepage";
import { SITE } from "@/lib/constants";

// Gemma's homepage brief: both hero actions lead to the existing inline form.
const REQUEST_CARE_CTA = { href: "#get-in-touch", label: "Request Care" } as const;
const REFERRAL_CTA = { href: "#get-in-touch", label: "Make a Referral" } as const;

// Existing CredentialsSection copy, retained verbatim. Source matching is not
// independent credential verification; the existing publication review remains.
const CREDENTIALS = [
  {
    title: "Registered NDIS provider",
    description: "We meet NDIS quality and safeguarding standards so participants and coordinators can refer with confidence.",
  },
  {
    title: "DVA Contracted Community Nursing Provider",
    description: "Contracted to deliver DVA Community Nursing services for eligible Veteran Card holders at home.",
  },
  {
    title: "Enquiry support",
    description: "Our team reviews your enquiry and contacts you with clear next steps.",
  },
] as const;

/**
 * Premium homepage candidate: one audience gateway, an editorial service index
 * and the unchanged live application form. Styles are scoped to premium-home;
 * shared navigation, Hero, dialogs, footer and form behavior remain untouched.
 */
export default function HomePageContent() {
  return (
    <div className="premium-home">
      <section className="premium-hero" aria-labelledby="home-title">
        <div className="premium-wrap premium-hero-grid">
          <div>
            <h1 id="home-title">
              <span>{HOMEPAGE_HERO.headlineSegments[0]}</span>
              <span className="premium-accent">{HOMEPAGE_HERO.headlineSegments[1]}</span>
            </h1>
            <p className="premium-hero-subtitle">{HOMEPAGE_HERO.subheadline}</p>
            <div className="premium-hero-actions">
              <a href={REQUEST_CARE_CTA.href} className="premium-button" data-analytics-action="request_care" data-analytics-location="hero">
                {REQUEST_CARE_CTA.label}<ArrowUpRight aria-hidden="true" />
              </a>
              <a href={REFERRAL_CTA.href} className="premium-button premium-button-secondary" data-analytics-action="make_referral" data-analytics-location="hero">
                {REFERRAL_CTA.label}<ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <p className="premium-hero-reassurance">We&apos;ll discuss your enquiry with you. No obligation.</p>
          </div>
          <figure className="premium-hero-visual">
            <div className="premium-image-rule" aria-hidden="true" />
            {/* Selected illustration, shown in full without cropping.
                Image provenance is recorded in docs/SELECTED_HOMEPAGE_HERO.md. */}
            <Image
              src={HOMEPAGE_HERO.heroImageSrc}
              alt={HOMEPAGE_HERO.heroImageAlt}
              width={1536}
              height={1024}
              sizes={HOMEPAGE_HERO.heroImageSizes}
              priority
              fetchPriority="high"
              className="premium-hero-image"
            />
            <figcaption>Care for the people you love</figcaption>
          </figure>
        </div>
      </section>

      <section className="premium-credentials" aria-labelledby="home-credentials-title">
        <div className="premium-wrap">
          <h2 id="home-credentials-title" className="sr-only">Why trust Gentle Care Nursing Services</h2>
          <div className="premium-credential-grid">
            {CREDENTIALS.map((item) => (
              <div className="premium-credential" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section" aria-labelledby="who-we-support">
        <div className="premium-wrap">
          <div className="premium-gateway-grid">
            <div className="premium-gateway-intro">
              <p className="premium-eyebrow">Who we support</p>
              <h2 id="who-we-support">Care for the people you love</h2>
              <p className="premium-intro">We work with families, participants, veterans, and health professionals across Sydney to deliver consistent, respectful in-home care.</p>
              <div className="premium-assist">
                <p>Not sure which page fits your situation?</p>
                <Link className="premium-text-link" href="/services">Services hub<ArrowRight aria-hidden="true" /></Link>
                <Link className="premium-text-link" href="/blog/choosing-the-right-home-care-provider">How to choose a provider<ArrowUpRight aria-hidden="true" /></Link>
              </div>
            </div>
            <div className="premium-route-grid">
              {WHO_WE_SUPPORT.items.map((item, index) => (
                <article className="premium-route" key={item.href}>
                  <div className="premium-route-top">
                    <span className="premium-number" aria-hidden="true">0{index + 1}</span>
                    <h3>{item.label}</h3>
                  </div>
                  <p>{item.description}</p>
                  <Link href={item.href} className="premium-text-link">
                    Learn more<span className="sr-only"> about {item.label}</span><ArrowUpRight aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
          <div className="premium-gateway-tail">
            <p>Personalised in-home nursing and support across Sydney</p>
            <div>
              <Link className="premium-text-link" href="/areas">Areas we serve<ArrowUpRight aria-hidden="true" /></Link>
              <Link className="premium-text-link" href="/faq">FAQ<ArrowUpRight aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section premium-services" aria-labelledby="our-services">
        <div className="premium-wrap">
          <div className="premium-section-head">
            <div><p className="premium-eyebrow">Our services</p><h2 id="our-services">What we do</h2></div>
            <p>{OUR_SERVICES.subtitle}</p>
          </div>
          <div className="premium-service-grid">
            {OUR_SERVICES.items.map((item, index) => (
              <article className="premium-service" key={item.href}>
                <span className="premium-number" aria-hidden="true">0{index + 1}</span>
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.description}</p>
                  <Link href={item.href} className="premium-text-link">
                    Read more<span className="sr-only"> about {item.label}</span><ArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section" aria-labelledby="why-choose">
        <div className="premium-wrap premium-approach-grid">
          <div>
            <p className="premium-eyebrow">Why Gentle Care</p>
            <h2 id="why-choose">{WHY_CHOOSE.title}</h2>
            <Image
              src="/images/homepage-hands-chris-f-33525563.jpg"
              alt="Two people holding hands."
              width={1000}
              height={667}
              sizes="(min-width: 62.5rem) 26rem, (min-width: 30rem) 26rem, calc(100vw - 2.25rem)"
              className="premium-detail-image"
            />
          </div>
          <ul className="premium-benefits">
            {WHY_CHOOSE.items.map((item) => (
              <li key={item}><span aria-hidden="true">+</span><span>{item}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="get-in-touch" className="premium-section premium-enquiry" aria-labelledby="get-in-touch-title">
        <div className="premium-wrap premium-contact-grid">
          <div>
            <p className="premium-eyebrow">Get in touch</p>
            <h2 id="get-in-touch-title">Let&apos;s talk about care</h2>
            <p className="premium-contact-intro">Tell us a little about what you need. We&apos;ll discuss your enquiry with you. No obligation.</p>
            {/* Retain actual source wording instead of publishing the concept's
                proposed three-step process before operational review. */}
            <div className="premium-contact-note">
              <h3>Enquiry support</h3>
              <p>{CREDENTIALS[2].description}</p>
            </div>
            <div className="premium-contact-note">
              <h3>Coordinators &amp; discharge planners</h3>
              <p>Support coordinators and discharge planners can contact us to discuss referral information, care needs and availability.</p>
              <Link className="premium-text-link" href="/referrers">For referrers<ArrowUpRight aria-hidden="true" /></Link>
            </div>
            <a href={SITE.phoneHref} className="premium-phone"><span>Phone</span>{SITE.phone}</a>
          </div>
          <div className="premium-form-shell">
            <SimpleContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
