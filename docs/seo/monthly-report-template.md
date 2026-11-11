# Gentle Care Monthly Website Performance Report

**Reporting month:** [Month Year]
**Prepared for:** Gemma, Gentle Care Nursing Services
**Prepared by:** Munyal
**Data coverage:** [Complete month / partial month and reason]
**Reporting timezone:** [Verified source timezone]
**Deployed implementation and changes:** [Exact version/period; distinguish earlier GHL from current Resend delivery]

Use **unavailable**, not zero, when data cannot be accessed or verified. Source-code checks do not establish GA4 collection, inbox receipt or business outcomes. Apply [the measurement specification](measurement-specification.md); no analytics configuration changes are authorised by this template.

## Executive summary

### What improved

1. [Evidence-backed improvement]
2. [Evidence-backed improvement]
3. [Evidence-backed improvement]

### What needs attention

1. [Evidence-backed concern]
2. [Evidence-backed concern]
3. [Evidence-backed concern]

### Highest-priority action next month

[One action, why it matters, and the expected business outcome.]

## 1. Website traffic

| Metric | This month | Previous month | Change | Same month last year | Notes |
|---|---:|---:|---:|---:|---|
| Users | | | | | |
| New users | | | | | |
| Sessions | | | | | |
| Engaged sessions | | | | | |
| Engagement rate | | | | | |
| Views | | | | | |

### Traffic sources

| Channel | Sessions | Change | Attributed provider-accepted events | Event/session rate | Attribution limits |
|---|---:|---:|---:|---:|---|
| Organic Search | | | | | |
| Direct | | | | | |
| Referral | | | | | |
| Organic Social | | | | | |
| Paid Search | | | | | |
| Other | | | | | |

## 2. Most visited pages

| Page | Views | Organic entrances | Provider-accepted events observed | Change | Recommended action |
|---|---:|---:|---:|---:|---|
| | | | | | |

## 3. Google organic search

| Metric | This month | Previous month | Change |
|---|---:|---:|---:|
| Clicks | | | |
| Impressions | | | |
| CTR | | | |
| Average position | | | |

### Gaining queries and pages

| Query or page | Clicks | Impressions | Position | Change | Opportunity |
|---|---:|---:|---:|---:|---|
| | | | | | |

### Declining queries and pages

| Query or page | Clicks | Impressions | Position | Change | Response |
|---|---:|---:|---:|---:|---|
| | | | | | |

## 4. Priority service rankings

> GSC average position, fixed organic rank and Google Maps grid rank are different measures. They are reported separately.

| Keyword | GSC avg. position | Organic tracker | Maps top-3 grid share | Change | Landing page |
|---|---:|---:|---:|---:|---|
| DVA community nursing Sydney | | | | | `/dva` |
| DVA nursing provider Sydney | | | | | `/dva` |
| NDIS nursing Sydney | | | | | `/ndis` |
| registered NDIS nursing provider Sydney | | | | | `/ndis` |
| in-home nursing Sydney | | | | | `/services` |
| aged care at home Sydney | | | | | `/aged-care` |
| complex care at home Sydney | | | | | `/services/complex-care` |
| post-hospital care Sydney | | | | | `/services/post-hospital-care` |
| private nursing Sydney | | | | | `/private-nursing` |
| wound care at home Sydney | | | | | [confirm target] |

## 5. Enquiry acceptance and later outcomes

| Measure | Contact | Referral | Total | Evidence and limitations |
|---|---:|---:|---:|---|
| Distinct provider receipt IDs | | | | Resend acceptance only; exclude feedback/unrelated mail |
| Raw GA4 acceptance events | | | | `generate_lead` and `referral_submit`; not unique enquiries |
| Distinct GA4 receipt IDs | | | | Only when authorised event-level data is available |
| Matched provider/GA4 receipt IDs | | | | Unavailable when either source lacks usable IDs |
| Inbox-confirmed enquiries | | | | Separate authorised receipt confirmation |
| Qualified enquiries | | | | Care-team definition and aggregate intake evidence |
| Booked assessments | | | | Verified operational outcome, not inferred from events |

### Reconciliation notes

- Count distinct receipt IDs rather than summing raw GA4 event counts. Identical email retries can share one Resend receipt within 24 hours; this is not person-level deduplication.
- Note duplicate events, conflicting form types, provider-only receipts, GA4-only IDs and data gaps.
- Provider acceptance does not confirm inbox receipt, a booking or service availability. A timeout or missing GA4 event does not establish non-delivery.
- State the qualification rule and evidence owner. Use aggregate intake records; do not include names, health information, referral text or receipt IDs in this report.
- Do not assign campaign-specific qualified outcomes without a verified attribution path. Current form payloads do not forward UTMs to Resend.

### Supporting actions

| Action | GA4 count | Interpretation |
|---|---:|---|
| Phone clicks | | Clicks, not connected calls |
| Email clicks | | Clicks, not sent emails |
| Form opens | | Opens, not accepted enquiries |
| Form errors | | Failed confirmation, possibly uncertain provider outcome |

## 6. Local search presence

| Metric | This month | Previous month | Change |
|---|---:|---:|---:|
| Google Business Profile views | | | |
| Website clicks | | | |
| Calls | | | |
| Direction requests | | | |
| Review count | | | |
| Average rating | | | |

### Reviews and local authority

- New reviews: [count]
- Review themes: [aggregate summary]
- Review responses completed: [count]
- Citation/profile changes: [summary]

## 7. AI search visibility

| Platform | Prompt set coverage | Brand mentioned | Correct services | Citation/link present | Material errors |
|---|---:|---:|---:|---:|---|
| Google AI results | | | | | |
| ChatGPT | | | | | |
| Gemini | | | | | |
| Perplexity | | | | | |
| Claude | | | | | |
| Grok | | | | | |

AI results vary by model, date, account and location. This section is a directional benchmark, not a guaranteed ranking.

## 8. Page speed, uptime and technical health

| Check | Result | Target | Status | Action |
|---|---:|---:|---|---|
| Mobile LCP | | ≤2.5 s | | |
| Mobile INP | | ≤200 ms | | |
| Mobile CLS | | ≤0.1 | | |
| Uptime | | ≥99.9% | | |
| Sitemap URLs returning 200 | | 100% | | |
| Unknown URL returns true 404 | | 404 | | |
| Provider acceptance on authorised tests | | Valid receipt for each expected acceptance | | |
| Inbox receipt on authorised tests | | Separate receiving-owner confirmation | | |
| Indexing issues | | 0 critical | | |

### Technical incidents

[Incident, date, impact, resolution and prevention. State “None identified” only when monitoring supports it.]

## 9. SEO and website work completed

| Date | Work completed | Reason | Status | Evidence |
|---|---|---|---|---|
| | | | | |

## 10. Priorities for next month

| Priority | Evidence | Action | Expected outcome | Owner |
|---:|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

## Data notes and limitations

- [Data gap, tracking change, partial-month caveat or source limitation]
- [Provider/GA4 reconciliation gaps and the distinction between acceptance, receipt and qualification]
- [Any unavailable source]
