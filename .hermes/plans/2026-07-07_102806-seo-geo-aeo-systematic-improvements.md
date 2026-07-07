# SEO GEO AEO Systematic Improvements Implementation Plan

> **For Hermes:** Execute directly in this repo. The plan is intentionally implementation-focused because Tyson asked to plan and execute, not just advise.

**Goal:** Make Gentle Care Nursing Services more comprehensive, machine-readable, locally trusted, and citation-ready for Google organic search, Google AI Overviews, ChatGPT, Claude, Perplexity, Gemini, Grok, and other LLM/answer engines.

**Architecture:** Keep the current Next.js App Router structure. Improve reusable content/schema components first, then let service, area, FAQ, sitemap, and LLM-facing files benefit from the same source-of-truth data.

**Tech Stack:** Next.js 16, React 19, TypeScript, static/public files, schema.org JSON-LD, sitemap/robots/llms outputs.

---

## Current context

The site is already strong. Live checks confirmed:

- `robots.txt` allows crawling and references the sitemap.
- `sitemap.xml` is live.
- `llms.txt` is live.
- Core pages have unique titles, meta descriptions, canonicals, H1s, and JSON-LD.
- Existing schema includes `Organization`, `MedicalBusiness`, `WebSite`, `MedicalService`, `FAQPage`, `BreadcrumbList`, `CollectionPage`, `MedicalProcedure`, and related nodes.
- Service pages already use answer-first `snippetAnswer` and quick-fact panels.

The gaps to close now are not basic SEO. They are entity confidence, source transparency, extraction consistency, local-area depth, and LLM-friendly indexing.

## Implementation tasks

### Task 1: Add richer source-backed evidence panels

**Objective:** Make quick facts more trustworthy for AI answers by allowing each fact to include a source, date checked, and limitation note.

**Files:**
- Modify: `src/components/sections/EvidencePanel.tsx`
- Modify: `src/components/sections/ServicePageLayout.tsx`
- Modify: `src/content/services.ts`

**Steps:**
1. Extend `EvidenceItem` with optional `source`, `sourceUrl`, `dateChecked`, and `limitations` fields.
2. Render source/date/limitation text in small, accessible copy under each fact.
3. Add page-level `reviewedAt` display for service pages where available.
4. Add source-backed details to high-priority NDIS, DVA, Aged Care, Nursing Care, Complex Care, Post-Hospital, Hospital-at-Home and Palliative Care evidence panels.
5. Keep the language factual and conservative.

**Verification:**
- Build succeeds.
- Rendered static HTML includes source text and review dates.

### Task 2: Strengthen schema freshness and attribution

**Objective:** Add stronger `dateModified`, `reviewedBy`, and organization linking signals.

**Files:**
- Modify: `src/lib/schema.ts`
- Modify: `src/components/sections/ServicePageLayout.tsx`
- Modify: `src/lib/constants.ts`

**Steps:**
1. Extend `getServiceSchema` to accept `dateModified`, `reviewedBy`, and `areaServed`.
2. Link service provider to `#organization` rather than creating a detached MedicalBusiness node.
3. Emit `dateModified` on FAQ schemas where practical.
4. Bump `SITE_LAST_UPDATED` to the implementation date because this is a meaningful content/SEO update.

**Verification:**
- Parse JSON-LD from built pages.
- Confirm `dateModified` exists where expected.

### Task 3: Improve AI crawler files

**Objective:** Turn `llms.txt` from a basic summary into an AI source-of-truth map.

**Files:**
- Modify: `public/llms.txt`
- Create: `public/llms-full.txt`
- Create: `public/ai-index.json`

**Steps:**
1. Use absolute URLs rather than relative paths in `llms.txt`.
2. Add intent mapping: families, NDIS coordinators, DVA referrers, hospital discharge planners, aged-care families, private clients.
3. Add “do not confuse with” entity disambiguation.
4. Add official contact/NAP and structured-data summary.
5. Create `ai-index.json` with pages, intents, service areas, funding types, and citation-ready facts.
6. Create `llms-full.txt` with fuller page index and answer-engine summaries.

**Verification:**
- Fetch files locally after build or dev server.
- Confirm content-type and no markdown escaping issues.

### Task 4: Fix area page heading hierarchy and add local citation facts

**Objective:** Strengthen local GEO pages and avoid H2-before-H1 concerns on the area index.

**Files:**
- Modify: `src/app/areas/page.tsx`
- Modify: `src/app/areas/[region]/page.tsx`
- Modify: `src/content/areas-content.ts`
- Modify: `src/lib/schema.ts`

**Steps:**
1. Replace `SectionHeader` on `/areas` with an explicit H1-first hero block.
2. Add an area quick-fact panel to `/areas/[region]` including suburbs, funding types, response window, referrer support, and service scope.
3. Add area-specific FAQ schema or FAQ content where feasible.
4. Extend area schema with `dateModified` and clearer `areaServed` data.

**Verification:**
- Built `/areas` starts with one H1 before area card H2s.
- Region pages include citable local facts.

### Task 5: Add/update comparison and decision-support internal links

**Objective:** Help AI and search engines understand which page answers which decision-making question.

**Files:**
- Modify: `src/content/services.ts`
- Modify: `src/content/faq.ts` if needed
- Modify: `public/llms-full.txt`

**Steps:**
1. Add richer related links across service pages to existing blog/service/condition pages.
2. Ensure no deleted `/guides` or `/compare` links are reintroduced.
3. Add future content backlog in docs, not live nav, for comparison pages that should be created later.

**Verification:**
- No broken internal links in generated pages.

### Task 6: Validate and document external authority work

**Objective:** Separate code-shippable changes from off-site authority work that requires account access or client details.

**Files:**
- Modify or create: `docs/SEO_GEO_AEO_ROADMAP.md`
- Existing: `docs/external-listings-checklist.md`

**Steps:**
1. Document the external listing/NAP tasks: Google Business Profile, Bing Places, Apple Business Connect, Facebook, Instagram, LinkedIn, NDIS/DVA/directory listings.
2. Add validation steps for Google Search Console, Bing Webmaster Tools, Rich Results Test, and PageSpeed.
3. Include a content roadmap for new pages: dementia care, diabetes care, stroke recovery, wound care, DVA referrals, support coordinators, hospital discharge.

**Verification:**
- Roadmap is clear enough to execute without redoing the audit.

### Task 7: Run quality checks

**Objective:** Prove the changes compile and the machine-readable outputs are valid.

**Commands:**
- `npm install` if dependencies are missing.
- `npm run lint`
- `npm run build`
- Fetch or inspect `public/llms.txt`, `public/llms-full.txt`, `public/ai-index.json`.
- Parse JSON files and generated JSON-LD snippets where possible.

**Done when:**
- Build passes or blocker is reported honestly.
- Changed files are listed.
- Remaining off-site tasks are clearly separated from code changes.
