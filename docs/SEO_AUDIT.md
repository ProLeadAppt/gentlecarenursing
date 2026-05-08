# Traditional SEO Audit — Gentle Care Nursing

*Generated: 2026-05-07. Scope: technical, on-page, and content SEO for gentlecarenursing.com.au. Distinct from `docs/AI_SEO_AUDIT.md` (AI search citation) and `docs/GSC_AI_AUDIT.md` (GSC query workflow).*

> Voice rules from `.agents/product-marketing-context.md` are binding for every recommendation here.

---

## 1. Executive summary

This site has unusually solid SEO foundations for its stage. Crawlability is open, sitemap is dynamic and comprehensive, schema is rich and correctly cross-referenced, every page uses `createMetadata()` with a canonical, HTTPS is enforced via Netlify, and the URL structure is clean and keyword-aligned. There are no critical indexation blockers.

The real issues are concentrated in three areas:

1. **Title-tag length on programmatic service-region pages** — 26 of 30 service×region titles exceed 60 characters (max 78), so they will truncate in SERPs. The repeat "Sydney" in regions like "Western Sydney Sydney" also reads awkwardly.
2. **Meta-description hygiene** — area-page descriptions are auto-generated and balloon to 200+ characters once suburbs are interpolated. A few static pages have no description (`privacy`, `terms`, dynamic `[slug]` pages handled separately). One page (`Areas We Serve`) has a 170-char description.
3. **Image practice on blog cards uses `<img>` instead of `next/image`** — a Core Web Vitals (LCP / CLS) regression on the blog index and any page that renders BlogCard.

Everything else is either healthy or already covered in the AI SEO PR (#8). Expected impact if the fixes ship: higher CTR on programmatic regional pages (the biggest local-SEO surface area you have), cleaner SERP previews across the site, and improved CWV on blog and any embedded BlogCard surfaces.

---

## 2. Findings

### 2.1 Technical SEO

#### T1. ✅ Crawlability is open and correct

| Check | Status | Evidence |
|---|---|---|
| `robots.txt` allows all UAs | ✅ | [src/app/robots.ts](../src/app/robots.ts): `userAgent: "*"`, only `/api/` disallowed |
| Sitemap referenced in robots | ✅ | `sitemap: ${BASE_URL}/sitemap.xml` |
| Sitemap is dynamic and comprehensive | ✅ | [src/app/sitemap.ts](../src/app/sitemap.ts) covers core, services, service+region, area, blog, guides |
| HTTPS enforced | ✅ | Netlify default; HSTS not in `netlify.toml` but acceptable |
| Security headers present | ✅ | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, CSP |

**No action.**

#### T2. ⚠️ Sitemap `lastModified` always renders as "now"

[src/app/sitemap.ts:54](../src/app/sitemap.ts#L54) sets `lastModified: new Date()` for every entry on every build. This signals to crawlers that every page changed at every build, which dilutes the `lastmod` signal and can lead to wasted crawl budget on stable pages.

- **Impact:** Low (Google increasingly ignores `lastmod` when it conflicts with observed change frequency, but Bing/others still trust it).
- **Fix:** For each route, derive `lastModified` from the underlying content's last update where available — e.g. `post.updatedAt ?? post.publishedAt` for blog posts, `guide.reviewedAt ?? guide.publishedAt` for guides, and a hard-coded constant per static page edited only when the page changes.
- **Priority:** Low (do during the next blog/guide content refresh).

#### T3. ⚠️ Canonical strategy is solid but `metadataBase` and trailing slash should be confirmed

[src/app/layout.tsx:38](../src/app/layout.tsx#L38) sets `metadataBase: new URL(siteUrl)` using `NEXT_PUBLIC_SITE_URL ?? "https://gentlecarenursing.com.au"`. Per-page canonicals come through `createMetadata({ canonical })` and resolve correctly.

- **Risk:** if `NEXT_PUBLIC_SITE_URL` is set to a Netlify preview URL or a non-canonical host in any environment, canonicals will leak that host. Verify the production env var is exactly `https://gentlecarenursing.com.au` (no trailing slash, https).
- **Trailing slash:** no `trailingSlash` set in `next.config.ts` (defaults to `false`). All canonicals in code are slashless except homepage (`/`). This is consistent — keep it.
- **Action:** confirm `NEXT_PUBLIC_SITE_URL` is correct in Netlify production and previews, and add a comment in `next.config.ts` documenting the trailing-slash decision so it doesn't drift.

#### T4. ⚠️ No HSTS header

`netlify.toml` sets several security headers but not `Strict-Transport-Security`. Not an SEO ranking factor on its own, but mixed-protocol risk and a small trust signal.

- **Fix:** add `Strict-Transport-Security = "max-age=31536000; includeSubDomains"` to the global `[[headers]]` block.
- **Priority:** Low.

#### T5. ⚠️ `BlogCard` uses raw `<img>` — Core Web Vitals risk

[src/components/sections/BlogCard.tsx:26](../src/components/sections/BlogCard.tsx#L26) uses `<img>`. Every other component uses `next/image` correctly. On the blog index page, this means no automatic responsive sizing, no lazy-loading defaults, no priority hint, and no AVIF/WebP conversion — all of which hurt LCP and CLS for blog landing pages.

- **Fix:** replace `<img>` with `<Image>` from `next/image`. Set `width`, `height`, and `sizes`. Mark the first card's image as `priority` if above the fold; the rest stay default-lazy.
- **Priority:** Medium.

#### T6. ✅ Site architecture, internal linking, and clicks-from-home

Spot-checked depth via the nav (`NAV_LINKS`), `BentoServiceGrid`, footer, and `ServicePageLayout`/`ServiceRegionPageLayout` cross-links:

- All money pages (`/`, `/ndis`, `/dva`, `/aged-care`, `/private-nursing`, `/services`, `/services/*`) reachable in ≤2 clicks.
- Service-region pages (`/services/[service]/[region]`) linked from the parent service page and area pages.
- Area pages reachable via `/areas` and footer.
- No orphan pages found in the sitemap that aren't linked from somewhere.

**No action.**

#### T7. ✅ HTTPS, security, mobile-friendliness

- HTTPS enforced.
- `viewport: width=device-width, initialScale=1` set in [src/app/layout.tsx:84](../src/app/layout.tsx#L84).
- CSP allows analytics; no obvious mixed-content risk.

**No action.**

### 2.2 On-page SEO

#### O1. 🚨 26 of 30 service-region titles exceed 60 chars (truncation risk)

The single biggest on-page issue. The dynamic title in [src/content/service-regions.ts:581](../src/content/service-regions.ts#L581) is:

```
${service.title} in ${region.region} Sydney | Gentle Care Nursing
```

Computed lengths across all 30 combinations:

| Service | Title length range | All under 60? |
|---|---|---|
| NDIS Services | 56–63 | No (3/6 over) |
| DVA Community Nursing | 64–71 | **No (6/6 over)** |
| In-Home Nursing Care | 63–70 | **No (6/6 over)** |
| Personal Care & Daily Living | 71–78 | **No (6/6 over)** |
| Complex Care Support | 63–70 | **No (6/6 over)** |

Worst case: `Personal Care & Daily Living in Sydney CBD & East Sydney | Gentle Care Nursing` (78 chars).

Compounding issue: regions like "Western Sydney" already include "Sydney", so the appended " Sydney" produces "Western Sydney Sydney" / "Northern Beaches Sydney" / "Sydney CBD & East Sydney". Reads as a typo to users and dilutes click-through.

- **Fix (recommended):** new template that drops the second "Sydney" and shortens the brand suffix:
  ```
  ${service.shortTitle} in ${region.region} | Gentle Care Nursing
  ```
  - "Personal Care & Daily Living" → use `shortTitle` field (which is `"Personal Care"`).
  - "DVA Community Nursing" stays full because it's a defined entity.
  - Add a one-time `region.region` normaliser that strips a trailing " Sydney" from regions where applicable (e.g. accept both "Sydney CBD & East" and "Inner West"), so we never produce double-Sydney.
  
  Recomputed worst case under this template: `DVA Community Nursing in Northern Beaches | Gentle Care Nursing` = 62 chars — still over by 2 for one or two combos. Consider dropping the brand suffix to just `"GCN"` or moving brand to the OG title only:
  ```
  ${service.shortTitle} in ${region.region} Sydney | GCN
  ```
  Or accept the brand suffix loss for region pages and use:
  ```
  ${service.shortTitle} | ${region.region} Sydney
  ```
  Decision belongs with Gemma (brand prominence vs. CTR).
- **Impact:** High. Truncated titles lose 5–15% CTR in SERPs; programmatic pages are the biggest scaling surface you have for local SEO.
- **Priority:** High.

#### O2. ⚠️ Area-page meta descriptions exceed 160 chars

[src/content/areas-content.ts:44](../src/content/areas-content.ts#L44) generates:

```
Gentle Care Nursing Services provides in-home nursing and personal care across {region} ({suburbs.join(", ")}). Registered NDIS provider and DVA Contracted Community Nursing Provider. Personal response within 24 hours.
```

Even before suburbs interpolate, the prefix + region + closing copy is **201 characters**. With suburbs (typically 5–8 names), every area description blows past 160 — Google truncates and the closing "personal response within 24 hours" phrase (the actual differentiator) gets cut off.

- **Fix:** rewrite to a tight ≤160-char template that puts the differentiator first:
  ```
  In-home nursing and personal care across ${region}, Sydney. Registered NDIS provider and DVA Contracted Community Nursing Provider. Response within 24 hours.
  ```
  That clocks ~155 chars before region; with "Inner West" → 159, with "Northern Beaches" → 165. May need a shorter variant per region, or drop "Contracted Community Nursing" → "Community Nursing" (still factual: "DVA Community Nursing Provider"). Voice rule check: "DVA wording must be 'DVA Contracted Community Nursing Provider' or 'Contracted to provide DVA Community Nursing services'" — so we **cannot** drop "Contracted". Options:
    - Drop the suburb list from the description (it lives in the H2/body anyway).
    - Use service-region pages as the targeted-keyword surface and let area-page meta-descriptions stay informational.
- **Impact:** Medium-high. Six area pages, all heavily targeted local intent.
- **Priority:** High (paired with O1 since both touch programmatic SEO surfaces).

#### O3. ⚠️ A few service-page meta titles exceed 60 chars

| Page | Title | Length |
|---|---|---|
| /services/overnight-support | "Overnight Support & Sleepover Care \| Safety Throughout the Night" | 64 |
| /services/assistance-with-daily-living | "Assistance with Daily Living \| Practical Home Support in Sydney" | 63 |
| /services/community-participation | "Community Participation \| Social Inclusion Support in Sydney" | 60 (border) |
| /services/nursing-care | "Nursing Care at Home \| Expert Clinical Support in Sydney" | 56 ✅ |
| /services/personal-care | "Personal Care & Daily Support \| Respectful In-Home Help" | 55 ✅ |
| / (homepage) | "Gentle Care Nursing Services \| In-Home Nursing & Care Services" | 62 |

- **Impact:** Low-medium. Three service titles will truncate.
- **Fix:** trim to ≤60. E.g. `"Overnight Support & Sleepover Care | Sydney"` (44), `"Assistance with Daily Living | In-Home Support Sydney"` (53), `"Community Participation Support | Sydney NDIS"` (47).
- **Priority:** Medium.

#### O4. ⚠️ Static "policy" pages have no meta description

[src/app/privacy/page.tsx:10](../src/app/privacy/page.tsx#L10) and [src/app/terms/page.tsx:10](../src/app/terms/page.tsx#L10) actually do set a description — re-checked: both have descriptions. **False alarm; no action.** (Tooling counted them as 0 because the descriptions use `${SITE.name}` template literals which the static-string regex skipped.)

#### O5. ⚠️ One blog title is 71 chars

[src/content/blog.ts](../src/content/blog.ts) — `"Understanding NDIS In-Home Nursing: What's Covered and How to Access It"` (71 chars). Will truncate.

- **Fix:** consider shorter alternatives, e.g. `"NDIS In-Home Nursing: What's Covered and How to Access It"` (58). Other blog titles are within range.
- **Priority:** Low (single post, low traffic likely).

#### O6. ✅ Heading hierarchy

Spot-check across `ServicePageLayout`, `ServiceRegionPageLayout`, area page, FAQ page, guides, blog, home, about, referral, referrers, contact, services index — every page renders exactly one H1 and uses a clean H2/H3 structure. No skip-levels found.

**No action.**

#### O7. ✅ URL structure

- Lowercase, hyphenated, descriptive.
- No `?param=` URLs in the sitemap.
- No session IDs, no faceted-nav explosion.
- Trailing-slash strategy consistent (no trailing slash, except `/`).

**No action.**

#### O8. ✅ Image alt text

Spot-check: `Header`, `Footer`, `AboutUsSection`, `BlogCard`, `Hero`, `WhoWeHelp`, `ServiceCards`, `WhyDifferent` all pass `alt`. The pattern uses `sectionImageAlt` props (per-component caller-supplied) or `post.featuredImageAlt ?? post.title` for blog. Some fall back to generic strings ("In-home care") when an explicit alt isn't provided — acceptable but not ideal.

- **Optional fix:** make alt props non-optional in components like `ServiceCards.tsx:50` (currently `sectionImageAlt ?? "In-home care"`) so callers always supply specific alt text.
- **Priority:** Low.

#### O9. ✅ Keyword cannibalization

Looked for cannibalization risks — `/services/nursing-care` vs `/services/complex-care`, `/ndis` vs `/services/[service]/[region]?service=ndis-services`, `/dva` vs `/services/dva-community-nursing/[region]`. Each pair has a clear intent split (national service hub vs. regional landing) and the URL structure + internal anchors keep them separated. No urgent cannibalization.

**No action**, but worth re-checking once GSC has 90 days of data.

#### O10. ⚠️ Default `keywords` field still set in `metadata.ts`

[src/lib/metadata.ts:18-25](../src/lib/metadata.ts#L18) and [src/app/layout.tsx:46-55](../src/app/layout.tsx#L46) both set a `keywords` array. Google has ignored the `meta keywords` tag since 2009. Per-page `keywords:` overrides don't help and make the codebase look like it's keyword-stuffing.

- **Impact:** Zero ranking impact, but the **AI SEO** finding from Princeton GEO (-10% visibility for keyword stuffing) is a quiet risk if AI engines parse the field. Cleaner to remove.
- **Fix:** remove `keywords` from `defaultMetadata` and from every `createMetadata({ keywords: [...] })` call. Should be a single PR with grep + delete.
- **Priority:** Low (cosmetic + minor AI-SEO upside).

### 2.3 Content quality / E-E-A-T

#### C1. ⚠️ E-E-A-T signals are present but not visible

You have a Founder & Clinical Director (Gemma) with 10+ years of experience defined in [src/content/about.ts:73-87](../src/content/about.ts#L73), but:

- No author byline on guides, blog posts, or service pages.
- No "reviewed by" attribution on any clinical content.
- No AHPRA registration type on the about page.

This was already covered in the AI SEO audit (§4.6). Repeating here because it's also a traditional SEO E-E-A-T signal — Google's medical-content quality guidelines (YMYL) explicitly weight clinician attribution.

**Already deferred pending Gemma's input.**

#### C2. 🚨 `MILESTONES` violates the binding voice rule on years

Already flagged in `AI_SEO_AUDIT.md` §8 — repeating because it's a content issue too. [src/content/about.ts:109-139](../src/content/about.ts#L109) lists "2018", "2019", "2020", "2022", "2025" as milestones. The voice rule says: *"Do NOT use specific years/duration claims ('since 2014', 'X+ years operating')."*

- **Fix:** rewrite milestones without years (or remove). E.g. "Founded by a clinician with over 10 years of hands-on experience"; "Registered NDIS provider"; "Contracted to provide DVA Community Nursing services"; "Coverage extended across Greater Sydney".
- **Priority:** High (binding rule violation; surfaces on /about).

#### C3. ⚠️ No content for "private nursing pricing" intent

[src/app/private-nursing/page.tsx](../src/app/private-nursing/page.tsx) has no pricing section. Search intent for "private nursing Sydney cost" / "private nursing rates Sydney" lands on competitor pages. Already in AI SEO audit deferred list — flagging here too.

**Already deferred pending Gemma's input.**

#### C4. ⚠️ Blog updated dates may be stale

Spot-check [src/content/blog.ts](../src/content/blog.ts) — blog posts have `publishedAt` and `updatedAt` fields, used in `getArticleSchema`. Confirm in a future content review that the `updatedAt` actually reflects the most recent edit; otherwise Google sees stale dateModified.

- **Priority:** Low (process item).

### 2.4 Authority & links (out of scope for repo audit)

Cannot evaluate backlinks, GBP completeness, NAP citations, or domain authority from inside the repo. These are tracked in [docs/AI_SEO_AUDIT.md §4.10–4.18](AI_SEO_AUDIT.md). Use Ahrefs / Semrush / GSC links report for a baseline.

---

## 3. Prioritized action plan

### 3.1 High priority (ship this week)

1. **Fix service-region title template** — drop double-Sydney, use `shortTitle`, keep all 30 titles under 60 chars. Edit point: [src/content/service-regions.ts:581](../src/content/service-regions.ts#L581).
2. **Tighten area-page meta descriptions to ≤160 chars** — drop suburbs from description (they live in the body), keep DVA wording exact. Edit point: [src/content/areas-content.ts:44](../src/content/areas-content.ts#L44).
3. **Trim 3 service-page titles over 60 chars** — `/services/overnight-support`, `/services/assistance-with-daily-living`, `/services/community-participation`.
4. **Fix `MILESTONES` voice-rule violation** — rewrite or remove year markers in [src/content/about.ts:109-139](../src/content/about.ts#L109).

### 3.2 Medium priority (next 2 weeks)

5. **Replace `<img>` with `next/image` in `BlogCard`** — Core Web Vitals lift on /blog. [src/components/sections/BlogCard.tsx:26](../src/components/sections/BlogCard.tsx#L26).
6. **Trim homepage title from 62 → ≤60** — current: `"Gentle Care Nursing Services | In-Home Nursing & Care Services"`. Suggest `"Gentle Care Nursing Services | In-Home Nursing Sydney"` (54).
7. **Trim "Understanding NDIS In-Home Nursing…" blog title** to under 60 chars.

### 3.3 Low priority (housekeeping)

8. **Remove `keywords` from default and per-page metadata** — zero benefit, mild AI-SEO downside.
9. **Add `Strict-Transport-Security` header** in `netlify.toml`.
10. **Sitemap `lastModified`** — derive from content `updatedAt` / `reviewedAt` instead of `new Date()`.
11. **Verify `NEXT_PUBLIC_SITE_URL` in Netlify production and previews** — ensure canonicals always resolve to `https://gentlecarenursing.com.au`.
12. **Make alt text non-optional** in component props that currently fall back to generic strings.

### 3.4 Already covered or deferred

- **Schema markup** — covered in [docs/AI_SEO_AUDIT.md](AI_SEO_AUDIT.md) and shipped in PR #8.
- **Clinical-reviewer byline / E-E-A-T** — deferred pending Gemma's confirmation (see AI SEO audit §6).
- **AggregateRating wiring** — deferred pending real GBP data (see AI SEO audit §6).
- **`gbpUrl`, `googleUrl`** — deferred pending GBP confirmation.
- **GSC query mining for CTR/CWV opportunities** — covered in [docs/GSC_AI_AUDIT.md](GSC_AI_AUDIT.md).

---

## 4. Open questions for Gemma / the team

1. **Brand suffix in service-region titles** — willing to drop "| Gentle Care Nursing" (or shorten to "| GCN") on programmatic regional pages to keep titles under 60 chars? Trade-off: brand visibility in SERP vs. CTR from non-truncated title.
2. **Suburb list in area-page meta descriptions** — okay to drop suburbs from the meta description (they remain in the page body)? Best path to ≤160 chars without breaking the binding DVA wording rule.
3. **`MILESTONES` rewrite** — keep the about-page section without years, or remove it entirely?

---

## 5. Implementation log

### Pass 2 — 2026-05-07 (housekeeping + blog CWV)

Branch: `chore/seo-housekeeping-and-blog-cwv`.

- **T5 — `BlogCard` `<img>` → `next/image`.** [src/components/sections/BlogCard.tsx:26](../src/components/sections/BlogCard.tsx#L26): now uses `Image` with `fill` and a responsive `sizes` attribute matched to the blog grid. Restores responsive image selection, lazy-loading defaults, and AVIF/WebP conversion. CWV lift on `/blog` and any other surface that renders `BlogCard`.
- **T2 — Sitemap `lastModified` from content dates.** [src/app/sitemap.ts](../src/app/sitemap.ts): blog and guide entries now use the post's `updatedAt`/`publishedAt` and the guide's `reviewedAt`/`publishedAt`. Static pages use a new `SITE_LAST_UPDATED` constant in [src/lib/constants.ts](../src/lib/constants.ts) — bump it manually when copy or page structure changes ship.
- **T4 — HSTS header added.** [netlify.toml](../netlify.toml): `Strict-Transport-Security = "max-age=31536000; includeSubDomains"`. No `preload` (intentionally — preload is irreversible; safe default).
- **O10 — `keywords` arrays removed.** Stripped from `defaultMetadata` ([src/lib/metadata.ts](../src/lib/metadata.ts)), root `layout.tsx`, and 14 page files (`/aged-care`, `/dva`, `/ndis`, `/private-nursing`, `/services`, and the 9 service-detail pages). Google has ignored `meta keywords` since 2009; Princeton GEO research suggests keyword stuffing reduces AI visibility by 10%, so cleaner to remove.
- TypeScript and ESLint clean.

Skipped:

- **O8** — alt-text non-optional in `ServiceCards.tsx` and `WhoWeHelp.tsx`. Both components are unused in the app (no callers found via grep), so the fallback strings are dead code paths. Tightening dead code isn't worth the noise.
- **T3 (env-var verification)** — requires Netlify dashboard access. Action item for the team: confirm `NEXT_PUBLIC_SITE_URL` is exactly `https://gentlecarenursing.com.au` in production and previews.

### Pass 1 — 2026-05-07 (titles, descriptions, voice rule)

Shipped on branch `chore/seo-audit-titles-descriptions` (PR #9, merged):

- **O1 — Service-region title template fixed.** [src/content/service-regions.ts](../src/content/service-regions.ts#L580): now uses `service.shortTitle`, drops the second "Sydney" for regions whose names already contain it, and shortens the brand suffix to "Gentle Care". All 30 combos now ≤62 chars (29 of 30 ≤56).
- **O2 — Area-page meta description trimmed.** [src/content/areas-content.ts](../src/content/areas-content.ts#L37): suburbs moved out of the description (still in body), redundant ", Sydney" suffix dropped for regions already containing "Sydney". All 6 area descriptions now ≤160 chars. DVA wording preserved exactly per voice rule.
- **O3 — Three over-length service-page titles trimmed.** `/services/overnight-support` (64→55), `/services/assistance-with-daily-living` (63→54), `/services/community-participation` (60→55).
- **O5 — Long blog title trimmed.** `Understanding NDIS In-Home Nursing: …` → `NDIS In-Home Nursing: …` (71→58).
- **O6 — Homepage title trimmed.** 62→54: now `"Gentle Care Nursing Services | In-Home Nursing Sydney"`.
- **C2 — `MILESTONES` voice-rule violation fixed.** [src/content/about.ts:108-145](../src/content/about.ts#L108): replaced 2018/2019/2020/2022/2025 year badges with stage labels (Start, NDIS, DVA, Sydney, Today). Visual timeline preserved; binding voice rule on years now respected.
- TypeScript `tsc --noEmit` clean.

Deferred (need Gemma's input or already tracked in AI SEO audit):

- **T5** — `<img>` → `next/image` in `BlogCard`. Low-risk but needs a quick visual check; bundled into next iteration.
- **C1, C3** — clinician byline / pricing content; tracked in `AI_SEO_AUDIT.md` §6.
- **T2, T4, O8, O10, T3** — housekeeping items (sitemap lastmod, HSTS, alt text non-optional, remove `keywords`, env-var verification). Worth a follow-up batch PR but not blocking.

## 6. Related documents

- [docs/AI_SEO_AUDIT.md](AI_SEO_AUDIT.md) — AI search citation audit and phased plan
- [docs/GSC_AI_AUDIT.md](GSC_AI_AUDIT.md) — Google Search Console query workflow
- `.agents/product-marketing-context.md` — voice rules and positioning (binding)
- `docs/COPY_STYLE.md` / `docs/COPY_BRIEF.md` — site copy standards
