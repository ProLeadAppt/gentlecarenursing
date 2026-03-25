import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";
import { GUIDES } from "@/content/guides";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata = createMetadata({
  title: "Care Guides",
  description:
    "Free in-home care guides for families, carers, and professionals. Expert advice on recovery, aged care, NDIS support, and more.",
});

const INTENT_LABELS: Record<string, string> = {
  "post-hospital": "Post-Hospital",
  dementia: "Dementia Care",
  wounds: "Clinical",
  stroke: "Rehabilitation",
  "carer-support": "Family Carers",
};

const INTENT_COLORS: Record<string, string> = {
  "post-hospital": "bg-pw-teal/10 text-pw-teal",
  dementia: "bg-pw-sage/10 text-pw-sage",
  wounds: "bg-primary/10 text-primary",
  stroke: "bg-pw-terracotta/10 text-pw-terracotta",
  "carer-support": "bg-pw-amber/10 text-pw-amber-700",
};

export default function GuidesPage() {
  return (
    <Section size="lg">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Care Guides" }]} />

        <div className="mt-8 max-w-2xl">
          <Heading level="h1" as="h1" className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Care Guides
          </Heading>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Expert guidance to help you understand your care options. Written by
            our clinical team for families, carers, and professionals.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group relative flex flex-col rounded-2xl border border-border/50 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 hover:border-border"
            >
              {/* Category badge */}
              <span
                className={`inline-flex self-start items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                  INTENT_COLORS[guide.intent] ?? "bg-muted text-muted-foreground"
                }`}
              >
                <BookOpen className="h-3 w-3" />
                {INTENT_LABELS[guide.intent] ?? guide.intent}
              </span>

              {/* Title */}
              <h2 className="mt-5 font-[family-name:var(--font-serif)] text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {guide.title}
              </h2>

              {/* Snippet */}
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                {guide.snippetAnswer}
              </p>

              {/* Read link */}
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
                Read guide
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
