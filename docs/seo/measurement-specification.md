# Gentle Care Measurement Specification

**Version:** 1.0
**Prepared:** 25 July 2026
**Purpose:** Make monthly website, search and enquiry reporting reproducible and privacy-safe.

## Reporting principles

1. Report only confirmed data from named sources.
2. Never send names, email addresses, phone numbers, free-text messages, diagnoses or referral details to analytics platforms.
3. Count successful forms only after GoHighLevel returns a successful response.
4. Keep Google organic, Google Maps and AI-answer visibility as separate measures.
5. Label partial months and data gaps. Do not backfill invented values.
6. Report both month-over-month and year-over-year movement once comparable data exists.

## Data sources

| Area | Source of truth | Notes |
|---|---|---|
| Website traffic | GA4 | Users, sessions, engaged sessions, channel groups and landing pages |
| Google organic | Google Search Console | Clicks, impressions, CTR and average position |
| Bing organic | Bing Webmaster Tools | Search clicks, impressions and crawl/index issues |
| Local search | Google Business Profile Performance | Calls, website clicks, direction requests and search terms |
| Maps visibility | Approved grid rank tracker | Report share of local grid points in top 3, top 10 and top 20 |
| Enquiries | GoHighLevel | Confirmed website contacts and referrals |
| On-site conversion behaviour | GA4 | Confirmed form events and aggregate CTA events |
| User experience | Microsoft Clarity | Aggregate recordings, rage clicks and dead clicks, subject to privacy controls |
| Keyword rankings | SearchAtlas or approved tracker | Fixed location/device rankings, separate from GSC average position |
| Page speed | PageSpeed Insights / CrUX | Mobile field data preferred; Lighthouse lab data as diagnostic |
| Uptime | Approved uptime monitor | Availability, incidents and SSL expiry |
| AI visibility | Manual benchmark | Fixed prompts, fresh chats, logged platform/model/date |

## GA4 event specification

### Key events

Mark only these as GA4 key events:

| Event | Fires when | Required parameters |
|---|---|---|
| `generate_lead` | A contact form is accepted by GoHighLevel | `form_type`, `cta_location`, `submission_id`, optional `service_type`, `page_path` |
| `referral_submit` | A referral form is accepted by GoHighLevel | `form_type`, `cta_location`, `submission_id`, optional `service_type`, `page_path` |

The two event counts must be summed for total website form leads. Do not also mark `form_open` as a key event.

### Supporting events

| Event | Meaning |
|---|---|
| `phone_click` | Visitor activates a `tel:` link |
| `email_click` | Visitor activates a `mailto:` link |
| `request_care_click` | Visitor activates an explicitly tagged Request Care control |
| `make_referral_click` | Visitor activates an explicitly tagged Make a Referral control |
| `form_open` | Contact or referral modal opens |
| `form_error` | Form delivery fails or a success confirmation is invalid |

### Approved event parameters

Only the following custom parameters are permitted:

- `form_type`
- `service_type`
- `cta_location`
- `submission_id`
- `page_path`
- `error_type`

The application strips unknown parameters and rejects keys associated with names, email, phone, messages, notes, addresses and health information.

### GA4 Admin configuration

1. Mark `generate_lead` and `referral_submit` as key events.
2. Register event-scoped custom dimensions for:
   - Form type: `form_type`
   - Service type: `service_type`
   - CTA location: `cta_location`
   - Submission ID: `submission_id`
   - Error type: `error_type`
3. Do not register personal details as custom dimensions.
4. Configure internal traffic for Gentle Care and Munyal office/test traffic.
5. Keep unwanted referrals under review, particularly payment, CRM or embedded-tool domains.
6. Annotate deployments and major tracking changes in the monthly work log.

## GoHighLevel reconciliation

Each successful website form submission receives a random `submissionId` after GoHighLevel accepts the request. The ID is:

- added to the GoHighLevel webhook payload as `websiteSubmissionId`;
- returned to the browser only after successful delivery;
- sent to GA4 as `submission_id` without the person’s details.

Monthly QA:

1. Count GHL records with `source = website` and a `websiteSubmissionId`.
2. Compare those IDs with GA4 `generate_lead` and `referral_submit` IDs.
3. Investigate missing, duplicate or invalid IDs.
4. Use GHL as the source of truth for confirmed leads.

## UTM standard

Use lowercase values and preserve UTMs through landing pages and GHL where possible.

- `utm_source`: platform or partner, such as `facebook`, `linkedin`, `google_business_profile`
- `utm_medium`: `social`, `organic_social`, `referral`, `email`, `profile`
- `utm_campaign`: descriptive campaign slug
- `utm_content`: creative, button or placement identifier

Never place names, health details or client identifiers in UTM values.

## Report QA checklist

- Date range and comparison period are explicit.
- Partial months are labelled.
- Total website enquiries reconcile to GHL.
- Organic rankings are not presented as Maps rankings.
- GSC average position is labelled as an average, not a fixed rank.
- No PII or health information appears in exports.
- Material outages, tagging changes and data gaps are disclosed.
- Every recommendation names its evidence and expected business outcome.
