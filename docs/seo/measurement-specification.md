# Gentle Care Measurement Specification

**Version:** 1.1
**Code reconciliation:** 10 November 2026
**Purpose:** Reproducible website, search and enquiry reporting without overstating delivery or business outcomes.

This specification describes the current source implementation. It is not evidence that the exact candidate is deployed, that GA4 received events, or that a mailbox received an enquiry. Earlier GoHighLevel-based reporting instructions are superseded for the current direct-email implementation. No analytics settings or integrations are changed by this document.

## Outcome definitions

Keep these measures separate:

1. **Provider-accepted enquiry:** Resend accepted an email and returned a valid UUID receipt. This does not confirm inbox receipt, a booking or service availability.
2. **Inbox-confirmed enquiry:** the authorised inbox owner confirms receipt, or appropriately authorised delivery evidence supports the stated delivery outcome. Provider acceptance alone is insufficient.
3. **Qualified enquiry:** the care team applies a documented, consistent qualification rule in its approved intake records. Website events cannot establish clinical suitability, eligibility or capacity.
4. **Booked assessment or commenced care:** the care team's verified operational record establishes this later outcome.

Clicks, search visits, form opens and raw GA4 event counts are not qualified enquiries. An absent analytics event is not proof that no enquiry was accepted. A form error or timeout can have an uncertain provider outcome; do not count it as definitive non-delivery or prompt a real retry solely to resolve a report.

## Data sources and boundaries

| Measure | Evidence required | Limitation |
|---|---|---|
| Website traffic and on-site events | Correct GA4 property, verified hostname/stream and accessible date range | Source code and a property name do not prove collection or complete coverage |
| Google organic visibility | Correct Search Console property and settled clicks, impressions, CTR and average position | Search clicks are not enquiries; average position is not a fixed local rank |
| Provider-accepted website enquiries | Redacted Resend receipts or authorised operational metadata, separated by contact/referral | Acceptance is not inbox receipt; exclude private review feedback and unrelated emails |
| Inbox receipt and qualified enquiries | Authorised aggregate confirmation from the care team's intake records | Do not export client details, diagnoses, referral text or correspondence into analytics |
| GBP, Bing and local rankings | Verified account access and named source/report | Do not infer coverage from account discovery or website markup |
| AI visibility | Fixed prompts, platform/model, date, location/context and recorded citations | Directional observations, not guaranteed indexing, ranking or traffic |
| Page experience and uptime | Dated field/lab measurements and actual monitoring coverage | A source audit does not establish production behaviour or uptime |

GoHighLevel is not used by the current `/api/submit` delivery path. Do not wait for a GHL contact or manufacture a `websiteSubmissionId`. Historical GHL records may be reported only for a verified earlier implementation and period, labelled separately. Do not assume a migration date from a document date.

## Current form and event contract

The four enquiry components call `submitWebsiteForm`, which requires HTTP success, `success: true` and a valid UUID `submissionId`. The server obtains that ID from Resend's email receipt. It is returned as `submissionId` and passed to analytics as `submission_id`; it is not a newly generated browser ID.

| Component | Acceptance event | `form_type` | `cta_location` | Optional `service_type` |
|---|---|---|---|---|
| SimpleContactForm | `generate_lead` | `contact` | `homepage` | Selected service |
| ContactForm | `generate_lead` | `contact` | `contact_form` | Not sent |
| ReferralForm | `referral_submit` | `referral` | `referral_form` or `compact_referral_form` | Selected service |
| ReferralConcierge | `referral_submit` | `referral` | `referral_concierge` | Selected service |

These event names are retained for compatibility. Their implemented meaning is provider acceptance observed by the browser, not a qualified lead. Each successful handler dispatches one event; the tracking helper does not guarantee delivery to GA4 and does not deduplicate separate submissions. Optional analytics failure must not reverse an accepted enquiry.

Supporting events:

- `phone_click`: activation of a `tel:` link, not a connected call.
- `email_click`: activation of a `mailto:` link, not a sent email.
- `request_care_click`: activation of an explicitly tagged Request Care control.
- `make_referral_click`: activation of an explicitly tagged Make a Referral control.
- `form_open`: opening the contact or referral modal, not acceptance.
- `form_error`: a failed or invalid browser confirmation; it can include an uncertain delivery outcome and is not a definitive provider-rejection count.

## Privacy and parameter contract

The current helper permits only `form_type`, `service_type`, `cta_location`, `submission_id`, `page_path` and `error_type`. It strips unknown keys, rejects malformed string receipt IDs and removes query strings/fragments from the page path. This is an allowlist, not a general detector of sensitive values. Use only controlled category values at call sites; never put personal or clinical details in an allowed field or URL path.

Never send names, email addresses, phone numbers, addresses, free-text messages, diagnoses, referral details or client identifiers to analytics. Do not publish receipt IDs or share row-level operational records in client reports. Reconciliation uses the minimum authorised non-content metadata, with aggregate results reported to stakeholders. Do not copy email bodies, API keys, idempotency keys or credentials into analytics or reporting files.

## Receipt reconciliation and deduplication

For each report, establish the deployed implementation and reporting timezone first. Then:

1. Obtain authorised, redacted receipt metadata for website contact/referral emails for the same period. Exclude feedback messages, other senders and unrelated provider traffic. Record any retention or export gaps.
2. Count **distinct provider receipt IDs**, separated by contact/referral type. The implementation uses an HMAC-derived idempotency key for identical email requests; Resend deduplicates these for 24 hours. Identical retries in that window can share one receipt. A changed email request, a later retry or a changed configuration may generate another receipt. This does not deduplicate people or care episodes.
3. Compare those IDs with valid GA4 `submission_id` values on `generate_lead` and `referral_submit`, where an authorised event-level source is actually available. Ordinary aggregate event totals may not expose enough information to reconcile IDs.
4. Deduplicate GA4 observations by receipt ID across both acceptance events. Investigate repeated events, conflicting form types, provider-only receipts and GA4-only IDs. Do not simply sum raw event counts as unique enquiries.
5. Keep unique provider acceptance, inbox confirmation, qualified enquiries and booked assessments as separate totals. Missing values remain **unavailable**, not zero. Reconcile differences without exporting personal or clinical details.

Missing GA4 events can result from consent choices, blockers, network failures or the browser closing after provider acceptance. A timeout does not prove non-delivery. Retry deduplication is bounded and does not justify another real test submission without authorisation. Code tests use synthetic inputs and mocked delivery; they do not prove inbox receipt.

## Analytics administration and validation

No settings change is authorised by this specification. Before any separately approved configuration work:

- Verify the deployed GA4 stream, hostname, reporting timezone, retention and consent/privacy configuration.
- Inspect existing key-event configuration. If approved, `generate_lead` and `referral_submit` may represent provider-accepted form events, with that limitation clear in reports. Do not label them qualified enquiries or also count `form_open` as acceptance.
- Inspect existing low-cardinality dimensions (`form_type`, `service_type`, `cta_location`, `error_type`) before proposing additions. Do not assume they are configured.
- Do not register the receipt-level `submission_id` as a routine high-cardinality reporting dimension. Establish the minimum authorised event-level reconciliation route separately; if none is available, mark exact reconciliation unavailable.
- Do not add tracking, change consent, enable recording tools, subscribe to services or modify internal-traffic filters as part of a reporting read.

An exact-tree browser check should verify the current consent flow, event payload and one dispatch per mocked accepted handler, with no acceptance event after an invalid confirmation. A real provider/inbox test and access to GA4 records require their own authorised workflow. Keep source tests, browser dispatch, GA4 collection, provider acceptance and inbox receipt as distinct verification stages.

## Campaign attribution

Use agreed lowercase UTM values only on approved external campaign/profile links. Never place names, health details, receipt IDs or client identifiers in UTMs. The current form payload does not forward UTMs to Resend. Do not claim campaign-to-inbox or campaign-to-qualified-enquiry attribution from a tagged URL alone, or change form payloads to create it without a separately scoped implementation.

## Report QA checklist

- Exact period, timezone, comparison window, source and deployed implementation are identified.
- Missing/partial data, retention limits, consent effects and implementation changes are disclosed.
- Contact/referral acceptance is separated from review feedback and unrelated emails.
- Distinct receipt counts are used where authorised data permits; raw events are labelled as raw events.
- Provider acceptance, inbox receipt, qualified enquiries and bookings are not conflated.
- Organic search, Maps, Bing and AI observations remain separate.
- No personal or clinical information appears in analytics, exports or public reports.
- No ranking, traffic, conversion or revenue uplift is inferred without adequate comparable data.

## Code references

- `src/lib/submission.ts`: fixed recipient, provider receipt validation and 24-hour provider idempotency semantics.
- `src/app/api/submit/route.ts`: acceptance response and redacted receipt/type logging.
- `src/lib/form-client.ts`: browser confirmation validation and bounded uncertain timeout.
- `src/lib/analytics.ts`: event vocabulary, parameter allowlist and optional dispatch.
- `src/components/forms/`: the four current event call sites.
- `docs/seo/monthly-report-template.md`: reporting distinctions and unavailable-data labels.
