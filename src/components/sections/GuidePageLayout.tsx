import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { CTA_LINKS } from "@/lib/constants";
import { Guide } from "@/content/guides";
import Link from "next/link";

interface GuidePageLayoutProps {
  guide: Guide;
}

export function GuidePageLayout({ guide }: GuidePageLayoutProps) {
  return (
    <>
      <Section size="lg" variant="card">
        <Container size="md">
          <SectionHeader title={guide.title} subtitle={guide.snippetAnswer} size="lg" />
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground">
            This short guide explains what to expect and how Gentle Care Nursing can support you at home. It does not replace advice from your doctor or treating team.
          </p>
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

