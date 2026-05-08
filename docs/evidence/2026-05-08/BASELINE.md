# Post-Deploy Baseline — 2026-05-08

Snapshot taken **immediately after** the three-PR cumulative deploy landed on `origin/main`. This is the "before" reference for measuring the impact of the voice refresh, AEO evidence panels, Person schema, and CWV mobile-perf pass.

## What shipped today

| PR | Title | Commit |
|---|---|---|
| #11 | chore(seo,voice): pass-3 SEO fixes + Gemma's voice-rule refresh | `f5b4783` |
| #12 | feat(aeo): EvidencePanel + Person schema for AI-engine citation | `a5646e1` |
| #13 | perf(cwv): mobile motion gating + AVIF/WebP image config | `8aa7e4b` |

Tip of `main` after deploy: `2375a83`.

---

## Live-site verification (HTML snapshot, 2026-05-08 ~21:33 UTC)

Static HTML for six priority pages saved alongside this doc as gzipped files — `homepage.html.gz`, `about.html.gz`, `ndis.html.gz`, `dva.html.gz`, `aged-care.html.gz`, `nursing-care.html.gz`. Decompress with `gunzip -k <file>` to restore the original. Future re-runs can fetch the same URL today and `diff` to confirm no regression in the schema or evidence panels.

### Voice refresh — visible in static HTML

Confirmed strings extracted from the live homepage:

- `Personalised · Compassionate · Trusted` (new hero eyebrow)
- `Personalised In-Home Care` (new headline)

The previous strings (`Clinician-Led · Personalised · Sydney`, `Compassionate / In-Home Care / & Disability Support`) do not appear on the live homepage.

### AEO Evidence Panels — visible in static HTML

| Page | Heading served | Citable labels confirmed |
|---|---|---|
| `/` | "Quick facts about Gentle Care" | Service area, Response window, Funding accepted, Scope of care |
| `/ndis` | "Quick facts: NDIS in-home nursing" | Registered NDIS provider, Plan management, Funding categories, Scope of support |
| `/dva` | "Quick facts: DVA Community Nursing" | DVA Contracted Community Nursing Provider, Out-of-pocket cost |
| `/aged-care` | "Quick facts: in-home aged care" | Support at Home, Commonwealth Home Support Programme, My Aged Care |
| `/services/nursing-care` | "Quick facts: in-home nursing care" | Clinical staffing, AHPRA-registered nurses |

Panels render as server-side HTML (no `"use client"`) — content is in the initial response body, so AI crawlers extract it on first fetch without executing JavaScript.

### Person schema — visible in static HTML

`/about` emits a Person JSON-LD block with:

- `"@type":"Person"`
- `"@id":"https://gentlecarenursing.com.au/#person-gemma"`
- `"name":"Gemma"`
- `"jobTitle":"Founder"`
- `worksFor` linked to the Organization @id

This is the E-E-A-T signal — Google can now resolve "Gemma is the founder of Gentle Care Nursing Services" structurally, not just by inference.

### Schema graph on the homepage

Live homepage emits the following `@type` values inside `application/ld+json` blocks:

```
City, ContactPoint, Country, GeoCoordinates, HowTo, HowToStep,
MedicalBusiness, Offer, OfferCatalog, OpeningHoursSpecification,
Organization, Place, PostalAddress, Service, State, WebSite
```

`MedicalBusiness` + `Organization` + `WebSite` form the entity backbone Google uses for local-pack inclusion and Knowledge-Graph attribution. `HowTo` + `HowToStep` describe the enquiry-to-care flow as a step-by-step guide AI engines can summarise.

### Image format negotiation (AVIF/WebP)

Verified by hitting the next/image endpoint with explicit `Accept` headers:

| Browser sends | Server returns | Bytes (1080w) |
|---|---|---|
| `Accept: image/avif` | `image/avif` | 74,884 |
| no Accept (defaults to WebP) | `image/webp` | 58,826 |

Source file is 550 KB. Modern browsers now download a 75 KB AVIF for the LCP hero image — about an **86% byte reduction** on the slowest, most-mobile-impactful asset.

---

## What's NOT yet measured (to add at next checkpoint)

The following need a real-device or third-party run and should be captured when the deploy has propagated through Google's CrUX dataset (28-day window):

1. **PageSpeed Insights — Mobile Performance score** for `/`, `/about`, `/ndis`, `/dva`, `/aged-care`, `/services/nursing-care`.
   Run at: https://pagespeed.web.dev/?url=https://gentlecarenursing.com.au
2. **CrUX Field Data** (LCP, INP, CLS) on the same six pages — only updates after 28 days of real-traffic data.
3. **AI engine direct checks** — manual queries against ChatGPT (web), Perplexity, Google AI Overview, Bing Copilot for the 10 priority queries in `docs/AI_VISIBILITY_LOG.md`.

Recommended cadence: capture PSI today (visual screenshot, paste numbers below), re-run at +14 days, +28 days. AI engine checks at +14 days (first signs of recrawl) and +30 days (full picture).

### PSI snapshot — to fill in (run today)

| Page | Mobile Perf | LCP | INP | CLS | Desktop Perf |
|---|---:|---:|---:|---:|---:|
| `/` |  |  |  |  |  |
| `/about` |  |  |  |  |  |
| `/ndis` |  |  |  |  |  |
| `/dva` |  |  |  |  |  |
| `/aged-care` |  |  |  |  |  |
| `/services/nursing-care` |  |  |  |  |  |

> Empty rows are deliberate — fill in by running the URL above for each page on 2026-05-08, then re-run at +14d / +28d to track movement. Field Data ("Origin Summary") is more meaningful than Lab Data for ranking impact.

---

## Cross-reference

- AI visibility baseline (10 priority queries, 0/10 cited): [`docs/AI_VISIBILITY_LOG.md`](../../AI_VISIBILITY_LOG.md) (run 2026-05-07, day before this deploy)
- Voice rules now binding sitewide: [`.agents/product-marketing-context.md`](../../../.agents/product-marketing-context.md)
- SEO pass-3 audit findings: [`docs/SEO_AUDIT_PASS_3.md`](../../SEO_AUDIT_PASS_3.md)

## Next checkpoint

**2026-06-07 (30 days post-deploy).** At that point:

1. Re-run the 10 AEO queries from `AI_VISIBILITY_LOG.md` and add a new dated row.
2. Re-run PSI on the six pages, fill the table above (or copy it into a new dated section).
3. Pull CrUX field data via PageSpeed Insights — by then we should have a partial CrUX sample reflecting post-deploy traffic.
4. Diff the saved HTML snapshots in this folder against fresh fetches — confirms no regression in the schema or evidence panels.
