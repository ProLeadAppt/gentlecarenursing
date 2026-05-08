import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MapPin } from "lucide-react";
import type { AreaGroup } from "@/content/areas-served";

interface CompactAreasLineProps {
  /** Region groups (typically AREAS_SERVED). Only `region` names are displayed. */
  areas: readonly AreaGroup[];
  /** Optional href for the "see all areas" link. Defaults to /areas. */
  viewAllHref?: string;
}

/**
 * Single-line areas-served strip for the homepage.
 *
 * Replaces the full AreasWeServe section's card grid. Keeps the local-SEO
 * anchor (named Sydney regions visible in static HTML) but at a fraction
 * of the vertical space — the card grid was a quarter of the homepage.
 *
 * The full region detail still lives on /areas (linked here) and on the
 * 30 region-service pages, so AI engines and Google still get the deep
 * local content; the homepage just doesn't repeat it at length.
 */
export function CompactAreasLine({
  areas,
  viewAllHref = "/areas",
}: CompactAreasLineProps) {
  const regions = areas.map((a) => a.region);

  return (
    <section
      aria-label="Service areas across Sydney"
      className="border-y border-border/40 bg-muted/30 py-6"
    >
      <Container>
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-3">
          <MapPin
            className="h-4 w-4 text-primary/70 shrink-0"
            aria-hidden
            strokeWidth={2}
          />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Across Sydney</span>
            {" — "}
            {regions.join(", ")}
            {". "}
            <Link
              href={viewAllHref}
              className="font-semibold text-primary hover:underline"
            >
              View suburbs →
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
