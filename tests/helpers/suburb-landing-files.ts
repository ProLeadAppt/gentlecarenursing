/** Files added or edited for the North Strathfield and Concord West landing pages. */
export const SUBURB_LANDING_SOURCE_FILES = [
  "src/app/suburbs/concord-west/page.tsx",
  "src/app/suburbs/north-strathfield/page.tsx",
  "src/components/sections/InnerWestSuburbPageLinks.tsx",
  "src/components/sections/SuburbLandingPage.tsx",
  "src/content/suburb-landing-pages.ts",
  "src/app/premium-suburb.css",
] as const;

export const SUBURB_LANDING_TOUCHED_FILES = [
  "src/app/areas/[region]/page.tsx",
  "src/app/sitemap.ts",
  "src/app/suburbs/page.tsx",
] as const;

export function isSuburbLandingTouched(path: string): boolean {
  return (SUBURB_LANDING_TOUCHED_FILES as readonly string[]).includes(path);
}

/** Remove the two preview suburb links so frozen locality HTML can be compared. */
export function withoutInnerWestLandingLinks(html: string): string {
  return html.replace(
    /<li><a href="\/suburbs\/(?:north-strathfield|concord-west)">[\s\S]*?<\/a><\/li>/g,
    "",
  );
}
