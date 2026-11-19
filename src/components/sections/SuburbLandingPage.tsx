import "../../app/premium-locality.css";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MapPin } from "lucide-react";
import { INTEGRATIONS } from "@/config/integrations";
import { SITE } from "@/lib/constants";
import { getBreadcrumbListSchema, getFaqSchema } from "@/lib/schema";
import type {
  LandingAction,
  LandingBlock,
  SuburbLandingPageData,
} from "@/content/suburb-landing-pages";

/**
 * Long-form suburb page using the same locality layout, breadcrumbs and
 * Service vocabulary as the existing suburb template, with the draft's own
 * heading hierarchy.
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

  return (
    <div className="premium-locality premium-locality-suburb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <Section size="lg" variant="card" className="locality-hero">
        <Container size="md">
          <Breadcrumbs
            includeSchema={false}
            items={[
              { label: "Home", href: "/" },
              { label: "Suburbs", href: "/suburbs" },
              { label: page.region, href: page.regionHref },
              { label: page.name },
            ]}
            className="locality-breadcrumbs mb-8"
          />

          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
            <MapPin className="h-3 w-3" /> {page.region}
          </span>

          <Heading
            level="h1"
            as="h1"
            className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
          >
            {page.h1}
          </Heading>

          {page.intro.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "locality-intro mt-6 max-w-3xl text-lg leading-relaxed"
                  : "mt-4 max-w-3xl text-base leading-relaxed"
              }
            >
              <Rich text={paragraph} />
            </p>
          ))}

          <ActionRow actions={page.heroActions} />
        </Container>
      </Section>

      {page.sections.map((section) => {
        const isClosing = section.heading === page.sections[page.sections.length - 1]?.heading;
        return (
          <Section
            key={section.heading}
            size="md"
            variant={isClosing ? "default" : "default"}
            className={isClosing ? "locality-cta" : undefined}
          >
            <Container size="md">
              <Heading
                level="h2"
                as="h2"
                className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-serif)]"
              >
                {section.heading}
              </Heading>
              {section.blocks ? <Blocks blocks={section.blocks} /> : null}
              {section.subsections?.map((subsection) => (
                <div key={subsection.heading} className="mt-8 max-w-3xl">
                  <Heading level="h3" as="h3" className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-serif)]">
                    {subsection.heading}
                  </Heading>
                  <Blocks blocks={subsection.blocks} />
                </div>
              ))}
              {section.faqs?.map((faq) => (
                <div key={faq.question} className="mt-8 max-w-3xl">
                  <Heading level="h3" as="h3" className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-serif)]">
                    {faq.question}
                  </Heading>
                  <p className="mt-3 text-base leading-relaxed">
                    <Rich text={faq.answer} />
                  </p>
                </div>
              ))}
              {isClosing ? (
                <>
                  <ActionRow actions={page.closingActions} />
                  <p className="mt-6 max-w-3xl text-base leading-relaxed">
                    <em>This service isn&apos;t for emergencies. In a medical emergency, call <a href="tel:000">000</a>.</em>
                  </p>
                </>
              ) : null}
            </Container>
          </Section>
        );
      })}
    </div>
  );
}

function ActionRow({ actions }: { actions: readonly LandingAction[] }) {
  return (
    <div className="locality-actions">
      {actions.map((action) =>
        action.href.startsWith("/") ? (
          <Link key={action.href + action.label} href={action.href}>
            {action.label}
          </Link>
        ) : (
          <a key={action.href + action.label} href={action.href}>
            {action.label}
          </a>
        ),
      )}
    </div>
  );
}

function Blocks({ blocks }: { blocks: readonly LandingBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "ul" || block.type === "ol") {
          const ListTag = block.type === "ol" ? "ol" : "ul";
          return (
            <ListTag
              key={index}
              className={`mt-4 max-w-3xl space-y-3 pl-5 ${block.type === "ol" ? "list-decimal" : "list-disc"}`}
            >
              {block.items?.map((item) => (
                <li key={item} className="leading-relaxed">
                  <Rich text={item} />
                </li>
              ))}
            </ListTag>
          );
        }
        return (
          <p key={block.text} className="mt-4 max-w-3xl text-base leading-relaxed">
            <Rich text={block.text ?? ""} />
          </p>
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
        const label = match[1];
        const href = match[2];
        const children = parseRich(label);
        if (href.startsWith("/")) {
          nodes.push(
            <Link key={index} href={href}>
              {children}
            </Link>,
          );
        } else {
          nodes.push(
            <a key={index} href={href} {...(href.startsWith("http") ? { rel: "noopener noreferrer" } : {})}>
              {children}
            </a>,
          );
        }
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

/** FAQ schema text should match the visible answer, without markdown markers. */
function plainText(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "");
}
