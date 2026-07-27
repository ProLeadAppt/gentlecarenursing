---
name: seo-site-context
description: "Site facts for gentlecarenursing.com.au: domain, stack, business model, existing SEO surface and known gaps. Load this before any SEO work in this repo so /seo commands reason about the real site instead of generic assumptions. Triggers on: SEO, audit, schema, sitemap, robots, metadata, canonical, local SEO, programmatic SEO, doorway pages, E-E-A-T, YMYL, medical, GEO, AI Overviews, llms.txt, structured data."
---

# Site context: gentlecarenursing.com.au

Read this before running any `/seo` command in this repo.

## Business

Gentle Care Nursing, a Sydney in-home nursing provider. NDIS, aged care, DVA,
private nursing, complex care, hospital-at-home. Conversion goal is referrals
and enquiries from participants, families and referrers (GPs, hospitals,
support coordinators).

**Industry classification for `/seo audit`:** local healthcare service with a
programmatic service-area layer, plus a publisher layer (blog, conditions).

**This is the highest-stakes YMYL site in the portfolio.** Health content sits
at the top of Google's your-money-or-your-life scale, and the September 2025
Search Quality Rater Guidelines update widened YMYL further. Every content
recommendation must clear medical E-E-A-T: named clinical author or reviewer,
credentials, review date, and citations to primary sources (NDIS Commission,
Department of Health, peer-reviewed guidance). Never let the SEO skills draft
clinical claims without a named human reviewer in the loop.

## Stack

- Next.js 16, App Router, React 19, TypeScript, Tailwind 4
- Hosted on Netlify (`netlify.toml`, `@netlify/plugin-nextjs`)
- Resend for email, service worker (`public/sw.js`), offline page
- Tests via `tsx --test`

## Existing SEO surface

Richest schema implementation in the portfolio.

| Artefact | Location |
|---|---|
| robots | `src/app/robots.ts` |
| sitemap | `src/app/sitemap.ts` |
| schema | `src/lib/schema.ts` |
| metadata | `src/lib/metadata.ts` |
| self-audit | `src/lib/seo-audit.ts`, `src/lib/seo-verification.ts`, `tools/audit-seo-production.ts` |
| tests | `tests/schema.test.ts`, `tests/seo-audit.test.ts` |
| AI discovery | `public/llms.txt`, `public/llms-full.txt`, `public/ai-index.json` |
| existing docs | `docs/SEO_GEO_AEO_ROADMAP.md`, `docs/AI_SEO_AUDIT.md`, `docs/SEO_AUDIT.md`, `docs/SEO_AUDIT_PASS_3.md`, `docs/SITEMAP.md` |

34 routes export metadata. 14 files emit JSON-LD. Schema types in use include
MedicalBusiness, MedicalService, MedicalProcedure, Service, OfferCatalog,
Organization, WebSite, WebPage, CollectionPage, BlogPosting, Article,
BreadcrumbList, FAQPage, HowTo, AggregateRating, OpeningHoursSpecification,
GeoCoordinates, PostalAddress, ServiceChannel, ContactPoint, Place, City,
State, AdministrativeArea, Country, Language, Offer, Person.

Route surface: `/`, `/about`, `/services`, `/services/[service]/[region]`,
plus fixed service pages, `/areas`, `/areas/[region]`, `/conditions`,
`/conditions/[condition]`, `/blog`, `/blog/[slug]`, `/ndis`, `/dva`,
`/aged-care`, `/private-nursing`, `/faq`, `/referral`, `/referrers`,
`/contact`, `/review`, `/privacy`.

## Known gaps

1. **`HowTo` schema is deprecated.** `src/lib/schema.ts` emits `HowTo` and
   `HowToStep`. Google removed HowTo rich results in September 2023 and fully
   retired the reporting in 2025. It produces nothing. Replacement guidance is
   in `.claude/skills/seo-schema/references/deprecated-types-2024-2026.md`.
   Removing it is safe and reduces payload.

2. **`FAQPage` no longer yields rich results.** Google retired FAQ rich
   results for all sites on 2026-05-07. `QAPage` remains valid for genuine
   user-generated Q&A, but FAQPage markup on a marketing FAQ is now inert.
   Keep or remove on semantic grounds only, do not expect SERP effect.

3. **`/services/[service]/[region]` is the doorway-page risk.** This is a
   service × region cross-product. The `seo-local` skill warns at 30 generated
   pages and hard-stops at 50. Run `/seo programmatic` before expanding the
   matrix, and confirm each combination has real, region-specific clinical and
   coverage content.

4. **Three overlapping AI-discovery files** (`llms.txt`, `llms-full.txt`,
   `ai-index.json`). Worth knowing: the `seo-geo` skill's primary-source review
   concludes Google Search ignores llms.txt and it is not currently a citation
   lever. Do not add a fourth. Effort is better spent on passage citability,
   which is what actually drives AI Overview and ChatGPT pickup.

5. **Medical author and reviewer attribution.** Check that clinical content
   carries a named reviewer with credentials and a review date. This is the
   single highest-weight E-E-A-T factor for a health site and the thing
   `/seo content` will score hardest.

## Verification

```bash
npm run lint && npm run test && npm run build
npm run audit:seo      # tools/audit-seo-production.ts
```

The repo already has its own SEO audit tooling. Run it alongside `/seo audit`
and reconcile the two rather than replacing it.
