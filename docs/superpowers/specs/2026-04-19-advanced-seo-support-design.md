# Advanced SEO Support — Design

**Date:** 2026-04-19
**Status:** Approved — ready for implementation plan
**Scope:** Close seven SEO / AI-crawler / social-preview gaps identified in an audit of the existing Gentle Care Nursing site without restructuring what already works.

---

## 1. Background

The site is a Next.js 16 App Router project with Tailwind v4. Significant SEO scaffolding already exists:

- Per-route `metadata` exports on every page except [src/app/blog/page.tsx](../../../src/app/blog/page.tsx).
- A unified [createMetadata](../../../src/lib/metadata.ts) helper that merges defaults into OpenGraph and Twitter.
- JSON-LD helpers in [src/lib/schema.ts](../../../src/lib/schema.ts): `Organization`, `LocalBusiness` (`MedicalBusiness`), `WebSite`, `AggregateRating`, plus `Article`, `Service`, `FAQ`, `HowTo`, `Breadcrumb`, `AreaPage`.
- [src/app/sitemap.ts](../../../src/app/sitemap.ts) covers static and dynamic routes (areas, guides, blog).
- [src/app/robots.ts](../../../src/app/robots.ts) allows all, disallows `/api/`, references the sitemap.
- [public/llms.txt](../../../public/llms.txt) exists (35 lines).

### Audit gaps

1. No dedicated OG image asset — every page falls back to `/images/hero-hands.webp`, which is not a proper 1200×630 social card.
2. No per-page OG images for the money pages (Home, NDIS, DVA, Aged Care, Private Nursing, Services, Referrers).
3. [src/app/blog/page.tsx](../../../src/app/blog/page.tsx) is `"use client"` and cannot export `metadata`.
4. No canonical URLs set via `alternates.canonical` on leaf pages (the helper supports it; pages do not pass it).
5. [public/llms.txt](../../../public/llms.txt) is thin — missing per-service detail, areas list, FAQ pointers, schema hints.
6. No verification meta tags (Google Search Console, Bing Webmaster) wired into the layout.
7. No dynamic OG images for the blog-post and area-page routes, which grow over time.

---

## 2. Objectives

Close all seven gaps in a single PR, verified locally and against external validators, with no regressions in existing metadata or schema output.

### In scope

- A branded default OG image (1200×630) replacing the `hero-hands.webp` fallback.
- Hand-made static OG cards for the marketing money pages (Home, NDIS, DVA, Aged Care, Private Nursing, Services, Referrers).
- Dynamic `opengraph-image.tsx` route handlers for blog posts and area pages.
- Convert `src/app/blog/page.tsx` to a server component that exports `metadata`, with filter interactivity split into a client child component.
- Canonical URLs on every leaf page that exports metadata, via `alternates.canonical`.
- Expanded `public/llms.txt` with per-service detail, areas, FAQ pointers, and a brief structured-data hint.
- Env-driven verification meta tags: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`, injected into `defaultMetadata` and rendered only when set.

### Out of scope

- Redesigning existing JSON-LD schemas.
- Changing page content / copy beyond what is needed for metadata.
- Adding new analytics tooling.
- Modifying `robots.ts` or `sitemap.ts` — both are adequate.

---

## 3. Architecture

### Directory additions

```
public/images/og/
  default.png            # 1200x630 sitewide fallback
  home.png
  ndis.png
  dva.png
  aged-care.png
  private-nursing.png
  services.png
  referrers.png
```

### New files

- `src/lib/seo-verification.ts` — reads `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION` and returns a value shaped for `Metadata["verification"]`, or `undefined` when neither is set.
- `src/app/blog/[slug]/opengraph-image.tsx` — dynamic OG image per blog post (title, category, brand lockup).
- `src/app/areas/[region]/opengraph-image.tsx` — dynamic OG image per area page (region name, brand lockup).
- `src/components/sections/BlogIndex.tsx` — the existing client-side filter UI, moved out of the server page.
- `tools/generate-og-cards.ts` — one-off Node script that renders the static money-page PNGs via `ImageResponse` from a small config array. Not wired into `npm run build`; run manually, commit output.

### Modified files

- `src/lib/metadata.ts` — switch `defaultMetadata.openGraph.images` to `/images/og/default.png`; inject `verification` from the helper.
- `src/app/layout.tsx` — replace the hardcoded `hero-hands.webp` OG default (both `openGraph.images` and the `twitter.images` fallback) with `/images/og/default.png`.
- `src/app/blog/page.tsx` — convert to a server component that exports `metadata` (via `createMetadata`) and renders `<BlogIndex />`.
- Money-page `page.tsx` files (Home, NDIS, DVA, Aged Care, Private Nursing, Services, Referrers) — each `createMetadata` call gains its own `openGraph.images` entry and `canonical`.
- All remaining leaf pages that already export metadata — add `canonical: "/<route>"` to their `createMetadata` calls. Routes covered: `about`, `aged-care`, `areas`, `areas/[region]`, `blog`, `blog/[slug]`, `care-finder`, `contact`, `dva`, `faq`, `guides`, `guides/[slug]`, `ndis`, `privacy`, `private-nursing`, `referral`, `referrers`, `services` (index plus all ten sub-routes), `terms`.
- `public/llms.txt` — expanded per §5.

### Key design decisions

- **Static OG cards ship as committed PNGs.** The money pages point at flat files in `public/images/og/`. No runtime cost, no edge dependency, trivial to inspect and swap.
- **Dynamic OG images use Next's file convention** (`opengraph-image.tsx`). Next auto-wires the `<meta property="og:image">` for the route (and child routes), so page metadata should not set `openGraph.images` for routes that have a co-located `opengraph-image.tsx`.
- **Canonicals** derive from `NEXT_PUBLIC_SITE_URL` via the existing `createMetadata` helper — callers pass the path, the helper renders the absolute URL.
- **Verification tags** are opt-in via env vars. If neither env var is set, nothing renders — zero HTML noise in dev.

---

## 4. Metadata, Canonicals, Verification

### `createMetadata` usage

No signature change. Every money page adopts the full shape:

```ts
createMetadata({
  title: "NDIS Nursing & Care",
  description: "...",
  canonical: "/ndis",
  openGraph: {
    images: [{ url: "/images/og/ndis.png", width: 1200, height: 630, alt: "..." }],
  },
})
```

Non-money pages pass only `canonical` (they inherit the default OG image):

```ts
createMetadata({
  title: "Privacy Policy",
  description: "...",
  canonical: "/privacy",
})
```

Dynamic routes with co-located `opengraph-image.tsx` (blog slug, area region) do **not** set `openGraph.images` — Next injects the dynamic image automatically.

### Verification helper

```ts
// src/lib/seo-verification.ts
import type { Metadata } from "next";

export function getVerification(): Metadata["verification"] | undefined {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  if (!google && !bing) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}
```

Wired into `defaultMetadata`:

```ts
export const defaultMetadata: Metadata = {
  // ...existing fields...
  verification: getVerification(),
};
```

### Blog index conversion

- `src/app/blog/page.tsx` becomes a server component:
  - Exports `metadata` via `createMetadata({ title: "Blog", description: "...", canonical: "/blog" })`.
  - Calls `getAllBlogPosts()` and `getAllBlogCategories()` at module scope (same as today).
  - Renders `<BlogIndex posts={...} categories={...} />`.
- `src/components/sections/BlogIndex.tsx` holds the existing `useState` filter UI with `"use client"` at top, accepting `posts` and `categories` as props.

Behaviour must be identical to the current client-rendered page — this is a boundary refactor, not a feature change.

---

## 5. Dynamic OG Images & `llms.txt`

### Dynamic OG template — blog post

File: `src/app/blog/[slug]/opengraph-image.tsx`

- Signature: `export default async function Image({ params }: { params: { slug: string } })`.
- Resolves `getBlogPostBySlug(slug)`; if not found, renders a generic brand card (safer than throwing).
- Layout:
  - Brand bar across the top — small logo lockup plus "Gentle Care Nursing".
  - Post title, large, left-aligned, maximum ~60 characters on two lines.
  - Category pill underneath the title.
  - Byline (author name) small, bottom-left.
  - Accent strip along the left edge in the site primary color (`#1e3a5f`).
- Size: 1200×630.
- Fonts: inline or system fallback — no remote font fetches inside `ImageResponse`.
- No network images — all assets bundled locally.

### Dynamic OG template — area page

File: `src/app/areas/[region]/opengraph-image.tsx`

- Signature: `export default async function Image({ params }: { params: { region: string } })`.
- Resolves the region's display name from area content.
- Layout:
  - Headline: "In-Home Nursing in {Region}".
  - Brand lockup in the lower-right.
  - Accent strip using site primary color.
- Size: 1200×630.

Both templates must be stress-tested against long titles (truncate or wrap) and unknown slugs (fall back gracefully).

### Static money-page cards

Generator script: `tools/generate-og-cards.ts` (TypeScript, run via `tsx` or `ts-node`; not wired into `npm run build`).

Config array:

```ts
const CARDS = [
  { output: "public/images/og/default.png", title: "Gentle Care Nursing", subtitle: "In-home nursing and care" },
  { output: "public/images/og/home.png",    title: "Personalised In-Home Nursing & Care", subtitle: "Trusted across Sydney" },
  { output: "public/images/og/ndis.png",    title: "NDIS Nursing & Care", subtitle: "Registered NDIS provider" },
  // ...dva, aged-care, private-nursing, services, referrers
];
```

The script uses `ImageResponse` (same API as the dynamic routes) and writes PNGs via `fs.writeFile`. Commit the resulting PNGs; the script exists so the cards can be regenerated if copy or branding changes.

### `llms.txt` expansion

Target structure, roughly double the current length. Wording must stay consistent with site brand voice.

```
# Gentle Care Nursing Services

[one-paragraph overview — keep existing wording]

## What we do

- In-home nursing and personal care across Sydney and surrounds
- NDIS-funded support for participants, families, and support coordinators
- DVA community nursing for veterans and war widows
- Aged care and support at home (Home Care Packages, CHSP)
- Private nursing and personal care

## Services in detail

- Post-hospital care: <one-line summary drafted from /services/post-hospital-care>
- Complex care: <one-line summary drafted from /services/complex-care>
- Hospital at Home: <one-line summary drafted from /services/hospital-at-home>
- Palliative care: <one-line summary drafted from /services/palliative-care>
- Personal care: <one-line summary drafted from /services/personal-care>
- Nursing care: <one-line summary drafted from /services/nursing-care>
- Overnight support: <one-line summary drafted from /services/overnight-support>
- Community participation: <one-line summary drafted from /services/community-participation>
- Assistance with daily living: <one-line summary drafted from /services/assistance-with-daily-living>

## Who we serve

- NDIS participants — /ndis
- DVA veterans and war widows — /dva
- Aged care / Home Care Package recipients — /aged-care
- Private clients — /private-nursing
- Referrers: hospitals, GPs, support coordinators — /referrers

## Areas served

<expanded from AREAS_SERVED during implementation — each entry is "Region name — /areas/<slug>">

## Key facts

- Registered NDIS provider and registered DVA provider
- 24–48 hour response to all enquiries
- 10+ years of experience; 1,300+ clients supported

## Common questions

<3–5 question→answer pairs, each answer ~1–2 sentences, drafted from existing /faq content during implementation>

## Main pages

- Home: /
- Services: /services
- NDIS Services: /ndis
- DVA & Community Nursing: /dva
- Aged Care: /aged-care
- Private Nursing: /private-nursing
- Referrers: /referrers
- Request Care: /referral
- About: /about
- Blog: /blog
- Guides: /guides
- Areas: /areas
- Contact: /contact
- FAQ: /faq

## Contact

Phone: 1300 004 267
Email: info@gentlecarenursing.com.au
Address: Level 1/5 George St, North Strathfield, NSW 2137, Australia

## Structured data

This site publishes schema.org JSON-LD: MedicalBusiness, Organization, WebSite,
AggregateRating, BlogPosting, FAQPage, HowTo, BreadcrumbList.
```

Content sources already in the repo: service page copy, `AREAS_SERVED`, existing FAQ content, existing `llms.txt`.

---

## 6. Testing & Validation

### Local verification (required before claiming done)

1. `npm run build` — must succeed with no metadata warnings; `generateStaticParams` must still resolve for blog and area routes.
2. `npm run dev`, then spot-check a sample of routes in browser view-source:
   - `<link rel="canonical">` present and correct per page.
   - `<meta property="og:image">` resolves to the expected URL (static for money pages, dynamic for blog slug and area region).
   - `<meta name="google-site-verification">` absent when env unset; present when set. Test both states by toggling the env var locally.
3. Visit `/blog/<slug>/opengraph-image` and `/areas/<region>/opengraph-image` directly — confirm PNGs render, check a long-title case and an unknown-slug case.
4. Visit `/blog` and view source — confirm server-rendered post list (not just a React shell), `<title>` present, canonical present.

### External validation (after deploy to a preview URL)

- Paste preview URLs into:
  - Facebook Sharing Debugger
  - LinkedIn Post Inspector
  - Twitter Card Validator
  - Google Rich Results Test
- Run `curl -A "Googlebot" <url>` on 3–4 representative routes; confirm full content (not a React shell) in the HTML response.
- Run `curl <preview>/llms.txt` and confirm the expanded file serves with the expected content.

Paste validator output or `curl` excerpts back into the PR or conversation before marking the work complete — evidence before assertions.

### Risk & mitigation

- **Risk:** `ImageResponse` font or asset loading fails at build on Netlify. **Mitigation:** prefer system fonts; test locally before deploy; if custom fonts are needed, inline via static import.
- **Risk:** Blog index conversion breaks the category filter. **Mitigation:** lift the existing filter UI verbatim into `BlogIndex.tsx`; only the data-fetching boundary changes.
- **Risk:** Wrong canonical on a dynamic route. **Mitigation:** canonicals derive from the slug used to route, not free-form input.
- **Risk:** Static OG generator script breaks on rerun. **Mitigation:** script is idempotent (overwrites output paths), config-driven, and not in the build path — broken script never blocks a deploy.

---

## 7. Rollout

Single PR, with changes sequenced internally:

1. Add `src/lib/seo-verification.ts`; wire `getVerification()` into `defaultMetadata`.
2. Mechanical canonical pass across every metadata-exporting page.
3. Convert `src/app/blog/page.tsx` to server + client split (`BlogIndex.tsx`).
4. Create `tools/generate-og-cards.ts`, run it locally, commit generated PNGs under `public/images/og/`.
5. Update money-page metadata to point at their static cards.
6. Add `src/app/blog/[slug]/opengraph-image.tsx` and `src/app/areas/[region]/opengraph-image.tsx`.
7. Expand `public/llms.txt`.
8. Document `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION` in README (or `.env.example` if one exists).

## 8. Success criteria

- All seven audit gaps closed, each verified per §6.
- No regressions in existing metadata, schema, sitemap, or robots output.
- `npm run build` clean.
- Preview URL previews correctly on Facebook, LinkedIn, Twitter.
- `llms.txt` serves the expanded content.
