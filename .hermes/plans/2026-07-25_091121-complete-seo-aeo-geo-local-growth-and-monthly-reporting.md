# Gentle Care SEO, AEO, GEO, Local Growth and Monthly Reporting Implementation Plan

> **For Hermes:** Execute this plan task-by-task, preserving a before-and-after baseline and requiring Tyson's approval before live account, GBP, citation, DNS, paid-tool, push, or deployment changes.

**Goal:** Improve Gentle Care Nursing Services' qualified visibility across Google Search, Google Maps, Bing, AI Overviews, ChatGPT, Claude, Gemini, Perplexity and Grok, while installing reliable enquiry attribution and a concise monthly client report for Gemma.

**Architecture:** Treat this as one operating system rather than separate SEO tasks. First establish trustworthy measurement, then repair technical and conversion blind spots, strengthen local/entity authority, improve high-intent service content, build real off-site corroboration, and report commercial outcomes monthly. Use GSC, GA4, GBP and the CRM as primary evidence. Use SearchAtlas or another rank tracker only as supporting evidence, not as a substitute for first-party data.

**Tech Stack:** Next.js 16, React 19, Netlify, GA4, Google Search Console, Bing Webmaster Tools, Microsoft Clarity, GoHighLevel/LeadConnector, Google Business Profile, Bing Places, Apple Business Connect, Looker Studio, SearchAtlas OTTO, optional Local Falcon/BrightLocal for map-grid tracking, uptime monitor.

---

## Current Verified Baseline

### Already strong

- Production site: `https://gentlecarenursing.com.au/`
- Repository: `ProLeadAppt/gentlecarenursing`, local branch clean and aligned with `origin/main` at `fb37b1c`.
- GA4 loader is present when `NEXT_PUBLIC_GA_ID` is configured.
- Microsoft Clarity is installed.
- SearchAtlas OTTO loader is present.
- Google Search Console, GA4 and Bing Webmaster Tools are connected according to Tyson.
- `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` and `ai-index.json` are live.
- Homepage has a self-referencing canonical, one H1, a description and rendered JSON-LD.
- Organization, MedicalBusiness and WebSite schema are rendered.
- The site already contains answer-first copy, quick facts, service/funding pages, Sydney area pages, suburb pages, condition pages and internal links.
- Google is surfacing the homepage, NDIS, DVA, Aged Care, FAQ, Clinical Nursing and other pages.

### Important gaps or risks identified

1. **Lead measurement is incomplete.** GA4 page-view tracking exists, but the inspected contact forms do not emit `generate_lead`, successful form submission, phone click, email click, referral submission or CTA events.
2. **Gemma's requested enquiry count cannot be trusted until conversions are reconciled.** Website form success, GHL contact creation and GA4 conversion counts need one shared submission ID or another deduplication method.
3. **Rank reporting needs a fixed keyword set.** GSC average position is useful but not a stable local rank tracker. Map-pack visibility needs a grid tracker or a repeatable manual baseline.
4. **Google Business Profile is not yet confirmed in the measurement stack.** GBP is essential for calls, website clicks, direction requests, reviews and local search terms.
5. **Bing Places and Apple Business Connect are not confirmed.** These strengthen local entity consistency and cover Bing/Copilot, Apple Maps and Siri discovery.
6. **Schema needs consolidation and validation.** The homepage renders multiple MedicalBusiness objects, including a minimal node with a Google favicon logo. A single canonical entity graph is preferable.
7. **AI files are strong but stale-dated after future changes.** `llms.txt`, `llms-full.txt`, `ai-index.json`, page schema and sitemap freshness need one controlled update process tied to real content changes.
8. **SearchAtlas OTTO can conflict with source-controlled metadata.** Its live output, performance cost and metadata changes must be audited before relying on it.
9. **All static sitemap routes currently share one site-wide last-modified date.** Future reporting should use truthful page/content dates or omit dates when unknown.
10. **Healthcare/YMYL claims need source and client approval.** NDIS registration, DVA contracted status, AHPRA staffing, funding pathways, response windows, clinical services and out-of-pocket claims must remain conservative and verifiable.
11. **PageSpeed Insights API was quota-blocked during this planning audit.** Performance requires local Lighthouse and GSC Core Web Vitals rather than an invented score.
12. **The repository contains a broad matrix of service-region and suburb pages.** These need similarity, unique-local-proof and doorway-page review before expanding further.

---

## Success Metrics

### Primary commercial metrics

- Qualified website enquiries by service and funding pathway
- Form submissions confirmed in both GHL and GA4
- Phone calls and click-to-call actions
- Referral submissions from coordinators, hospitals, GPs and allied health professionals
- Organic and GBP conversion rate
- Cost-free enquiry growth month over month and year over year

### Search and local metrics

- GSC clicks, impressions, CTR and average position
- Non-brand clicks and impressions
- Priority query visibility for DVA Community Nursing, NDIS nursing, aged care at home, clinical nursing, complex care and post-hospital care
- GBP calls, website clicks, direction requests, messages if enabled, review count and rating
- Google Maps grid visibility for agreed service-location combinations
- Bing clicks/impressions and IndexNow coverage where applicable
- Indexed canonical pages versus expected pages

### AI visibility metrics

- Correct recognition of the Gentle Care entity
- Accurate mention of Sydney, NDIS and DVA status
- Correct service/funding descriptions
- Citation or link to the correct canonical page
- No hallucinated availability, clinical suitability, price or eligibility claims

### Technical metrics

- Core Web Vitals field status from GSC/CrUX
- Lighthouse mobile median of three runs for representative templates
- Uptime percentage and incident count
- 4xx/5xx, broken links, canonical conflicts and indexing errors
- Form-delivery success rate

---

## Phase 1: Access, Baseline and Measurement

### Task 1: Create the source-of-truth scorecard

**Objective:** Capture a dated baseline before changing the site or off-site profiles.

**Create:**
- `docs/seo/monthly-baseline-2026-07.md`
- `docs/seo/keyword-set.csv`
- `docs/seo/entity-nap-source-of-truth.md`

**Collect:**

- GA4: last 28 days, previous 28 days and same period last year where available
- GSC: last 28 days, previous 28 days and same period last year
- Bing Webmaster: same comparison windows
- GBP Performance: calls, website clicks, directions, views, searches and reviews
- GHL: website contacts, referral contacts and source fields
- Netlify: traffic/errors/functions if available
- SearchAtlas: tracked keywords and OTTO changes
- Current indexed pages and GSC Page Indexing status
- Current Core Web Vitals report

**Acceptance criteria:**

- Every metric has a named source and date range.
- Missing data is labelled unavailable, never estimated.
- Brand and non-brand search are separated.
- Website enquiries are reconciled against GHL before being reported.

### Task 2: Lock the reporting keyword set

**Objective:** Make ranking reports repeatable and commercially meaningful.

**Initial keyword groups:**

- DVA Community Nursing Sydney
- DVA nursing provider Sydney
- community nursing for veterans Sydney
- NDIS nursing Sydney
- registered NDIS nursing provider Sydney
- in-home nursing Sydney
- clinical nursing at home Sydney
- complex care at home Sydney
- aged care at home Sydney
- Support at Home provider Sydney
- post-hospital care Sydney
- private nursing Sydney
- wound care at home Sydney
- catheter care at home Sydney
- medication management at home Sydney

**Add local variants only where Gentle Care genuinely serves the area.** Use region-level terms first. Do not create or track dozens of suburb terms without business value.

**Measurement rule:**

- Use GSC for actual query impressions/clicks.
- Use SearchAtlas or an approved rank tracker for consistent organic snapshots.
- Use Local Falcon/BrightLocal or an approved equivalent for Google Maps grid visibility.
- Label rank-tracker data separately from GSC average position.

### Task 3: Implement complete conversion tracking

**Objective:** Make every meaningful lead action visible in GA4 and reconcilable with GHL.

**Modify likely files:**

- `src/components/forms/SimpleContactForm.tsx`
- `src/components/forms/ContactForm.tsx`
- `src/components/forms/ReferralForm.tsx`
- `src/components/forms/ReferralConcierge.tsx`
- `src/components/ui/FormModal.tsx`
- `src/components/ui/FloatingContact.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/MobileCta.tsx`
- `src/app/layout.tsx`
- Create `src/lib/analytics.ts`
- Create or update tracking tests under `src/**/__tests__/` or `tests/`

**Events:**

- `generate_lead` after confirmed successful contact submission
- `referral_submit` after confirmed referral submission
- `phone_click`
- `email_click`
- `request_care_click`
- `make_referral_click`
- `form_open`
- `form_error`

**Parameters:**

- page path
- form type
- service type
- funding pathway when provided
- CTA location
- submission ID, excluding personal/medical details

**Privacy rule:** Never send names, phone numbers, email addresses, free-text messages, health information or participant details into GA4, Clarity or rank tools.

**Tests:**

- Unit test event helper and payload sanitisation.
- Browser test successful form submission emits exactly one lead event.
- Confirm failed submissions do not emit a lead event.
- Confirm GHL receives the submission.
- Confirm GA4 DebugView receives the event.

### Task 4: Install uptime and form-delivery monitoring

**Objective:** Report actual uptime and detect silent lead failures.

**Set up with approval:**

- HTTPS uptime check every five minutes for homepage
- Representative checks for `/ndis`, `/dva`, `/aged-care`, `/referral`
- Daily non-destructive form endpoint health check or a dedicated synthetic endpoint
- SSL expiry warning
- Alert destination to Tyson, not Gemma, unless explicitly approved

**Report:** uptime percentage, incidents, response time trend and resolved technical issues.

---

## Phase 2: Technical SEO and Crawl Integrity

### Task 5: Build a deterministic production crawl audit

**Objective:** Validate every sitemap route and prevent SEO regressions.

**Create:**

- `tools/audit-seo-production.ts`
- `docs/seo/technical-audit-2026-07.md`

**For every sitemap URL record:**

- status and final URL
- title and description
- canonical and `og:url`
- robots directive
- H1 count
- JSON-LD types and canonical URLs
- internal links and broken fragments
- page word count and content fingerprint

**Special checks:**

- random missing URL returns real 404
- no sitemap URL redirects
- no homepage-shell fallback
- no canonical mismatch
- no `placeholder`, `TBD`, `TODO`, `real quote` or `composite` markers
- visible phone equals `tel:` link and schema telephone
- expected router/data routes equal sitemap routes
- internal canonical links use one slash policy

**Run:** `npm run lint`, `npm run build`, then production crawl against a local production server and live site.

### Task 6: Consolidate the entity schema graph

**Objective:** Present one authoritative Gentle Care entity to search and AI systems.

**Modify:**

- `src/lib/schema.ts`
- `src/app/layout.tsx`
- page-level schema emitters as required

**Changes:**

- Use one canonical `Organization`/`MedicalBusiness` entity with stable `@id`.
- Remove the duplicate minimal MedicalBusiness node.
- Use the official logo, not a Google favicon proxy.
- Link WebSite, MedicalService, FAQ, Article and Breadcrumb nodes back to the canonical entity.
- Verify visible content and schema claims match.
- Confirm opening hours, address, phone, sameAs links and services with Gemma before changing business facts.

**Validation:**

- Schema.org validator
- Google Rich Results Test on homepage, NDIS, DVA, Aged Care, FAQ, one service page and one area page
- Rendered-browser JSON-LD inspection

### Task 7: Audit SearchAtlas OTTO

**Objective:** Ensure the dynamic optimisation layer helps rather than overwrites source-controlled SEO.

**Inspect:**

- console/network errors
- metadata before and after OTTO loads
- canonical, title, description, headings and schema mutations
- Core Web Vitals/performance impact
- pages and recommendations currently controlled by OTTO

**Decision:**

- Keep only if changes are transparent, measurable and non-conflicting.
- Move durable improvements into source control.
- Do not let OTTO create unsupervised YMYL claims or duplicate metadata.

### Task 8: Establish performance baseline and remediation backlog

**Objective:** Produce trustworthy field and lab performance evidence.

**Measure:**

- GSC Core Web Vitals and CrUX field data
- Three mobile Lighthouse runs each for homepage, NDIS, DVA, Aged Care, referral, one service-region page and one blog post
- Desktop Lighthouse for representative templates
- transfer size, largest resources, LCP element, JavaScript cost, font loading and third-party scripts

**Prioritise:**

- LCP image discovery and sizing
- unused JavaScript
- SearchAtlas/Clarity/GA execution cost
- image responsive sizing
- font subsets and weights
- cache headers and Netlify behaviour
- animation/interaction cost on mobile

**Do not report one lab run as field performance.**

---

## Phase 3: On-Page SEO, AEO and GEO

### Task 9: Audit and prioritise money pages from GSC

**Objective:** Improve pages already close to ranking before creating more content.

**Priority pages:**

- `/ndis`
- `/dva`
- `/aged-care`
- `/private-nursing`
- `/referrers`
- `/services/nursing-care`
- `/services/complex-care`
- `/services/post-hospital-care`
- `/services/palliative-care`
- `/referral`

**For each page document:** query, position, impressions, clicks, CTR, intent match, competing page, conversion path, missing proof and exact fix.

**Quick-win rules:**

- Positions 4 to 15 with commercial intent
- high impressions and weak CTR
- page-two terms with meaningful impressions
- wrong page ranking
- priority page receiving no impressions

### Task 10: Improve answer extraction and evidence

**Objective:** Make key pages easy for people and AI systems to understand and cite.

**Each money page should contain:**

- direct answer near the top
- who the service is for
- funding and eligibility caveats
- service scope and exclusions
- dated official sources for programme claims
- clear care/referral process
- 4 to 8 real customer/referrer questions
- visible last-reviewed date when genuinely reviewed
- concise, self-contained facts
- canonical schema linked to the organization
- natural CTA to Request Care or Make a Referral

**YMYL guardrail:** Clinical, funding, eligibility, staffing, registration, response-time and cost claims require authoritative evidence and Gemma's approval.

### Task 11: Rationalise location and service-region pages

**Objective:** Keep high-quality local pages and remove doorway risk.

**Audit:**

- region pages
- suburb pages
- service-region combinations
- content similarity
- impressions and indexed status
- internal links
- genuine local proof
- distinct search intent

**Decision per page:** keep, improve, merge, noindex or redirect.

**Publish gate:** A page must have real local relevance, unique service information, useful referral/care guidance and a conversion path. A suburb-name swap is not enough.

### Task 12: Build the next content cluster from evidence

**Objective:** Create content based on demand and real expertise, not generic volume.

**Research sources:**

- GSC queries
- Gemma's enquiries and intake questions
- support coordinator/referrer questions
- GHL conversation themes
- People Also Ask
- competitor gaps
- reviews and referral objections
- FindQuestions/Reddit only as idea sources, not proof of demand

**Initial candidate pages, subject to evidence:**

- wound care at home Sydney
- medication management at home Sydney
- catheter care at home Sydney
- PEG feeding support Sydney
- tracheostomy care at home Sydney
- hospital discharge home nursing Sydney
- NDIS support coordinator referrals Sydney
- DVA community nursing referral Sydney
- NDIS nursing versus personal care
- private nursing versus funded care
- what discharge planners need from a home nursing provider

**Before drafting:** Interview Gemma or the clinical lead for process, exceptions, examples, eligibility boundaries and proof. Never invent clinical experience or outcomes.

### Task 13: Maintain the AI discovery layer

**Objective:** Keep machine-readable files accurate and synchronized.

**Modify:**

- `public/llms.txt`
- `public/llms-full.txt`
- `public/ai-index.json`
- relevant page schema and `SITE_LAST_UPDATED`

**Add:**

- alternate links for LLM resources if appropriate
- a real URL sitemap for machine-readable discovery if justified
- one update script/test that validates JSON, absolute URLs, canonical parity and freshness

**Verification:** Fetch all files locally and live after deployment. Test entity recognition prompts in ChatGPT, Claude, Gemini, Perplexity and Grok, recording accuracy and citations without treating one response as a stable ranking.

---

## Phase 4: Local SEO and Entity Authority

### Task 14: Optimise Google Business Profile

**Objective:** Improve local discovery and connect GBP performance to reporting.

**With Gemma's approval, audit:**

- primary and secondary categories against real map competitors
- services and descriptions
- business description
- NAP, hours, service areas and appointment links
- photos and posting cadence
- Q&A
- review count, rating, velocity and response quality
- UTM-tagged website and appointment links

**Do not change NAP, categories, hours, service areas or credentials without approval.**

### Task 15: Complete local platform coverage

**Priority order:**

1. Google Business Profile
2. Bing Places
3. Apple Business Connect
4. Facebook
5. Instagram
6. LinkedIn company page
7. My Aged Care/provider records where eligible
8. NDIS/provider records where publicly available and permitted
9. DVA/provider references where publicly available and permitted
10. Relevant Australian nursing, aged-care, disability and local business directories

**Create:** `docs/seo/citation-audit.csv`

**Fields:** platform, profile URL, current NAP, duplicate, category, website URL, issue, action, evidence, status.

### Task 16: Build review and trust velocity

**Objective:** Generate steady, genuine social proof and improve conversion.

**Implement with approval:**

- compliant review request flow after appropriate care milestones
- separate private feedback/recovery path without review gating
- owner-voiced response templates
- monthly review velocity tracking
- review themes for families, coordinators and referral partners

**Rule:** Never fabricate, incentivise, gate or selectively suppress reviews.

### Task 17: Earn corroborating authority

**Objective:** Strengthen the entity beyond self-published site claims.

**Pursue:**

- relevant professional/industry directories
- local associations and community partnerships
- referral partner resource pages
- hospital/discharge planning resources where legitimate
- supplier/partner profiles
- evidence-led expert content with named, approved clinical reviewers

**Avoid:** paid link schemes, PBNs, bulk low-quality directory submissions and unsupported listicle placements.

---

## Phase 5: Monthly Reporting System

### Task 18: Build a Looker Studio reporting dashboard

**Objective:** Give Gemma a simple, repeatable view while retaining a deeper operator view for Tyson.

**Data sources:**

- GA4
- GSC
- GBP connector or approved export
- Bing Webmaster export
- GHL monthly lead export/API
- rank tracker export
- uptime monitor
- monthly work log

**Client dashboard pages:**

1. Executive summary
2. Traffic and acquisition
3. Top pages and engagement
4. Search visibility and priority keywords
5. Enquiries and conversions
6. Local/GBP performance
7. Technical health, speed and uptime
8. Work completed and next priorities

**Filters:** month, channel, landing page, service category and device. Exclude personal or health information.

### Task 19: Create the five-minute monthly report

**Create template:** `docs/seo/monthly-report-template.md`

**Required sections:**

- 3 wins
- 3 problems or watch items
- website users/sessions with month-over-month and year-over-year comparison
- traffic sources: organic, direct, referral, social and other
- most visited pages and top landing pages
- priority keyword movement with source clearly labelled
- GSC clicks, impressions, CTR and average position
- GBP calls, clicks, directions and review movement
- confirmed website enquiries and form submissions
- conversion rate
- page-speed/Core Web Vitals status
- uptime and incidents
- SEO/local/AEO work completed
- one highest-impact priority for next month
- planned work

**Reporting rules:**

- Explain movements in plain English.
- Separate users, sessions and views.
- Do not call GSC average position a fixed Google ranking.
- Do not claim causation without evidence.
- Note tracking gaps and low sample sizes.
- Focus on qualified enquiries over vanity traffic.

### Task 20: Automate collection and delivery only after the first report is approved

**Objective:** Avoid automating a bad or confusing report.

**Process:**

1. Produce the first report manually as a baseline.
2. Tyson reviews the metrics and wording.
3. Gemma confirms the monthly delivery day and recipient email.
4. Automate data pulls where reliable.
5. Schedule draft generation for Tyson review.
6. Send externally only after Tyson approves the first automated cycle and delivery details.

**Recommended cadence:** report the previous calendar month during the first five business days of the new month.

---

## 30/60/90-Day Rollout

### Days 1 to 30: Measurement and quick wins

- Capture baseline
- Reconcile GA4, GHL, GSC, GBP and Bing
- Implement conversion tracking
- Set up uptime monitoring
- Validate sitemap, canonicals, schema and 404s
- Audit SearchAtlas OTTO
- Fix top GSC CTR/position opportunities
- Build first monthly report and keyword baseline

### Days 31 to 60: Local authority and money pages

- Complete GBP audit and approved updates
- Verify Bing Places and Apple Business Connect
- Repair NAP/citations
- Improve top DVA, NDIS, Aged Care and referrer pages
- Rationalise weak/duplicative location pages
- Begin review-response and review-request system
- Run first AI recognition/citation benchmark

### Days 61 to 90: Content and authority compounding

- Publish the first evidence-led question/service cluster
- Strengthen internal linking
- Pursue high-quality local/industry corroboration
- Re-run rank, map-grid and AI visibility tests
- Compare enquiries and conversions against baseline
- Decide the next sprint based on measured movement

---

## Verification Matrix

### Code and technical

- `npm run lint`
- `npm run build`
- production server smoke test
- automated sitemap/canonical/schema crawl
- real 404 test
- structured-data validation
- browser console and network inspection
- mobile and desktop Lighthouse runs
- repository clean before and after read-only checks

### Cross-browser/device

- Chromium, Firefox and WebKit
- desktop, common mobile widths and foldable width
- form submission, click-to-call, referral and navigation paths
- no hydration or console errors

### Data and reporting

- GA4 DebugView event verification
- GHL contact/source verification
- GSC and GA4 date-range reconciliation
- GBP metrics source recorded
- rank-source labels visible
- no personal or clinical data in analytics
- report totals traceable to source exports

### Live release

- deploy preview reviewed first
- Tyson approves live changes
- push/deploy
- wait for production readiness
- repeat live crawl and form/event checks
- request indexing only for materially changed canonical pages
- record completed work in the monthly log

---

## Risks and Decisions Requiring Approval

1. Access to GBP, GA4, GSC, Bing Webmaster, SearchAtlas and GHL reporting views.
2. Whether Gentle Care already has Bing Places and Apple Business Connect profiles.
3. Approved source of truth for NAP, opening hours, service areas, credentials and clinical team claims.
4. Paid map-grid/rank tracker choice, if SearchAtlas cannot provide the required local evidence.
5. Uptime monitoring platform and alert destination.
6. Gemma's preferred delivery date and email recipient.
7. Approval before external sends, GBP/citation edits, new paid tools, deployment or live claim changes.

---

## Definition of Done

The programme is complete when:

- all meaningful website enquiries and CTA actions are tracked without personal/health data leakage;
- GA4 lead totals reconcile with GHL;
- GBP, GSC, GA4, Bing and uptime metrics feed a repeatable report;
- sitemap routes, canonicals, schema and 404 behaviour pass automated checks;
- money pages are mapped to priority search intents and use source-backed, AI-extractable answers;
- local profiles and citations use approved, consistent entity facts;
- location pages pass unique-value review;
- the first monthly report is produced with real baseline data and approved by Tyson;
- automated monthly delivery is configured only after recipients, timing and report format are approved;
- all live changes have preview, cross-browser/mobile verification and production evidence.
