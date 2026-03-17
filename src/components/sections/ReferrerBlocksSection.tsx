import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { REFERRER_BLOCKS, type ReferrerType } from "@/content/referrer-blocks";
import Link from "next/link";

interface ReferrerBlocksSectionProps {
  referrerTypes: ReferrerType[];
  title?: string;
  subtitle?: string;
  variant?: "default" | "muted" | "card";
}

export function ReferrerBlocksSection({
  referrerTypes,
  title = "How We Work With Referrers",
  subtitle = "Clear processes and fast communication for professionals who trust us with their clients.",
  variant = "card",
}: ReferrerBlocksSectionProps) {
  const blocks = REFERRER_BLOCKS.filter((block) =>
    referrerTypes.includes(block.referrerType)
  );

  if (blocks.length === 0) return null;

  return (
    <Section variant={variant} size="lg">
      <Container size="md">
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {blocks.map((block) => (
            <article
              key={block.id}
              className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm"
              aria-label={block.title}
            >
              <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-foreground">
                {block.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {block.blurb}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                {block.bullets.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="mt-4">
                <Link
                  href={block.primaryCtaHref}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {block.primaryCtaLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

