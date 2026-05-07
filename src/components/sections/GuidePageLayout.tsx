import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { CTA_LINKS } from "@/lib/constants";
import { Guide, GUIDE_ABOUT_ENTITIES } from "@/content/guides";
import { getMedicalGuideSchema, getBreadcrumbListSchema } from "@/lib/schema";
import Link from "next/link";

interface GuidePageLayoutProps {
  guide: Guide;
}

function formatReviewedDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" });
}

export function GuidePageLayout({ guide }: GuidePageLayoutProps) {
  const schemas = [
    ...getMedicalGuideSchema({
      title: guide.title,
      snippetAnswer: guide.snippetAnswer,
      slug: guide.slug,
      publishedAt: guide.publishedAt,
      reviewedAt: guide.reviewedAt,
      reviewer: guide.reviewer,
      about: GUIDE_ABOUT_ENTITIES[guide.id],
    }),
    getBreadcrumbListSchema([
      { name: "Home", item: "/" },
      { name: "Guides", item: "/guides" },
      { name: guide.title, item: `/guides/${guide.slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <Section size="lg" variant="card">
        <Container size="md">
          <SectionHeader title={guide.title} subtitle={guide.snippetAnswer} size="lg" />
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground">
            This short guide explains what to expect and how Gentle Care Nursing Services can support you at home. It does not replace advice from your doctor or treating team.
          </p>
          {guide.reviewedAt && (
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted-foreground">
              Last clinically reviewed: {formatReviewedDate(guide.reviewedAt)}
              {guide.reviewer && (
                <>
                  {" "}by {guide.reviewer.name}
                  {guide.reviewer.role ? `, ${guide.reviewer.role}` : ""}
                </>
              )}
              .
            </p>
          )}
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="mx-auto max-w-2xl space-y-8">
            {guide.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2
                  id={section.id}
                  className="font-[family-name:var(--font-dm-sans)] text-xl font-semibold text-foreground"
                >
                  {section.heading}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {section.body}
                </p>
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="muted">
        <Container size="md">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <h2 className="font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-foreground">
              Next steps if this sounds like you
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              If this guide feels close to your situation, the best next step is to tell us a little about
              what&apos;s happening so we can talk through safe, practical options for care at home.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={guide.cta.href}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                {guide.cta.label}
              </Link>
              <Link
                href={CTA_LINKS.requestCare.href}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-6 text-sm font-medium text-foreground transition hover:bg-muted/50"
              >
                {CTA_LINKS.requestCare.label}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

