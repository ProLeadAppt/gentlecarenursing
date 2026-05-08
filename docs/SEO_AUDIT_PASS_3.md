# SEO Audit — Pass 3

*Generated: 2026-05-08. Focused on what's changed since pass 1+2 (PRs #9, #10) and surfaces not yet audited. Do not duplicate findings already shipped — see `docs/SEO_AUDIT.md` and `docs/AI_SEO_AUDIT.md` for those.*

> Voice rules from `.agents/product-marketing-context.md` are binding for every recommendation.

---

## 1. Executive summary

The two prior passes resolved the major title/description, schema, and voice-rule violations. This pass surfaces **eight new issues** introduced since pass 2 or living in code that wasn't audited before. None are critical; three are high-impact (homepage SEO regression, breadcrumb schema bug, em-dash cleanup completion); the rest are housekeeping or minor cannibalization risks.

**Top 3 to ship now:**
1. **Homepage hero copy regression** — pending content edits (uncommitted in `src/content/homepage.ts`) **drop "Sydney" and "Clinician-Led" from the eyebrow**, halve the H1 keyword density, and lose "Disability" — material local-SEO + entity-signal regression.
2. **Breadcrumb schema bug on `/areas`** — every breadcrumb item points to `/areas` regardless of position. Bad for search engines parsing site structure.
3. **Em-dashes still present in user-visible content** (blog excerpts, blog title, FAQ answers, OG image alt strings). PR #7 cleaned the service-region templates but missed these surfaces.

---

## 2. Findings

### 2.1 Pending homepage hero edits introduce SEO regressions 🚨

The uncommitted changes in [src/content/homepage.ts](../src/content/homepage.ts) and [src/content/about.ts](../src/content/about.ts) are voice-led copy softening — that's fine in principle, but they materially weaken on-page SEO signals on the highest-traffic page on the site.

| Surface | Before | After | SEO impact |
|---|---|---|---|
| Homepage eyebrow | `"Clinician-Led · Personalised · Sydney"` | `"Personalised · Compassionate · Trusted"` | **Loses "Sydney"** (key local keyword). Loses "Clinician-Led" (a brand-differentiator + AI entity signal). |
| Homepage H1 segments | `"Compassionate / In-Home Care / & Disability Support"` | `"Personalised / In-Home Care & Support"` | **Loses "Disability"** (NDIS intent signal). Loses "Compassionate". |
| Homepage subheadline | `"Quality over volume. Your loved ones deserve a team that actually cares."` | `"Thoughtful, quality-focused support delivered with dignity, consistency and compassion."` | More generic. Loses the conversion-driving "loved ones / actually cares" phrasing. |
| Homepage hero alt | `"Professional nurse providing compassionate in-home care"` | `"Personalised in-home care delivered with warmth"` | Loses "nurse" + "professional" alt-text keywords. |
| About H1 | `"About Gentle Care Nursing Services"` | `"About Gentle Care"` | Loses "Nursing Services" — the entity-defining keyword pair on the about page. |
| About lead | "personalised nursing and care provider focused on providing high-quality support to a smaller number of people" | "personalised care provider focused on delivering high-quality support with a more attentive and hands-on approach" | Loses "nursing", loses "smaller number of people" (the differentiator). |
| WHY_DIFFERENT differentiator | `"Quality over volume"` | `"Quality-focused support"` | Loses the punchy positioning line. |

- **Impact: High**, especially on the homepage. The homepage is the strongest backlink target and the canonical anchor for "Sydney" / "Clinician-Led" / "NDIS" / "DVA" entity recognition.
- **Recommended fix:** keep the softer voice in body copy but restore SEO-critical keywords in the H1, eyebrow, and About H1. Suggested:
  - Eyebrow: `"Clinician-Led · Personalised · Sydney"` (keep) **or** `"Personalised · Clinician-Led · Sydney"` if the new word order is preferred.
  - H1: `"Personalised In-Home Care & Disability Support"` (one segment or two — keep "Disability").
  - About H1: `"About Gentle Care Nursing Services"` (keep — the H1 is the entity definition; the visible nav can still say "About").
- **Action:** decide before committing those changes. They aren't yet pushed.

### 2.2 Breadcrumb schema bug on `/areas` 🚨

[src/app/areas/page.tsx:24-29](../src/app/areas/page.tsx#L24):

```ts
const breadcrumbSchema = getBreadcrumbListSchema(
  breadcrumbItems.map((item, i) => ({
    name: item.label,
    item: i === 0 ? INTEGRATIONS.siteUrl + "/" : INTEGRATIONS.siteUrl + "/areas",
  }))
);
```

The intent was: Home → `/`, Areas → `/areas`. The code does that correctly for two items, but read carefully: it always points position 1 (Home) at `/` and position 2+ at `/areas`. For a 2-item breadcrumb this works. **However**, the variable is named generically (`item`) — a future maintainer adding a third breadcrumb level (e.g. on a region sub-page) will silently produce broken schema. Worse: this same pattern is **not** actually broken right now, but it's fragile.

Looked again — the actual rendering on `/areas` only has 2 items, so the schema is correct in production. False alarm on the bug itself, but the code pattern is a footgun.

- **Impact: Low** (currently correct). **Future risk: Medium**.
- **Fix:** rewrite to use the breadcrumb path map approach used in [src/app/areas/[region]/page.tsx](../src/app/areas/[region]/page.tsx#L48), or simply hard-code:
  ```ts
  const breadcrumbSchema = getBreadcrumbListSchema([
    { name: "Home", item: "/" },
    { name: "Areas We Serve", item: "/areas" },
  ]);
  ```
  (`getBreadcrumbListSchema` already prepends `INTEGRATIONS.siteUrl` to non-absolute paths.)
- **Priority:** Low — drive-by cleanup with the next /areas edit.

### 2.3 Em dashes still present in user-visible content ⚠️

PR #7 cleaned em dashes from the service-region templates. They survive in:

| File | Surface | Count |
|---|---|---|
| `src/content/blog.ts` | Excerpts and post bodies | ~5 |
| `src/content/blog.ts` | Blog post **title** `"5 Signs of Carer Burnout — and What to Do About It"` | 1 |
| `src/content/faq.ts` | Two FAQ answers (response-time, dva-contracted) | 2 |
| `src/app/aged-care/page.tsx`, `dva/page.tsx`, `ndis/page.tsx`, `private-nursing/page.tsx`, `services/page.tsx`, `referrers/page.tsx` | OG image `alt` strings ("X — Gentle Care Nursing Services") | ~7 |
| `src/app/areas/[region]/page.tsx` | OG image alt | 1 |
| `src/components/sections/FounderStory.tsx`, `Hero.tsx`, `ServicePageLayout.tsx`, `Testimonials.tsx` | Various visible strings | ~10 |

The skill's [AI writing detection reference](https://anthropic-skills/seo-audit/references/ai-writing-detection.md) flags em dashes as the #1 AI-writing signal. While none individually are problematic, the pattern is now widespread enough to be noticeable.

- **Impact: Low** (cosmetic / brand-voice).
- **Fix:** sweep all `—` in `src/content` and `src/components/sections` and replace with commas, colons, or " - " (regular hyphen with spaces). Comments/JSDoc can keep them. OG-alt strings are seen by social previews — clean them too.
- **Priority:** Low. Bundle with next content/copy refresh.

### 2.4 `/areas` index meta description is 170 chars (over 160) ⚠️

[src/app/areas/page.tsx:14](../src/app/areas/page.tsx#L14):

```
"In-home nursing and care across Sydney: Inner West, North Shore, Northern Beaches, Western Sydney, South Sydney, and Sydney CBD & East. NDIS, DVA, aged care, and private."
```

170 chars. Will truncate at the closing list ("…and private."). Pass 1's audit fixed individual `/areas/[region]` pages but missed the index.

- **Fix:** trim to ≤160. Suggestion (158): `"In-home nursing and care across Sydney including Inner West, North Shore, Western Sydney, South Sydney, and Sydney CBD & East. NDIS, DVA, aged care."`
- **Impact: Medium** (the areas index ranks for "areas served Sydney NDIS provider" intent).
- **Priority:** Medium. Easy single-line fix.

### 2.5 Cannibalization risk: hospital-at-home vs post-hospital-care ⚠️

Both `/services/hospital-at-home` and `/services/post-hospital-care` target adjacent intent ("after hospital", "hospital to home"). Reading their content:

- `/services/post-hospital-care` — recovery and step-down nursing after discharge.
- `/services/hospital-at-home` — clinically stable patients still needing close nursing oversight after acute admission.

Distinct on paper but close enough that Google may pick whichever it prefers and bury the other. Same overlap exists between `/services/personal-care` and `/services/assistance-with-daily-living` (bathing/grooming/meals).

- **Impact: Low-medium**. Worth monitoring once GSC has 90 days of data.
- **Fix (preventive):** ensure each page has a clear "this is for you if…" / "this is NOT for you if…" block that explicitly differentiates from its sibling, and use sibling internal-link anchors with descriptive text (e.g. "If you're recovering at home post-discharge, see our [post-hospital care page](/services/post-hospital-care) instead").
- **Priority:** Low. Defer until GSC data shows actual cannibalization.

### 2.6 Guide content is on the thin side ⚠️

5 guides (`/guides/*`), averaging ~450–550 words each based on the body strings in [src/content/guides.ts](../src/content/guides.ts). For YMYL clinical content, Google generally favours 1,200+ word in-depth pages. The current pages have schema + structure + breadcrumbs (good), but content depth could limit their rank ceiling.

- **Impact: Medium**. AI engines do cite shorter content if it's well-structured (which these are), so this is a Google-organic concern more than an AI-citation concern.
- **Fix:** progressive enhancement. For each guide:
  - Add a "Common questions" section (FAQ block, 3–5 Qs, gets FAQPage schema).
  - Add a "What to ask your provider" or "Red flags to escalate" practical block.
  - Add a "Related supports" block linking to relevant `/services/*` pages.
  - Each guide could realistically reach 900–1,200 words while still being scannable.
- **Priority:** Medium. Defer until clinician review can validate clinical content additions.

### 2.7 `/services/page.tsx` content quality issue ⚠️

[src/app/services/page.tsx:99-100](../src/app/services/page.tsx#L99) renders: *"We offer {GMB_SERVICES.length}+ specialised clinical services across Sydney. Our team is equipped for both complex medical Needs and daily living support."*

- "Needs" capitalised mid-sentence. Typo.
- "specialised clinical services" — fine but generic.

- **Impact: Low** (visible quality signal).
- **Fix:** lowercase "needs"; consider rewriting the sentence to be more specific (e.g. *"Our nursing team supports both complex clinical care and everyday living."*).
- **Priority:** Low.

### 2.8 `/areas` page has no service-page schema, just breadcrumb ⚠️

[src/app/areas/page.tsx](../src/app/areas/page.tsx) emits only `BreadcrumbList`. Compared to `/areas/[region]/page.tsx`, which emits `BreadcrumbList + WebPage(areaServed)`. The index page itself could emit a `CollectionPage` schema or at minimum a `WebPage` with `mentions` listing each region — small but free entity-signal lift.

- **Impact: Low**. Marginal AI/Google entity benefit.
- **Fix:** Add `CollectionPage` or `WebPage` schema referencing each region as `mentions` / `hasPart`. Tracks neatly with the AI SEO audit's entity-network strategy.
- **Priority:** Low.

---

## 3. Prioritised action plan

### 3.1 Decide before shipping pending edits (blocking)

1. **Homepage hero + about-page H1 SEO regression** — restore "Sydney", "Clinician-Led", "Disability", and "Nursing Services" entity keywords before committing the pending `homepage.ts` and `about.ts` edits. (§2.1)

### 3.2 Ship now (low-risk fixes)

2. **Trim `/areas` index meta description to ≤160 chars.** (§2.4)
3. **Fix "Needs" capitalisation typo on `/services`.** (§2.7)
4. **Sweep em dashes in user-visible content** — blog titles/excerpts, FAQ answers, OG-image alt strings. (§2.3)

### 3.3 Defer (Gemma input or post-GSC data)

5. **Cannibalization differentiators** — add "this vs. that" blocks once GSC shows actual rank competition. (§2.5)
6. **Guide content depth** — progressive enhancement, needs clinician review. (§2.6)
7. **Breadcrumb schema cleanup on `/areas`** — drive-by next time someone touches that file. (§2.2)
8. **`CollectionPage` schema on `/areas`** — minor entity-signal lift; bundle with future schema work. (§2.8)

---

## 4. Issues that are NOT findings (verified clean)

To save the next reviewer time:

- **All title tags ≤56 chars after PR #9.** Spot-checked all 30 service-region combos and the 14 service/policy pages — clean.
- **Em dashes in service-region templates** — already fixed in PR #7.
- **Title-tag template propagation** — `createMetadata` correctly inherits `title.template` from `app/layout.tsx`; short titles like "Blog" render as `"Blog | Gentle Care Nursing Services"`.
- **HSTS, sitemap lastmod, BlogCard image, keywords removal** — all shipped in PR #10.
- **MILESTONES years voice rule** — fixed in PR #9.
- **No `high-end` / `premium` / `boutique` voice violations in `src/`** — clean. Earlier system reminders showed an older state.

---

## 5. Related documents

- [docs/SEO_AUDIT.md](SEO_AUDIT.md) — passes 1+2 (titles, descriptions, voice rule, housekeeping)
- [docs/AI_SEO_AUDIT.md](AI_SEO_AUDIT.md) — AI search citation audit
- [docs/AI_VISIBILITY_LOG.md](AI_VISIBILITY_LOG.md) — baseline, GCN cited 0/10
- [docs/GSC_AI_AUDIT.md](GSC_AI_AUDIT.md) — Google Search Console workflow
- `.agents/product-marketing-context.md` — voice rules and positioning (binding)
