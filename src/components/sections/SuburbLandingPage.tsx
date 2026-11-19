import "../../app/premium-suburb.css";
import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import {
  Activity,
  ArrowUpRight,
  Bandage,
  Check,
  Droplets,
  HandHeart,
  HeartPulse,
  Home,
  Pill,
  Stethoscope,
  Users,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { INTEGRATIONS } from "@/config/integrations";
import { SITE } from "@/lib/constants";
import { getBreadcrumbListSchema, getFaqSchema } from "@/lib/schema";
import type {
  LandingAction,
  LandingBlock,
  LandingChecklist,
  LandingDisclosure,
  LandingIcon,
  LandingImageBand,
  LandingPoint,
  LandingProcess,
  LandingSection,
  LandingStat,
  LandingTile,
  SuburbLandingPageData,
} from "@/content/suburb-landing-pages";

const ICONS: Record<LandingIcon, typeof Stethoscope> = {
  nursing: Stethoscope,
  complex: HeartPulse,
  community: Users,
  home: Home,
  wound: Bandage,
  medication: Pill,
  continence: Droplets,
  monitoring: Activity,
  personal: HandHeart,
  palliative: HeartPulse,
};

const TONES = ["", "suburb-section-sage", "suburb-section-cream"] as const;

/**
 * Editorial suburb page. Heading text stays as drafted.
 * Long explanations stay in the DOM inside disclosures.
 * Layout follows the homepage: cream hero, trust strip, airy sections, deep close.
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
  const laid = layoutSections(page.sections);
  const tones = laid.map((item, index) => {
    if (item.isLast) return "";
    const earlier = laid.slice(0, index).filter((entry) => !entry.isLast).length;
    return TONES[earlier % TONES.length];
  });

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
              <h1 id={`${page.slug}-title`}><HeroTitle title={page.h1} /></h1>
              {lead ? <p className="suburb-lead"><Rich text={lead} /></p> : null}
              {restIntro.map((paragraph) => (
                <p key={paragraph}><Rich text={paragraph} /></p>
              ))}
              <ActionRow actions={page.heroActions} />
              {page.introDetail ? <Disclosure {...page.introDetail} /> : null}
            </div>
            <figure className="suburb-figure suburb-hero-aside">
              <div className="suburb-rule" aria-hidden="true" />
              <Image
                src={page.image.src}
                alt={page.image.alt}
                width={page.image.width}
                height={page.image.height}
                priority
                sizes="(min-width: 62.5rem) 38rem, (min-width: 47.5rem) 46vw, calc(100vw - 2.5rem)"
              />
              <figcaption>Care for the people you love</figcaption>
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

      {laid.map((item, itemIndex) => {
        const tone = tones[itemIndex];
        const heading = item.kind === "story" ? item.narrative.heading : item.section.heading;
        const band = page.imageBand && (page.imageBand.after === heading || (item.kind === "story" && page.imageBand.after === item.aside.heading))
          ? <ImageBand key={`${heading}-band`} image={page.imageBand} />
          : null;
        const section = item.kind === "story" ? (
          <StorySection key={item.narrative.heading} narrative={item.narrative} aside={item.aside} index={item.index} tone={tone} />
        ) : (
          <PageSection key={item.section.heading} section={item.section} index={item.index} isLast={item.isLast} actions={page.closingActions} tone={tone} />
        );
        return <Fragment key={heading}>{section}{band}</Fragment>;
      })}

      <div className="suburb-mobile-bar">
        {page.heroActions.map((action) => (
          <ActionLink key={action.label} action={action} secondary={action.href.startsWith("/")} />
        ))}
      </div>
    </div>
  );
}

function isProseOnly(section: LandingSection): boolean {
  return !section.faqs && !section.subsections && !section.tiles && !section.process && (section.blocks ?? []).every((block) => block.type === "p") && (section.blocks ?? []).length > 1;
}

function layoutSections(sections: readonly LandingSection[]) {
  const items: Array<
    | { kind: "story"; narrative: LandingSection; aside: LandingSection; index: number; isLast: false }
    | { kind: "single"; section: LandingSection; index: number; isLast: boolean }
  > = [];
  const used = new Set<number>();
  for (let index = 0; index < sections.length; index += 1) {
    if (used.has(index)) continue;
    const section = sections[index];
    const glance = sections.findIndex((candidate, candidateIndex) =>
      candidateIndex > index && !used.has(candidateIndex) && /at a glance/i.test(candidate.heading),
    );
    if (isProseOnly(section) && glance !== -1 && !items.some((item) => item.kind === "story")) {
      used.add(glance);
      items.push({ kind: "story", narrative: section, aside: sections[glance], index, isLast: false });
      continue;
    }
    items.push({ kind: "single", section, index, isLast: index === sections.length - 1 });
  }
  return items;
}

function StorySection({
  narrative,
  aside,
  index,
  tone,
}: {
  narrative: LandingSection;
  aside: LandingSection;
  index: number;
  tone: string;
}) {
  return (
    <section className={`suburb-section ${tone}`.trim()} aria-labelledby={`suburb-section-${index}`}>
      <div className="suburb-wrap suburb-story">
        <div>
          <h2 id={`suburb-section-${index}`}>{narrative.heading}</h2>
          <ProseBlocks blocks={narrative.blocks ?? []} />
          <DisclosureList items={narrative.disclosures} />
        </div>
        <aside className="suburb-glance" aria-labelledby={`suburb-section-${index + 1}`}>
          <h2 id={`suburb-section-${index + 1}`}>{aside.heading}</h2>
          {aside.stats ? <StatList stats={aside.stats} source={aside.statSource} /> : null}
          <ProseBlocks blocks={aside.blocks ?? []} />
          <DisclosureList items={aside.disclosures} />
        </aside>
      </div>
    </section>
  );
}

function ProseBlocks({ blocks }: { blocks: readonly LandingBlock[] }) {
  return (
    <>
      {blocks.filter((block) => block.type === "p").map((block) => {
        const text = block.text ?? "";
        const pull = text.startsWith("*") && text.endsWith("*");
        return (
          <p key={text} className={pull ? "suburb-prose suburb-pull" : "suburb-prose"}>
            <Rich text={text} />
          </p>
        );
      })}
    </>
  );
}

function PageSection({
  section,
  index,
  isLast,
  actions,
  tone,
}: {
  section: LandingSection;
  index: number;
  isLast: boolean;
  actions: readonly LandingAction[];
  tone: string;
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
      <section className={`suburb-section suburb-faq ${tone}`.trim()} aria-labelledby={headingId}>
        <div className="suburb-wrap">
          <div className="suburb-section-head">
            <h2 id={headingId}>{section.heading}</h2>
          </div>
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

  if (section.process) {
    return (
      <section className={`suburb-section ${tone}`.trim()} aria-labelledby={headingId}>
        <div className="suburb-wrap">
          <SectionHead id={headingId} heading={section.heading} lead={section.lead} />
          <Process process={section.process} />
        </div>
      </section>
    );
  }

  return (
    <section className={`suburb-section ${tone}`.trim()} aria-labelledby={headingId}>
      <div className="suburb-wrap">
        <SectionHead id={headingId} heading={section.heading} lead={section.stats ? undefined : section.lead} />
        {section.stats ? (
          <div className="suburb-story">
            <div>
              {section.lead ? <p className="suburb-kicker"><Rich text={section.lead} /></p> : null}
              <SectionBody blocks={section.blocks ?? []} />
            </div>
            <aside className="suburb-glance" aria-label="At a glance">
              <StatList stats={section.stats} source={section.statSource} />
            </aside>
          </div>
        ) : null}
        {section.tiles ? <TileGrid tiles={section.tiles} /> : null}
        {section.points ? <PointGrid points={section.points} /> : null}
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
        ) : null}
        {!section.stats && !section.tiles && !section.points && !section.subsections ? <SectionBody blocks={section.blocks ?? []} /> : null}
        {!section.stats && (section.tiles || section.points) && section.blocks ? <SectionBody blocks={section.blocks} /> : null}
        <DisclosureList items={section.disclosures} />
      </div>
    </section>
  );
}

function SectionHead({ id, heading, lead }: { id: string; heading: string; lead?: string }) {
  return (
    <div className="suburb-section-head">
      <h2 id={id}>{heading}</h2>
      {lead ? <p className="suburb-kicker"><Rich text={lead} /></p> : null}
    </div>
  );
}

function Process({ process }: { process: LandingProcess }) {
  return (
    <>
      <ol className="suburb-process">
        {process.steps.map((step, index) => (
          <li key={step.title}>
            <div className="suburb-process-mark">
              <span className="suburb-process-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="suburb-process-copy">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {step.detail && step.detailSummary ? <Disclosure summary={step.detailSummary} text={step.detail} /> : null}
            </div>
          </li>
        ))}
      </ol>
      {process.checklist ? <Checklist checklist={process.checklist} /> : null}
      <ActionRow actions={[process.primary, process.secondary]} />
      {process.note ? <p className="suburb-process-note"><Rich text={process.note} /></p> : null}
      {process.detail ? <Disclosure {...process.detail} /> : null}
    </>
  );
}

function Checklist({ checklist }: { checklist: LandingChecklist }) {
  return (
    <div className="suburb-checklist">
      <h3>{checklist.title}</h3>
      <ul>
        {checklist.items.map((item) => (
          <li key={item}>
            <Check aria-hidden="true" />
            <span><Rich text={item} /></span>
          </li>
        ))}
      </ul>
      {checklist.detail && checklist.detailSummary ? <Disclosure summary={checklist.detailSummary} text={checklist.detail} /> : null}
    </div>
  );
}

function TileGrid({ tiles }: { tiles: readonly LandingTile[] }) {
  const columns = tiles.length === 6 ? "suburb-tile-grid suburb-tile-grid-3" : "suburb-tile-grid";
  return (
    <div className={columns}>
      {tiles.map((tile) => {
        const Icon = ICONS[tile.icon];
        return (
          <article className="suburb-tile" key={tile.title}>
            <span className="suburb-tile-icon" aria-hidden="true"><Icon /></span>
            <h3>{tile.title}</h3>
            {tile.line ? <p>{tile.line}</p> : null}
            {tile.links?.length ? (
              <p className="suburb-tile-links">
                {tile.links.map((link) => (
                  <Link key={link.href} className="suburb-text-link" href={link.href}>
                    {link.label}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                ))}
              </p>
            ) : null}
            {tile.detail && tile.detailSummary ? <Disclosure summary={tile.detailSummary} text={tile.detail} /> : null}
          </article>
        );
      })}
    </div>
  );
}

function PointGrid({ points }: { points: readonly LandingPoint[] }) {
  return (
    <ul className="suburb-card-grid">
      {points.map((point) => (
        <li className="suburb-card" key={point.title}>
          <h3>{point.title}</h3>
          <p><Rich text={point.line} /></p>
          {point.detail && point.detailSummary ? <Disclosure summary={point.detailSummary} text={point.detail} /> : null}
        </li>
      ))}
    </ul>
  );
}

function StatList({ stats, source }: { stats: readonly LandingStat[]; source?: string }) {
  return (
    <div className="suburb-stat-block">
      <ul className="suburb-stat-list">
        {stats.map((stat) => (
          <li key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </li>
        ))}
      </ul>
      {source ? <p className="suburb-stat-source"><Rich text={source} /></p> : null}
    </div>
  );
}

function DisclosureList({ items }: { items?: readonly LandingDisclosure[] }) {
  if (!items?.length) return null;
  return (
    <div className="suburb-more-list">
      {items.map((item) => <Disclosure key={item.summary} {...item} />)}
    </div>
  );
}

function Disclosure({ summary, text }: LandingDisclosure) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <details className="suburb-more">
      <summary>
        <span>{summary}</span>
        <span className="suburb-faq-mark" aria-hidden="true">+</span>
      </summary>
      <div className="suburb-more-body">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}><Rich text={paragraph} /></p>
        ))}
      </div>
    </details>
  );
}

function ImageBand({ image }: { image: LandingImageBand }) {
  return (
    <figure className="suburb-band">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="100vw"
      />
    </figure>
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
        <p key={block.text} className={pullClass(block.text)}><Rich text={block.text ?? ""} /></p>
      ))}
      {lists.map((block, index) => {
        if (block.type === "ol") {
          return (
            <ol key={index} className="suburb-steps">
              {block.items?.map((item) => (
                <li key={item}>
                  <div className="suburb-step-copy"><Rich text={item} /></div>
                </li>
              ))}
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
        <p key={block.text} className={pullClass(block.text)}><Rich text={block.text ?? ""} /></p>
      ))}
    </>
  );
}

function pullClass(text?: string): string {
  return text?.startsWith("*") && text.endsWith("*") ? "suburb-prose suburb-pull" : "suburb-prose";
}

function HeroTitle({ title }: { title: string }) {
  const splitAt = title.lastIndexOf(" in ");
  if (splitAt <= 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, splitAt)}
      <span className="suburb-accent">{title.slice(splitAt)}</span>
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
                {block.type === "ol" ? <div className="suburb-step-copy"><Rich text={item} /></div> : <Rich text={item} />}
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
