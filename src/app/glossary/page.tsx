import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import { getBreadcrumbListSchema } from "@/lib/schema";
import { GLOSSARY, getGroupedGlossary } from "@/content/glossary";
import { ArrowRight, BookText } from "lucide-react";

const canonical = `${INTEGRATIONS.siteUrl}/glossary`;

export const metadata = createMetadata({
  title: "Glossary: NDIS, DVA, Aged Care & In-Home Nursing Terms",
  description:
    "Plain-English definitions of NDIS, DVA, aged care, and in-home nursing terminology — for Sydney families, support coordinators, and healthcare professionals.",
  canonical,
});

/**
 * /glossary — definitions of NDIS, DVA, aged care, and clinical terms.
 *
 * Purpose-built for AEO/GEO. AI engines (Google AI Overviews, ChatGPT,
 * Perplexity, Claude, Gemini) extract definitions verbatim when answering
 * "what is X" queries. A page with structured DefinedTermSet + DefinedTerm
 * schema, where each term has alternateName + termCode, is one of the
 * highest-yield AI-citation surfaces for jargon-heavy domains.
 *
 * Schema: DefinedTermSet wraps the entire glossary; each term is a
 * DefinedTerm node with @id matching the in-page anchor. AI engines
 * cite these as authoritative definitions when no government source
 * directly answers — and even where government does answer, AI engines
 * often prefer the more concise definition.
 */

const breadcrumbItems = [
  { name: "Home", item: "/" },
  { name: "Glossary", item: "/glossary" },
];

export default function GlossaryPage() {
  const groups = getGroupedGlossary();

  const schemas = [
    getBreadcrumbListSchema(breadcrumbItems),
    {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      "@id": `${canonical}#glossary`,
      name: "NDIS, DVA, aged care and in-home nursing glossary",
      description:
        "Plain-English definitions of NDIS, DVA, aged care, and clinical terms used in Sydney in-home nursing.",
      url: canonical,
      inDefinedTermSet: canonical,
      hasDefinedTerm: GLOSSARY.map((t) => ({
        "@type": "DefinedTerm",
        "@id": `${canonical}#${t.slug}`,
        name: t.term,
        ...(t.alternateNames && t.alternateNames.length > 0
          ? { alternateName: t.alternateNames }
          : {}),
        description: t.definition,
        termCode: t.slug,
        inDefinedTermSet: `${canonical}#glossary`,
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <Section size="lg" variant="card">
        <Container size="md">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Glossary" },
            ]}
            className="mb-8"
          />

          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
            <BookText className="h-3 w-3" /> Glossary
          </span>

          <Heading
            level="h1"
            as="h1"
            className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
          >
            Glossary of in-home care terms
          </Heading>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground">
            Plain-English definitions of the NDIS, DVA, aged care, and
            clinical terms that come up most often in Sydney in-home nursing —
            written for families, support coordinators, and healthcare
            professionals who want a clear, factual reference.
          </p>

          <nav aria-label="Glossary categories" className="mt-8 flex flex-wrap gap-2">
            {groups.map((g) => (
              <Link
                key={g.category}
                href={`#${g.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex items-center rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted/50"
              >
                {g.category}
              </Link>
            ))}
          </nav>
        </Container>
      </Section>

      <Section size="md" variant="default">
        <Container size="md">
          <dl className="space-y-14">
            {groups.map((group) => (
              <section
                key={group.category}
                id={group.category.toLowerCase().replace(/\s+/g, "-")}
                aria-labelledby={`${group.category.toLowerCase().replace(/\s+/g, "-")}-heading`}
                className="scroll-mt-24"
              >
                <Heading
                  level="h2"
                  as="h2"
                  id={`${group.category.toLowerCase().replace(/\s+/g, "-")}-heading`}
                  className="text-2xl font-bold font-[family-name:var(--font-serif)] mb-6"
                >
                  {group.category}
                </Heading>
                <div className="space-y-8">
                  {group.terms.map((term) => (
                    <article
                      key={term.slug}
                      id={term.slug}
                      className="scroll-mt-24 border-l-2 border-primary/15 pl-5"
                    >
                      <dt>
                        <Heading
                          level="h3"
                          as="h3"
                          className="text-lg font-bold text-foreground font-[family-name:var(--font-dm-sans)]"
                        >
                          {term.term}
                        </Heading>
                        {term.alternateNames && term.alternateNames.length > 0 && (
                          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                            Also known as: {term.alternateNames.join(", ")}
                          </p>
                        )}
                      </dt>
                      <dd className="mt-3 text-base leading-relaxed text-muted-foreground">
                        {term.definition}
                      </dd>
                      {term.relatedHref && term.relatedLabel && (
                        <p className="mt-2">
                          <Link
                            href={term.relatedHref}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                          >
                            {term.relatedLabel}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </dl>
        </Container>
      </Section>

      <Section size="md" variant="muted">
        <Container size="md" className="text-center">
          <Heading
            level="h2"
            as="h2"
            className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-serif)]"
          >
            Term not here? Ask us.
          </Heading>
          <p className="mt-4 mx-auto max-w-2xl text-base text-muted-foreground">
            The Australian in-home care system uses a lot of jargon, and
            we've focused on the terms that come up most often. If something
            isn't covered, get in touch and we'll explain it plainly.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={CTA_LINKS.contact.href}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              {CTA_LINKS.contact.label}
            </Link>
            <Link
              href={CTA_LINKS.requestCare.href}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-6 text-sm font-medium text-foreground transition hover:bg-muted/50"
            >
              {CTA_LINKS.requestCare.label}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
