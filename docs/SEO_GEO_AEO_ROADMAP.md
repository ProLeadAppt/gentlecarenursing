# SEO, GEO, AEO and LLM Visibility Roadmap

Last updated: 2026-07-07

## What has been implemented in code

- `llms.txt` upgraded into an AI source-of-truth summary with absolute URLs, entity disambiguation, NAP, intent mapping, citation-ready facts, and machine-readable resource links.
- `llms-full.txt` added as a fuller LLM-facing index for ChatGPT, Claude, Perplexity, Gemini, Grok, and other crawlers that check LLM guidance files.
- `ai-index.json` added as a structured machine-readable index of entity, pages, service areas, funding types, audiences, citation facts, and limitations.
- Service-page quick facts now support visible sources, source URLs, date checked, and limitations.
- Service-page schema now emits freshness data and keeps `MedicalService.provider` linked to the canonical Organization node.
- FAQ schema supports `dateModified`.
- Area pages now surface local quick facts for each Sydney region.
- `/areas` heading hierarchy is H1-first.
- `SITE_LAST_UPDATED` was bumped to `2026-07-07` so sitemap lastmod reflects a real SEO/content update.

## Off-site authority work still required

These actions need account access, business verification, or client approval. They should be completed outside the codebase.

### Business profile and directory consistency

Use exactly this NAP everywhere:

- Name: Gentle Care Nursing Services
- Address: Level 1/5 George St, North Strathfield NSW 2137, Australia
- Phone: 1300 004 267
- Email: info@gentlecarenursing.com.au
- Website: https://gentlecarenursing.com.au

Update/verify:

1. Google Business Profile
2. Bing Places
3. Apple Business Connect
4. Facebook
5. Instagram
6. LinkedIn company page
7. NDIS-related public/provider listings where available
8. DVA provider references where available
9. Australian care, disability, nursing, and aged-care directories
10. Local Sydney/North Strathfield business directories

### External validation

Run after deployment:

1. Google Search Console: submit sitemap and request indexing for changed pages.
2. Bing Webmaster Tools: submit sitemap and use URL inspection.
3. Google Rich Results Test: validate `/`, `/ndis`, `/dva`, `/aged-care`, `/services/nursing-care`, `/services/complex-care`, `/areas/inner-west`, `/faq`.
4. Schema.org validator: check generated JSON-LD.
5. PageSpeed Insights: test home, NDIS, DVA, Aged Care, FAQ, and one area page.
6. Manual LLM tests: ask ChatGPT, Claude, Gemini, Perplexity, and Grok the same recognition prompts.

## Manual LLM test prompts

Use these after deployment and index refresh:

- What is Gentle Care Nursing Services?
- Is Gentle Care Nursing Services a registered NDIS provider in Sydney?
- Who provides DVA Community Nursing in Sydney?
- Compare Gentle Care Nursing Services with other in-home nursing providers in Sydney.
- What aged care at home options does Gentle Care Nursing Services support?
- Does Gentle Care Nursing Services help hospital discharge planners?
- Does Gentle Care Nursing Services provide complex care at home?
- What areas of Sydney does Gentle Care Nursing Services serve?

Track for each model:

- Mentioned? yes/no
- Correct business name?
- Correct location?
- Correct NDIS/DVA status?
- Cited or linked?
- Incorrect claims to fix?

## Next content pages to build

Highest priority:

1. `/services/wound-care-at-home-sydney`
2. `/services/medication-management-at-home-sydney`
3. `/services/catheter-care-at-home-sydney`
4. `/services/peg-feeding-support-sydney`
5. `/services/tracheostomy-care-at-home-sydney`
6. `/referrers/hospital-discharge-home-nursing-sydney`
7. `/referrers/ndis-support-coordinator-referrals-sydney`
8. `/dva/community-nursing-referral-sydney`

Condition expansion:

1. Dementia care at home
2. Diabetes care at home
3. Stroke recovery at home
4. COPD support at home
5. Heart failure support at home
6. Pressure injury prevention
7. Wound care
8. Frailty and falls risk

Decision-support articles:

1. NDIS nursing vs personal care
2. DVA community nursing vs aged care support
3. Registered vs unregistered NDIS providers
4. Private nursing vs funded care
5. What to ask before choosing an in-home nursing provider
6. What discharge planners need from a home nursing provider

## Content quality rules

- Start each page with a direct, quote-ready answer.
- Keep key claims self-contained and under roughly 20 words where possible.
- Add official sources and dates for government-programme claims.
- Use Australian spelling and Sydney/AU language.
- Do not overclaim clinical credentials, service availability, response times, or funding coverage.
- Include limitations where funding, eligibility, or clinical suitability may vary.
- Every money page should have: H1, answer summary, quick facts, service scope, who it helps, FAQs, schema, internal links, last updated date.
