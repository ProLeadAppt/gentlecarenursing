import { Container } from "@/components/layout/Container";
import { ShieldCheck, Clock3, MapPin, Banknote, Activity, BadgeCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * EvidencePanel — a compact "Quick facts" strip designed for AEO/GEO citation.
 *
 * AI engines (Google AI Overviews, Perplexity, ChatGPT, Bing Copilot) extract
 * short, self-contained factual passages when answering questions. A panel
 * with `<dt>` / `<dd>` pairs labelled with concrete categories (registration,
 * service area, response window, funding, scope) is one of the highest-yield
 * structures for being cited as a source.
 *
 * Rendered server-side (no "use client") so the facts ship in the static HTML
 * AI crawlers fetch — animation here would actively reduce extractability.
 */

export type EvidenceIconKey =
  | "registration"
  | "area"
  | "response"
  | "funding"
  | "scope"
  | "credential";

const ICONS: Record<EvidenceIconKey, LucideIcon> = {
  registration: ShieldCheck,
  area: MapPin,
  response: Clock3,
  funding: Banknote,
  scope: Activity,
  credential: BadgeCheck,
};

export interface EvidenceItem {
  /** Short label, e.g. "Registration" or "Service area". */
  label: string;
  /** The fact itself. Keep to one short sentence — this is the citable unit. */
  value: string;
  /** Visual icon hint. Defaults to "credential". */
  icon?: EvidenceIconKey;
}

interface EvidencePanelProps {
  /** Optional eyebrow above the heading. Defaults to "Quick facts". */
  eyebrow?: string;
  /** H2-level heading for the panel. Defaults to "Quick facts about Gentle Care". */
  heading?: string;
  /**
   * Optional one-sentence intro under the heading. Useful when the same panel
   * needs slightly different framing on different pages (e.g. "for NDIS
   * participants and coordinators" vs "for veterans and families").
   */
  intro?: string;
  items: readonly EvidenceItem[];
  /**
   * Background tone. "muted" is the default and works inside white sections.
   * Use "white" when the surrounding section is itself muted.
   */
  tone?: "muted" | "white";
  /**
   * Heading level. Use "h2" on standalone pages; pass "h3" if the panel sits
   * inside a section that already owns the H2.
   */
  headingLevel?: "h2" | "h3";
  /**
   * Visual density. "default" matches the original prominent treatment used
   * above the fold on service pages. "compact" tightens padding, drops one
   * size off the heading, and is intended for the bottom-of-homepage
   * placement where the panel exists primarily for AI-engine extraction
   * rather than as a hero element. Either way the same `<dl>` semantics
   * are preserved so the citable factual data is identical.
   */
  density?: "default" | "compact";
}

export function EvidencePanel({
  eyebrow = "Quick facts",
  heading = "Quick facts about Gentle Care",
  intro,
  items,
  tone = "muted",
  headingLevel = "h2",
  density = "default",
}: EvidencePanelProps) {
  const HeadingTag = headingLevel;
  const surfaceClass =
    tone === "muted"
      ? "bg-muted/40 border-border/60"
      : "bg-white border-border/70";
  const isCompact = density === "compact";
  const sectionPadding = isCompact ? "py-8 sm:py-10" : "py-12 sm:py-16";
  const cardPadding = isCompact ? "px-5 py-6 sm:px-7 sm:py-7" : "px-6 py-8 sm:px-10 sm:py-10";
  const headerSpacing = isCompact ? "mb-5" : "mb-6 sm:mb-8";
  const headingClass = isCompact
    ? "mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground font-[family-name:var(--font-serif)]"
    : "mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-[family-name:var(--font-serif)]";

  return (
    <section className={sectionPadding} aria-labelledby="evidence-panel-heading">
      <Container size="md">
        <div className={`rounded-3xl border ${surfaceClass} ${cardPadding}`}>
          <div className={headerSpacing}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
              {eyebrow}
            </p>
            <HeadingTag id="evidence-panel-heading" className={headingClass}>
              {heading}
            </HeadingTag>
            {intro && (
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {intro}
              </p>
            )}
          </div>

          <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {items.map((item) => {
              const Icon = ICONS[item.icon ?? "credential"];
              return (
                <div key={item.label} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary ring-1 ring-primary/15"
                    aria-hidden
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-foreground">
                      {item.value}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </Container>
    </section>
  );
}
