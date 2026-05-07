# AI SEO Audit & Plan — Gentle Care Nursing

*Generated: 2026-05-07. Scope: discoverability, extractability, and citability of gentlecarenursing.com.au across ChatGPT, Perplexity, Google AI Overviews, Gemini, and Copilot.*

> Voice rules from `.agents/product-marketing-context.md` are binding for every recommendation in this doc: no "boutique", no "guarantee", DVA wording exact, "we aim to respond within 24 hours" phrasing, no specific years/duration claims.

---

## 1. Executive summary

The site is in unusually good technical shape for AI SEO. The foundations that most competitors miss — `llms.txt`, structured data depth, snippet-first copy, dynamic sitemap, programmatic service-region pages — are already in place. The gap is not technical; it is **citability density**: pages need more extractable answer blocks, named-clinician attribution, and verifiable statistics, plus a third-party presence layer that AI engines lean on heavily for healthcare queries.

Three findings drive the plan:

1. **Foundations are strong** — schema (MedicalBusiness, FAQPage, HowTo, Article, Service+areaServed, BreadcrumbList, AggregateRating), `llms.txt`, dynamic sitemap, snippet-first `snippetAnswer` fields on service pages, AI bots not blocked.
2. **Extractability is shallow on long-tail queries** — money pages answer broad intent well, but FAQ blocks are short and lack the 40-60-word self-contained answer pattern. There is no comparison content (NDIS provider vs. provider) or condition-pricing content, both of which are heavily cited in healthcare AI answers.
3. **Third-party presence is a blind spot** — for healthcare AI queries, citations skew toward government sources, Wikipedia, NDIS provider directories, hospital discharge resource lists, and Reddit/Whirlpool threads. Gentle Care has limited footprint outside its own domain.

Expected impact if the plan ships: 3–6× the citation surface area on Sydney + funding-segment queries within 60–90 days, with the largest lifts coming from (a) named clinician attribution and (b) third-party presence work.

---

## 2. Audit findings

### 2.1 Foundations — what is already working

| Area | Status | Evidence |
|---|---|---|
| AI bot access | ✅ Open | `src/app/robots.ts` allows all UAs; only `/api/` disallowed |
| `llms.txt` | ✅ Present and well-structured | `public/llms.txt` covers what we do, services, areas, contact, schema, FAQs |
| Dynamic sitemap | ✅ Comprehensive | `src/app/sitemap.ts` includes core, services, service+region, area, blog, guides |
| Schema — MedicalBusiness | ✅ Strong | Full address, geo, areaServed (City+Place+State+Country), OfferCatalog, opening hours |
| Schema — Organization + WebSite | ✅ Linked via `@id` | `src/lib/schema.ts:127` correctly references publisher |
| Schema — FAQPage | ✅ Used on `/faq`, `/referrers`, service+region pages, all `ServicePageLayout` pages |
| Schema — HowTo | ✅ Used on home (request care steps) |
| Schema — MedicalService + areaServed | ✅ Service+region landing pages bundle MedicalService + WebPage + Place suburbs |
| Schema — BlogPosting (Article) | ✅ Used on blog detail pages |
| Schema — AggregateRating | ✅ Available; pulled from `GOOGLE_REVIEWS` |
| Snippet-first copy | ✅ Present | `snippetAnswer` field on every `ServicePageData` and on every Guide |
| Title/description metadata | ✅ Per-page `createMetadata()` with canonical and OG image |
| Programmatic depth | ✅ Service × region pages exist (`SERVICE_REGION_PAGES`) |
| Healthcare entity clarity | ✅ Schema type is `MedicalBusiness` (not generic `LocalBusiness`) |

### 2.2 Gaps — what to fix or add

#### G1. FAQ blocks are too short to win standalone-passage extraction

AI answer engines preferentially pull 40–60 word self-contained passages. Current FAQ answers (e.g. `src/content/faq.ts:34-37` "Who provides the care?") are 2 lines, lack named attribution and any specifics that would make them unambiguous citations.

**Pattern to add:** every FAQ answer should pass the "remove the question and the answer still makes sense" test, and should contain at least one specific fact (named role, regulator, funding category) that uniquely identifies Gentle Care.

#### G2. No expert/clinician attribution at the page level

The Princeton GEO study (Perplexity, KDD 2024) shows expert quotes drive +25–30% citation rate. The site references "led by a care professional with over 10 years of experience" but no page has a named clinical author/reviewer with credentials. For healthcare queries, AI engines weight medically reviewed content heavily.

**Pattern to add:** "Clinically reviewed by [Name], [AHPRA registration type], [date]" byline on service pages, NDIS, DVA, aged care, guides.

#### G3. No verifiable statistics

`llms.txt` and pages mention "we aim to respond within 24 hours" and "small caseload" — but no quantified, citable statistics (e.g. "currently supporting N participants across X suburbs", "N% of referrals from hospital discharge planners get a same-business-day callback"). Statistics drove +37% citation in the GEO research.

**Constraint:** voice rules forbid year/duration claims and "guarantee". Stats must be honest, current-state metrics, dated, and refreshed quarterly. See plan §4.3.

#### G4. No comparison/alternative content

The skill's data shows comparison pages take ~33% of AI citation share. The site has no "[X] vs [Y]" or "Best [category] in Sydney" content. For NDIS/aged-care, intent-rich comparison queries include "registered NDIS provider vs. non-registered", "DVA Community Nursing vs. private nursing", "in-home nursing vs. residential aged care".

#### G5. Limited author/E-E-A-T surface

`getArticleSchema` accepts an author but blog posts likely use a generic name. Recommend: dedicated `/about/clinical-team` page (or expand `/about`) with named clinicians, AHPRA numbers (where consented), areas of practice — for both AI entity recognition and Google E-E-A-T.

#### G6. `Organization` schema is missing key entity signals

`getOrganizationSchema` (src/lib/schema.ts:119-133) is minimal — only `name`, `url`, `logo`, `sameAs`. For AI entity recognition, add: `description`, `contactPoint` (phone, hours, contactType: "customer service"), `areaServed`, `address`, `legalName`, and `knowsAbout` array (NDIS, DVA Community Nursing, complex care, palliative care, etc.).

#### G7. No `MedicalCondition` or `MedicalProcedure` schema on guides

Guides like "in-home care after hip replacement" (`src/content/guides.ts:30-`) are exactly the surface AI cites for clinical recovery queries. Adding `MedicalCondition` (Hip osteoarthritis post-arthroplasty) and `MedicalProcedure` references in schema would make these pages dramatically more extractable for symptom/condition queries.

#### G8. No third-party presence strategy documented

Audit could not verify external citations from inside the repo — but the project context shows no Wikipedia entry, no NDIS provider directory listing strategy, no Reddit r/NDIS or r/AusFinance presence, no Google Business Profile review cadence target. AI engines cite third-party sources for healthcare disproportionately.

#### G9. Aggregate rating is generated but never used

`getAggregateRatingSchema` exists but doesn't appear referenced anywhere in `src/app/`. Adding it to the homepage and service pages would surface the rating to AI engines (subject to ACCC honesty — only show if backed by real Google reviews; voice rules forbid hype, not accurate data).

#### G10. No "last updated" or "reviewed on" timestamps visible to humans

Sitemap uses `lastModified: new Date()` (always today) which is fine for crawlers but unhelpful to users and AI engines that look for visible freshness signals on-page. Add visible "Last reviewed: [date]" on guides, services, and key money pages — especially since clinical content trustworthiness is partly judged by review currency.

---

## 3. Visibility check — 10-query baseline

Run these manually in ChatGPT (with web), Perplexity, and Google (note AI Overview presence). Record in a sheet; repeat monthly. The skill recommends checking month-over-month — do this before any of the §4 work ships, then re-check 30 days after each phase.

| # | Query | Intent | Pages that should be cited |
|---|---|---|---|
| 1 | best in-home nursing Sydney NDIS | local + funding | `/ndis`, `/areas/inner-west`, `/areas/north-shore` |
| 2 | DVA community nursing Sydney | regulator + service | `/dva`, `/services/[service]/[region]` for DVA hotspots |
| 3 | registered NDIS provider in-home nursing Sydney | provider qualification | `/ndis`, `/about` |
| 4 | hospital discharge home nursing Sydney | post-hospital intent | `/services/post-hospital-care`, `/referrers` |
| 5 | complex care at home tracheostomy PEG Sydney | clinical specificity | `/services/complex-care` |
| 6 | palliative care at home Sydney | end-of-life | `/services/palliative-care` |
| 7 | in-home care after hip replacement | guide intent | `/guides/in-home-care-after-hip-replacement` |
| 8 | private nursing at home Sydney cost | private + price intent | `/private-nursing` (currently no pricing — see Plan §4.5) |
| 9 | aged care at home Support at Home Sydney | aged-care + program | `/aged-care` |
| 10 | NDIS provider vs non-registered provider | comparison | **Currently no page** — see Plan §4.4 |

Worksheet template:

```
| Query | ChatGPT cited? | Perplexity cited? | Google AIO cited? | Competitor cited (who) | Notes |
```

If you want me to run this baseline now (using WebSearch/WebFetch), say so — I left it manual because it crosses outside the repo and the skill recommends DIY monthly anyway.

---

## 4. Optimization plan — phased

Ordered by impact ÷ effort. Each item is concrete enough to be a ticket.

### Phase 1 — Schema + foundation enrichment (1–2 days, low risk)

**4.1 Expand Organization schema**
- File: `src/lib/schema.ts` `getOrganizationSchema()`
- Add: `description`, `legalName`, `address`, `contactPoint` (phone, email, contactType, hoursAvailable, areaServed), `knowsAbout` (NDIS, DVA Community Nursing, complex care, palliative care, post-hospital care, wound care, PEG feeding, tracheostomy care, catheter management), `areaServed` (Sydney + state), `slogan` (avoid: must comply with voice rules — use "Personalised, clinician-led in-home nursing").
- Why: deeper entity profile improves AI entity recognition and `sameAs` cross-referencing.

**4.2 Wire AggregateRating**
- File: `src/components/sections/HomePageContent.tsx` and `ServicePageLayout.tsx`
- Add `getAggregateRatingSchema()` to JSON-LD output (gate behind a check that `GOOGLE_REVIEWS.reviewCount > 0` — never publish if zero reviews).
- Why: ACCC-compliant trust signal AI engines surface in healthcare answers.

**4.3 Add `MedicalCondition` / `MedicalProcedure` schema to guides**
- File: new generator in `src/lib/schema.ts` (e.g. `getMedicalGuideSchema`) called from `src/app/guides/[slug]/page.tsx`.
- For each guide, declare `about: { @type: "MedicalCondition" | "MedicalProcedure", name, alternateName, code }` and `audience`.
- Why: makes condition-specific guides eligible for clinical-query citations on Perplexity and AI Overviews.

**4.4 Visible freshness timestamps**
- Add `reviewedAt` field to `Guide`, `ServicePageData`, and core money-page types.
- Render as "Last reviewed: [date] by [Clinical reviewer name, role]" near the top of each page.
- Update via PR each quarter. Reflect the same date in `dateModified` on `BlogPosting` and on a new `dateReviewed` field on `Article`/MedicalGuide.

### Phase 2 — Page-level extractability (2–4 days)

**4.5 Expand FAQ answers to the 40–60-word standalone pattern**
- File: `src/content/faq.ts` and the `faqs` arrays on each `ServicePageData`.
- Rewrite each answer so it (a) restates enough of the question to stand alone, (b) names Gentle Care explicitly, (c) cites at least one verifiable specific (regulator, suburb, funding category, AHPRA-registered nurses).
- Voice rules apply: no "guarantee", no boutique, "we aim to respond within 24 hours".

**4.6 Add named clinical reviewer byline**
- New component: `<ClinicalReviewer name role ahpraType reviewedAt />`.
- Place on: `/services/*`, `/ndis`, `/dva`, `/aged-care`, `/private-nursing`, `/guides/*`.
- Connect to `Article`/`MedicalWebPage` schema's `reviewedBy` field.
- Voice constraint: do not state years operating; can state credentials and registration type.

**4.7 Build "Pricing & funding" answer blocks**
- `/private-nursing` should answer "how much does private nursing cost" with a structured price band or "from $X/hr; final pricing depends on shift type, qualifications required, and travel". Right now there's no answer here, and AI engines fall back to competitor pricing pages.
- For `/ndis` and `/dva`: explain the line items / DVA item codes you bill against (citable, factual, gives AI a rich extractable block).

**4.8 Add comparison content (33% of AI citation share)**
- New pages under `/compare/`:
  - `/compare/registered-ndis-provider-vs-non-registered`
  - `/compare/dva-community-nursing-vs-private-nursing`
  - `/compare/in-home-nursing-vs-residential-aged-care`
  - `/compare/clinician-led-vs-agency-staff`
- Each: comparison table (5–7 criteria, balanced, evidence-based), 2–3 supporting paragraphs each side, FAQ block, BreadcrumbList + FAQPage schema.
- Use the **competitor-alternatives** skill workflow when actually building these.

**4.9 Strengthen `/about` into a clinical team entity page**
- Add named clinicians with: AHPRA registration type, areas of practice, languages, regions covered.
- Adds rich `Person` schema each, references via `member` on the Organization schema.
- Why: AI engines look for named clinician identity to ground "who delivers the care" answers.

### Phase 3 — Third-party presence (ongoing, highest leverage)

This is the layer competitors usually ignore. Most AI citations on healthcare queries are *not* the brand's own domain — they're directories, government, Wikipedia, Reddit, review sites, and YouTube.

**4.10 NDIS Provider Finder** — verify Gentle Care's listing on `ndis.gov.au` Provider Finder is current (services, regions, contact, accreditation status).

**4.11 DVA provider visibility** — confirm listing/searchability via `dva.gov.au` provider directories where eligible. The wording must be exact: "DVA Contracted Community Nursing Provider".

**4.12 Google Business Profile** — set a review cadence (target: 1–2 new authentic reviews/month from genuine clients/families with consent). Keep services list synced with site `GMB_SERVICES`. AI engines pull GBP heavily for local healthcare.

**4.13 My Aged Care + Support at Home directories** — verify listing where applicable. Voice rules apply.

**4.14 Local hospital discharge planner outreach** — printed and PDF-on-website "Hospital to Home Referral Pack" (one-pager). Many hospital discharge resource pages link out to provider PDFs, and these PDFs get crawled.

**4.15 Industry/academic citation** — guest posts or quotes on:
- Carers NSW
- COTA NSW (Council on the Ageing)
- Carer Gateway
- LASA / Ageing Australia
Each external citation as "DVA Contracted Community Nursing Provider Gentle Care Nursing" reinforces the entity signal AI engines train on.

**4.16 Wikipedia** — Wikipedia pages for the *categories* (DVA Community Nursing, NDIS in-home support) — if accurate, current, with citable references. Not a Gentle Care vanity page (would be deleted under WP:CORP).

**4.17 Reddit / Whirlpool / community forums** — authentic, helpful answers (NOT promotional) on r/NDIS, r/aussie, r/AustralianTeachers (carers ask there often), Whirlpool Aged Care thread. AI engines frequently cite Reddit.

**4.18 YouTube** — short clinician-explainer videos for the top 5 query intents (post-hospital, complex care, DVA, NDIS, palliative). Google AI Overviews cite YouTube heavily. Keep them under 3 minutes; transcripts auto-generated.

### Phase 4 — Monitoring (ongoing)

**4.19 Monthly AI visibility check** — run the §3 worksheet. Track citations and competitors month-over-month in `docs/AI_VISIBILITY_LOG.md` (create as a CSV-ish table).

**4.20 GSC AI Overview tracking** — Search Console now shows AI Overview impressions for some queries. Filter for those, surface in the existing `GSC_AI_AUDIT.md` workflow.

**4.21 Tooling (optional)** — Otterly AI or Peec AI if budget exists. Otherwise the manual sheet is fine.

---

## 5. What NOT to do (reminders for future passes)

- Do not keyword-stuff. Princeton GEO study: -10% visibility.
- Do not publish unverifiable statistics or "since 20XX" claims (voice rules).
- Do not use "boutique", "premium", "guarantee", "hyper-personalised".
- Do not gate the most authoritative content. AI engines can't cite what they can't read.
- Do not generate AI-written content blocks for clinical guides without clinician review — both for compliance and citation quality.
- Do not block AI bots even partially without an explicit business reason (currently correctly open).

---

## 6. Open questions for the user

1. **Clinical reviewer name + AHPRA registration** — can we publish a named clinician byline (with their consent)? This is the single highest-leverage trust signal for healthcare AI citation.
2. **Verifiable statistics** — what current-state numbers are we comfortable publishing? (e.g. "currently supporting N participants", "operating across N Sydney suburbs", "responding to enquiries within X business hours on average over the last quarter".) Subject to voice rules.
3. **Pricing transparency for `/private-nursing`** — willing to publish a from-rate or rate range? AI engines heavily favour pricing-transparent pages.
4. **Comparison pages** — green-light to draft `/compare/*` pages? They're the biggest single citation surface gain.
5. **Baseline run** — want me to run the §3 ten-query check via WebSearch right now to give you a starting line?

---

## 7. Implementation log — 2026-05-07 pass

Shipped without needing Gemma's input:

- **Organization schema enrichment** — `src/lib/schema.ts` `getOrganizationSchema()` now emits `description`, `legalName`, `slogan`, `address`, `areaServed`, `telephone`, `email`, `contactPoint` (with hours), and `knowsAbout` (18 clinical/programmatic terms aligned to actual services). Strengthens AI entity recognition for healthcare and Sydney location queries.
- **MedicalGuide schema** — new `getMedicalGuideSchema()` generator emits `Article` + `WebPage` with optional `reviewedBy` / `dateReviewed`, and topical `about` entities (`MedicalCondition`, `MedicalProcedure`) per guide. Wired into `GuidePageLayout`.
- **Guide breadcrumb schema** — `BreadcrumbList` now emitted on every guide page (was missing entirely).
- **Topical entity map** — `GUIDE_ABOUT_ENTITIES` in `src/content/guides.ts` declares per-guide clinical entities (e.g. hip-replacement guide → `MedicalProcedure: Hip replacement / Total hip arthroplasty`).
- **Clinical-review fields on data types** — `Guide.reviewedAt` / `Guide.reviewer` / `Guide.publishedAt` and `ServicePageData.reviewedAt` / `ServicePageData.reviewer` added as optional fields. Visible "Last clinically reviewed" line renders on guide pages once dates are populated. (Service page byline rendering can land in the same Phase 2.6 PR once Gemma confirms reviewer name.)
- **FAQ rewrites** — `src/content/faq.ts` rewritten to the 40–60-word self-contained passage pattern. Each answer now restates the question, names "Gentle Care Nursing Services" explicitly, and contains at least one verifiable specific (regulator, region, line item, AHPRA-registered nurses). Voice rules respected throughout. Existing FAQ schema generator picks the new copy up automatically.
- **`llms.txt` updated** — schema list now reflects the expanded set, including Article with `reviewedBy`/`dateReviewed` and per-guide `MedicalCondition`/`MedicalProcedure`.
- TypeScript `tsc --noEmit` clean after all changes.

Deferred (need Gemma's input — not shipped):

- **AggregateRating wiring (4.2)** — blocked. `src/content/reviews.ts` is explicitly marked "placeholder until Gemma provides real GBP data" (5.0 / 12 reviews, no GBP URL). Publishing AggregateRating with placeholder values would violate the voice rule against being "salesy" and risks ACCC compliance issues for healthcare advertising. Action: confirm real Google Business Profile rating, count, and URL with Gemma, then enable.
- **Named clinical reviewer byline** — schema and data fields are now ready (`reviewer`, `reviewedAt`); just no values populated. Action: confirm a named clinician (likely Gemma as Founder & Clinical Director, AHPRA registration type to be confirmed) and a review date per page.
- **Verifiable current-state stats** — voice rules permit current-state, dated, refreshable numbers (no "since 20XX" or "X+ years operating" claims, no guarantees). Action: agree with Gemma on (a) suburbs currently served, (b) approximate number of active clients, (c) average response time within business hours over the last quarter.
- **Pricing block on `/private-nursing`** — needs from-rate or rate range willing to publish.
- **`/compare/*` pages** — need Gemma's sign-off on positioning of competitors before drafting.

## 8. Issues found during this pass that are outside AI SEO scope but worth flagging

These are pre-existing and were not changed in this pass; flagging for a future cleanup.

- **`MILESTONES` violates the voice rule on years.** [src/content/about.ts:109-139](../src/content/about.ts#L109-L139) lists "2018", "2019", "2020", "2022", "2025" — direct violation of `.agents/product-marketing-context.md` rule: *"Do NOT use specific years/duration claims ('since 2014', 'X+ years operating')."* If this content renders anywhere on `/about`, it should be replaced with non-dated phrasing (e.g. "Founded by a clinician with over 10 years of hands-on experience…", "Registered NDIS provider", "DVA Contracted Community Nursing Provider", "Coverage extended across Greater Sydney"). Recommend grep for `MILESTONES` usage and either remove or rewrite.
- **`GBP_URL`, `googleUrl` empty.** [src/lib/constants.ts:30](../src/lib/constants.ts#L30) `gbpUrl: ""` and [src/content/reviews.ts:9](../src/content/reviews.ts#L9) `googleUrl: ""`. These feed `sameAs` and reduce the entity-link strength for AI engines. Once GBP is verified, populate both.

---

## 9. Related documents

- `.agents/product-marketing-context.md` — voice rules and positioning (binding)
- `docs/GSC_AI_AUDIT.md` — Google Search Console workflow (complementary)
- `docs/COPY_STYLE.md` / `docs/COPY_BRIEF.md` — site copy standards
- `public/llms.txt` — AI-ingestion site summary (already strong)
- `src/lib/schema.ts` — JSON-LD generators (Phase 1 edits land here)
