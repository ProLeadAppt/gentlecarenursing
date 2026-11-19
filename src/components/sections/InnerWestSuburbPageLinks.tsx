import Link from "next/link";
import { SUBURB_LANDING_PAGES } from "@/content/suburb-landing-pages";

/**
 * Extra Inner West chips for suburb pages that are not in the shared
 * AREAS_SERVED list. That list also drives the homepage and every
 * service-region page, and Concord West coverage is still awaiting
 * client confirmation, so the names are added only on the Inner West
 * area page.
 */
export function InnerWestSuburbPageLinks({ regionSlug }: { regionSlug: string }) {
  if (regionSlug !== "inner-west") return null;

  return (
    <>
      {SUBURB_LANDING_PAGES.map((page) => (
        <li key={page.slug}>
          <Link href={`/suburbs/${page.slug}`}>
            <span className="inline-block rounded-full bg-primary/[0.03] px-5 py-2 text-[13px] font-bold text-primary/80 ring-1 ring-primary/10 transition-all hover:bg-primary hover:text-white hover:ring-primary">
              {page.name}
            </span>
          </Link>
        </li>
      ))}
    </>
  );
}
