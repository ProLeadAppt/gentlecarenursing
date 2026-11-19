import "../../app/premium-suburb.css";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { INTEGRATIONS } from "@/config/integrations";
import { SITE } from "@/lib/constants";
import { getBreadcrumbListSchema, getFaqSchema } from "@/lib/schema";
import type {
  LandingAction,
  LandingBlock,
  LandingSection,
  SuburbLandingPageData,
} from "@/content/suburb-landing-pages";

/**
 * Editorial suburb page. The heading text stays exactly as drafted.
 * Layout, imagery and controls follow the homepage: cream hero, trust
 * strip, card grid, accordion and a deep closing band.
 */
export function SuburbLandingPage({ page }: { page: SuburbLandingPageData }) {
  const canonical = `${INTEGRATIONS.siteUrl}/suburbs/${page.slug}`;
  const faqs = page.sections.flatMap((section) => section.faqs ?? []);
  const schemas = [
    getBreadcrumbListSchema([
      { name: "Home", item: "/" },
      { name: "Suburbs", item: "/suburbs" },
      { name: page.region, item: page.regionHref },
      { name: page.name, item: `/suburbs/${page.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.serviceName,
      serviceType: page.serviceType,
      description: page.serviceDescription,
      url: canonical,
      provider: {
        "@id": `${INTEGRATIONS.siteUrl}/#organization`,
        name: SITE.name,
      },
      areaServed: {
        "@type": "Place",
        name: `${page.name} NSW ${page.postcode}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: page.name,
          addressRegion: "NSW",
          postalCode: page.postcode,
          addressCountry: "AU",
        },
      },
    },
    getFaqSchema(faqs.map((faq) => ({ question: faq.question, answer: plainText(faq.answer) }))),
  ];
  const [lead, ...restIntro] = page.intro;

  return (
    <div className="premium-suburb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />

      <section className="suburb-hero" aria-labelledby={`${page.slug}-title`}>
        <div className="suburb-wrap">
          <Breadcrumbs
            includeSchema={false}
            items={[
              { label: "Home", href: "/" },
              { label: "Suburbs", href: "/suburbs" },
              { label: page.region, href: page.regionHref },
              { label: page.name },
            ]}
            className="suburb-breadcrumbs"
          />
          <div className="suburb-hero-grid">
            <div className="suburb-hero-copy">
              <p className="suburb-eyebrow">{page.region}</p>
              <h1 id={`${page.slug}-title`}>{page.h1}</h1>
              {lead ? <p className="suburb-lead"><Rich text={lead} /></p> : null}
              {restIntro.map((paragraph) => (
                <p key={paragraph}><Rich text={paragraph} /></p>
              ))}
              <ActionRow actions={page.heroActions} />
            </div>
            <figure className="suburb-figure">
              <div className="suburb-rule" aria-hidden="true" />
              <Image
                src={page.image.src}
                alt={page.image.alt}
                width={page.image.width}
                height={page.image.height}
                priority
                sizes="(min-width: 62.5rem) 36rem, (min-width: 47.5rem) 46vw, calc(100vw - 2.5rem)"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="suburb-trust" aria-label="Recognition">
        <div className="suburb-wrap">
          <ul className="suburb-trust-grid">
            {page.trust.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {page.sections.map((section, index) => (
        <PageSection key={section.heading} section={section} index={index} isLast={index === page.sections.length - 1} actions={page.closingActions} />
      ))}

      <div className="suburb-mobile-bar">
        {page.heroActions.map((action) => (
          <ActionLink key={action.label} action={action} secondary={action.href.startsWith("/")} />
        ))}
      </div>
    </div>
  );
}

function PageSection({
  section,
  index,
  isLast,
  actions,
}: {
  section: LandingSection;
  index: number;
  isLast: boolean;
  actions: readonly LandingAction[];
}) {
  const headingId = `suburb-section-${index}`;
  if (isLast) {
    return (
      <section className="suburb-close" aria-labelledby={headingId}>
        <div className="suburb-wrap">
          <h2 id={headingId}>{section.heading}</h2>
          <Blocks blocks={section.blocks} />
          <ActionRow actions={actions} />
          <p className="suburb-note">
            <em>This service isn&apos;t for emergencies. In a medical emergency, call <a href="tel:000">000</a>.</em>
          </p>
        </div>
      </section>
    );
  }

  if (section.faqs) {
    return (
      <section className="suburb-section suburb-faq" aria-labelledby={headingId}>
        <div className="suburb-wrap">
          <h2 id={headingId}>{section.heading}</h2>
          {section.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                <h3>{faq.question}</h3>
                <span className="suburb-faq-mark" aria-hidden="true">+</span>
              </summary>
              <p><Rich text={faq.answer} /></p>
            </details>
          ))}
        </div>
      </section>
    );
  }

  const sage = Boolean(section.subsections);
  return (
    <section className={sage ? "suburb-section suburb-section-sage" : "suburb-section"} aria-labelledby={headingId}>
      <div className="suburb-wrap">
        <div className="suburb-section-head">
          <h2 id={headingId}>{section.heading}</h2>
        </div>
        {section.subsections ? (
          <div className="suburb-support-grid">
            {section.subsections.map((subsection, subsectionIndex) => (
              <article className="suburb-support" key={subsection.heading}>
                <span className="suburb-number" aria-hidden="true">{String(subsectionIndex + 1).padStart(2, "0")}</span>
                <h3>{subsection.heading}</h3>
                <Blocks blocks={subsection.blocks} />
              </article>
            ))}
          </div>
        ) : (
          <SectionBody blocks={section.blocks ?? []} />
        )}
      </div>
    </section>
  );
}

function SectionBody({ blocks }: { blocks: readonly LandingBlock[] }) {
  const lists = blocks.filter((block) => block.type !== "p");
  const paragraphs = blocks.filter((block) => block.type === "p");
  const linkParagraph = paragraphs.length === 1 && lists.length === 0 && (paragraphs[0].text?.match(/\]\(/g) ?? []).length >= 3;

  if (linkParagraph) {
    return (
      <div className="suburb-links">
        <Rich text={(paragraphs[0].text ?? "").replace(/\s*·\s*/g, "  ")} />
      </div>
    );
  }

  return (
    <>
      {paragraphs.filter((block) => blocks.indexOf(block) < (lists[0] ? blocks.indexOf(lists[0]) : blocks.length)).map((block) => (
        <p key={block.text} className="suburb-prose"><Rich text={block.text ?? ""} /></p>
      ))}
      {lists.map((block, index) => {
        if (block.type === "ol") {
          return (
            <ol key={index} className="suburb-steps">
              {block.items?.map((item) => <li key={item}><Rich text={item} /></li>)}
            </ol>
          );
        }
        return (
          <ul key={index} className="suburb-card-grid">
            {block.items?.map((item) => (
              <li key={item} className="suburb-card"><Rich text={item} /></li>
            ))}
          </ul>
        );
      })}
      {paragraphs.filter((block) => lists[0] && blocks.indexOf(block) > blocks.indexOf(lists[lists.length - 1])).map((block) => (
        <p key={block.text} className="suburb-prose"><Rich text={block.text ?? ""} /></p>
      ))}
    </>
  );
}

function ActionRow({ actions }: { actions: readonly LandingAction[] }) {
  return (
    <div className="suburb-actions">
      {actions.map((action, index) => (
        <ActionLink key={action.label} action={action} secondary={index > 0} />
      ))}
    </div>
  );
}

function ActionLink({ action, secondary }: { action: LandingAction; secondary?: boolean }) {
  const className = secondary ? "suburb-button suburb-button-secondary" : "suburb-button";
  const content = (
    <>
      {action.label}
      <ArrowUpRight aria-hidden="true" />
    </>
  );
  if (action.href.startsWith("/")) {
    return <Link className={className} href={action.href}>{content}</Link>;
  }
  return <a className={className} href={action.href}>{content}</a>;
}

function Blocks({ blocks }: { blocks?: readonly LandingBlock[] }) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return <p key={block.text ?? index} className="suburb-prose"><Rich text={block.text ?? ""} /></p>;
        }
        const ListTag = block.type === "ol" ? "ol" : "ul";
        return (
          <ListTag key={index} className={block.type === "ol" ? "suburb-steps" : "suburb-card-grid"}>
            {block.items?.map((item) => (
              <li key={item} className={block.type === "ul" ? "suburb-card" : undefined}>
                <Rich text={item} />
              </li>
            ))}
          </ListTag>
        );
      })}
    </>
  );
}

function Rich({ text }: { text: string }) {
  return <>{parseRich(text)}</>;
}

function parseRich(input: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let buffer = "";
  let index = 0;
  const flush = () => {
    if (!buffer) return;
    nodes.push(buffer);
    buffer = "";
  };

  while (index < input.length) {
    if (input.startsWith("**", index)) {
      const end = input.indexOf("**", index + 2);
      if (end !== -1) {
        flush();
        nodes.push(<strong key={index}>{parseRich(input.slice(index + 2, end))}</strong>);
        index = end + 2;
        continue;
      }
    }
    if (input[index] === "*" && input[index + 1] !== "*") {
      const end = input.indexOf("*", index + 1);
      if (end !== -1) {
        flush();
        nodes.push(<em key={index}>{parseRich(input.slice(index + 1, end))}</em>);
        index = end + 1;
        continue;
      }
    }
    if (input[index] === "[") {
      const match = /^\[([^\]]+)\]\(([^)]+)\)/.exec(input.slice(index));
      if (match) {
        flush();
        const [, label, href] = match;
        const children = parseRich(label);
        if (href.startsWith("/")) nodes.push(<Link key={index} href={href}>{children}</Link>);
        else nodes.push(<a key={index} href={href} {...(href.startsWith("http") ? { rel: "noopener noreferrer" } : {})}>{children}</a>);
        index += match[0].length;
        continue;
      }
    }
    buffer += input[index];
    index += 1;
  }
  flush();
  return nodes;
}

function plainText(value: string): string {
  return value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1").replace(/\*\*/g, "").replace(/\*/g, "");
}
