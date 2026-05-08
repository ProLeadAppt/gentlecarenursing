import type { ComparisonRow } from "@/content/compare-registered-vs-unregistered";

interface ComparisonTableProps {
  /** Header for the left column (typically "Registered NDIS Provider"). */
  leftHeader: string;
  /** Header for the right column (typically "Non-Registered NDIS Provider"). */
  rightHeader: string;
  rows: readonly ComparisonRow[];
  /** Optional caption for the table. Read by screen readers + extracted by some AI engines. */
  caption?: string;
}

/**
 * Side-by-side comparison rendered as a real `<table>` (not divs).
 *
 * AI engines (Google AI Overviews, Perplexity, ChatGPT, Bing Copilot) extract
 * tabular data far more reliably from semantic `<table>` markup than from
 * div-based grids styled to look like tables. The criterion-by-criterion
 * structure with `<th scope="row">` is the format that gets cited as a
 * direct answer to "what's the difference between X and Y" queries.
 *
 * Server-rendered (no `"use client"`) so the table content is in the static
 * HTML AI crawlers fetch.
 */
export function ComparisonTable({
  leftHeader,
  rightHeader,
  rows,
  caption,
}: ComparisonTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          {caption && (
            <caption className="px-6 pt-5 text-left text-sm text-muted-foreground">
              {caption}
            </caption>
          )}
          <thead className="bg-muted/50">
            <tr>
              <th
                scope="col"
                className="border-b border-border/60 px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground sm:px-6"
              >
                Criterion
              </th>
              <th
                scope="col"
                className="border-b border-border/60 px-4 py-4 text-sm font-bold text-foreground sm:px-6"
              >
                {leftHeader}
              </th>
              <th
                scope="col"
                className="border-b border-border/60 px-4 py-4 text-sm font-bold text-foreground sm:px-6"
              >
                {rightHeader}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.criterion}
                className="border-b border-border/40 align-top last:border-b-0 even:bg-muted/20"
              >
                <th
                  scope="row"
                  className="px-4 py-5 text-sm font-bold text-foreground sm:px-6"
                >
                  {row.criterion}
                  {row.note && (
                    <p className="mt-2 text-xs font-normal leading-relaxed text-muted-foreground">
                      {row.note}
                    </p>
                  )}
                </th>
                <td className="px-4 py-5 text-sm leading-relaxed text-muted-foreground sm:px-6">
                  {row.registered}
                </td>
                <td className="px-4 py-5 text-sm leading-relaxed text-muted-foreground sm:px-6">
                  {row.nonRegistered}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
