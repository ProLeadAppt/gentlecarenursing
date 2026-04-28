# Gemma Wording Audit — Design Spec

**Date:** 2026-04-20
**Source:** Email from Gemma (clinical lead), 2026-04-19
**Goal:** Sitewide wording audit before go-live to remove commercial-sounding language, correct DVA terminology, align with current aged-care funding model, soften unverifiable claims, and remove un-consented testimonials.

## Scope

Single PR, single implementation plan. All changes are copy edits in `.ts`, `.tsx`, and one `.txt` file. No layout, design system, or component-architecture changes. The `<Testimonials>` component itself stays intact — only its content changes.

## Decisions (locked)

### 1. "Boutique" → context-appropriate replacement (Gemma examples literal)

| Original | Replacement |
|---|---|
| "Clinician-Led · Boutique · Sydney" (Hero eyebrow) | "Clinician-Led · Personalised · Sydney" |
| "Our Boutique Philosophy" | "Our Care Philosophy" |
| "Boutique Care Model" / "Boutique Difference" | "Personalised Care Model" |
| "Boutique Aged Care" (Footer nav link) | "Aged Care at Home" |
| All other "boutique" adjectives | "personalised" |

**Rule:** Where Gemma gave a specific example, match it verbatim. Otherwise default to "personalised". Never use "boutique" anywhere.

### 2. Experience claims — personal, not company

**Long-form (full sentences):**
"Led by a care professional with over 10 years of hands-on experience in disability, aged care and in-home support."

**Short pills/labels:**
"10+ Yrs Clinician Experience"

**Affected files:**
- `src/components/sections/Hero.tsx:35` — credential pill
- `src/app/services/page.tsx:72` — uses long-form
- `src/components/sections/TrustMarquee.tsx:10` — pill
- `src/components/sections/WhyDifferent.tsx:98` — stat tile
- `src/content/blog.ts:87` — blog post intro
- `src/content/services.ts:1072` — long-form rewrite

### 3. "Since 2014" → personal-experience framing

| Original | Replacement |
|---|---|
| Footer.tsx:72: "A boutique nursing service dedicated to quality over volume. Providing clinical excellence across Sydney since 2014." | "A nursing service dedicated to quality over volume. Led by a care professional with over 10 years of hands-on experience." |
| AboutUsSection.tsx:53 heading: "Clinical Excellence Since 2014" | "Led by Over a Decade of Hands-On Experience" |

### 4. Unverified numbers removed

- about.ts:13 "13+ years" → "over 10 years"
- about.ts:104 "approximately 8 nurses and 30 carers/support staff" → "a small clinical team"
- about.ts:138 "Smaller client loads, 38 dedicated staff, and a 24-hour response guarantee" → "Smaller client loads, a dedicated clinical team, and a clear response window"
- llms.txt:46 "10+ years of experience; 1,300+ clients supported" → "Led by a care professional with over 10 years of hands-on experience"

### 5. DVA wording — contracted, not registered/approved

Long-form descriptions (DVA page intro, llms.txt, schema.org):
"Gentle Care Nursing Services is a DVA contracted Community Nursing provider, supporting eligible Veteran Card holders with clinically required nursing and personal care services at home."

Short pills/badges:
"DVA Contracted Provider"

Audit list:
- Footer.tsx:82 "DVA Provider" → "DVA Contracted Provider"
- gmb-services.ts:55 "DVA Approved Provider" → "DVA Contracted Community Nursing Provider"
- services.ts:258 "Registered DVA Provider" → "DVA Contracted Community Nursing Provider"
- about.ts:65 "Registered DVA community nursing provider" → "DVA Contracted Community Nursing Provider"
- about.ts:124 "DVA Approved Provider" → "DVA Contracted Community Nursing Provider"
- CredentialsSection.tsx:14 "Registered DVA community nursing provider" → "DVA Contracted Community Nursing Provider"
- Hero.tsx:34 credential "DVA Approved" → "DVA Contracted"
- ReferralSection.tsx:74 "Certified NDIS & DVA Registered Provider" → "Registered NDIS Provider · DVA Contracted Community Nursing"
- TrustBadge.tsx:8, TrustBar.tsx:13, TrustMarquee.tsx:9 "Registered DVA Provider" → "DVA Contracted Provider"
- dva/page.tsx:9 metadata description: rewrite using Gemma's verbatim long-form sentence

### 6. Aged care — Support at Home model

**Lead paragraph rewrite (aged-care/page.tsx):**
"We support older Australians through Support at Home, DVA, and private care arrangements. We can also work with clients, families and care partners to deliver approved in-home nursing and personal care services."

**Term replacements in user-facing copy:**
- "Home Care Packages" → "Support at Home" (when describing what we serve)
- "Home Care Package recipients" → "Support at Home recipients"
- Funding-list contexts that historically named both programs: keep "CHSP" as a real ongoing program but lead with "Support at Home" instead of "Home Care Packages"

**FAQ updates:** services.ts:398, services.ts:642, services.ts:759, services.ts:1104, faq.ts:24, faq.ts:76, homepage.ts:236, areas-content.ts:27, blog.ts:177, guides.ts:111, llms.txt:10, llms.txt:29, llms.txt:57 — all rewritten to lead with Support at Home.

**Blog post (blog.ts:177):** "Home Care Packages: More comprehensive support with four levels of funding" → "Support at Home: The current government-funded in-home aged care program"

### 7. "24-hour response guarantee" — softened

- Hero.tsx:229 badge "24h Response Guarantee" → "Aim to respond within 24 hours"
- homepage.ts:163 stat `{ value: "24hr", label: "Response Guarantee" }` → `{ value: "~24hr", label: "Response Window" }`
- about.ts:147 same stat → same replacement
- about.ts:138 milestone "Smaller client loads, 38 dedicated staff, and a 24-hour response guarantee" → see #4
- blog.ts:140 "Faster response times (within 24 hours guaranteed)" → "Faster response times (we aim to respond within 24 hours)"
- CredentialsSection.tsx:19 title "24-hour response" → "Quick response window"

All other "respond within 24 hours" / "personal response within 24 hours" instances stay as-is — they already match Gemma's preferred *"We aim to respond within 24 hours"* tone.

### 8. "Hyper-personalized clinical care"

BentoServiceGrid.tsx:47 → "personalised clinical care"

### 9. "24/7 support"

homepage.ts:266 FAQ answer rewrite to Gemma's verbatim:
"Yes. We can provide overnight support and extended hours depending on care needs, funding and staff availability."

### 10. Testimonials — placeholder on home, removed from service pages

**Home page (HomePageContent.tsx):** Replace `<Testimonials testimonials={HOMEPAGE_TESTIMONIALS} ... />` with a placeholder section that uses the same `<Section>` wrapper for layout consistency, displaying:
> "Client stories are shared only with consent. Testimonials coming soon."

Delete `HOMEPAGE_TESTIMONIALS` from `src/content/homepage.ts`.

**Service pages (ServicePageLayout.tsx:391):** Conditionally render the `<Testimonials>` block only when `data.testimonials.length > 0`. Then remove the `testimonials` arrays from services.ts (3 services have them: post-hospital, complex care, nursing care) — service pages no longer show testimonials.

**About page (about.ts:83):** Quote attributed to Gemma — this is from the founder, not a client testimonial. Keep as-is unless it includes wording flagged elsewhere (verify during execution).

### 11. Schema.org and llms.txt sweep

- `src/lib/schema.ts` — scan all `description` fields for boutique / "since 2014" / DVA-registered / 10+ years company claims and apply same replacements
- `public/llms.txt` — apply DVA wording, Support at Home, drop unverified numbers, drop "boutique"

### 12. OG card static PNGs

- Audit `tools/generate-og-cards.tsx` config for "boutique" or "DVA Approved/Registered" subtitles
- If any wording flagged → update config and regenerate the 8 PNGs in `public/images/og/` via `npx tsx tools/generate-og-cards.tsx`

## Out of scope

- Layout, design system, color, component architecture — none change
- Performance work (separate PR already merged)
- Founder bio in about.ts:18-31 — keep unless it contains flagged wording
- Image swaps, structural moves
- New features

## File list (touched)

**Content (text-only edits):**
- src/content/about.ts
- src/content/homepage.ts
- src/content/services.ts
- src/content/faq.ts
- src/content/areas-content.ts
- src/content/blog.ts
- src/content/guides.ts
- src/content/gmb-services.ts
- public/llms.txt

**Components (text edits + 1 conditional render):**
- src/components/layout/Footer.tsx
- src/components/sections/Hero.tsx
- src/components/sections/AboutUsSection.tsx
- src/components/sections/BentoServiceGrid.tsx
- src/components/sections/CredentialsSection.tsx
- src/components/sections/HomePageContent.tsx (testimonials → placeholder)
- src/components/sections/ReferralSection.tsx
- src/components/sections/ServicePageLayout.tsx (conditional testimonials)
- src/components/sections/TeamGrid.tsx
- src/components/sections/Testimonials.tsx (no change unless audit finds copy inside)
- src/components/sections/TrustBadge.tsx
- src/components/sections/TrustBar.tsx
- src/components/sections/TrustMarquee.tsx
- src/components/sections/WhyDifferent.tsx

**Pages:**
- src/app/aged-care/page.tsx
- src/app/areas/[region]/page.tsx
- src/app/dva/page.tsx
- src/app/referrers/page.tsx
- src/app/services/page.tsx

**Schema + tooling:**
- src/lib/schema.ts (audit + edits if matches found)
- tools/generate-og-cards.tsx (audit + edits if matches found)
- public/images/og/*.png (regenerated only if generator config changes)

## Verification

- `npx tsc --noEmit` clean after every batch of edits
- Visual spot-check via `npm run dev` on home, /about, /aged-care, /dva, /services, one /areas/{slug}, one /blog/{slug}
- Grep audit before commit:
  - `boutique` (case-insensitive) → 0 hits in src/, public/llms.txt, tools/
  - `since 2014` → 0 hits in src/, public/, tools/
  - `13\+ years|38 dedicated staff|1,300\+ clients|approximately 8 nurses` → 0 hits
  - `DVA (Approved|Registered) Provider` → 0 hits
  - `Response Guarantee` → 0 hits
  - `24/7` → 0 hits in user-facing copy
  - `hyper.?personali` → 0 hits
- Manual check of Hero, Footer, About, Aged Care, DVA pages in browser before merge

## Rollout

Single PR off main, branched from latest `d7f600b`. Worktree-based isolation. Subagent-driven development with one task per logical group of files. Final code review pass before merge.
