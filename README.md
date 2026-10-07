# Gentle Care Nursing

A modern, high-converting website for Gentle Care Nursing—in-home nursing and care services.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Purpose | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin used in metadata, sitemaps, and absolute URLs. | Production |
| `NEXT_PUBLIC_GA_ID` | Optional Google Analytics 4 measurement ID override. Defaults to the registered Gentle Care stream ID. | Optional |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification code. Rendered as `<meta name="google-site-verification">` when set. | Optional |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools verification code. Rendered as `<meta name="msvalidate.01">` when set. | Optional |

On Netlify, set these under **Site settings → Environment variables**. Changes apply on next deploy.

## Scripts

- `npm run dev` — Development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Project Structure

See `docs/FOLDER_STRUCTURE.md` for the component and folder architecture.

## Integrations (Planned)

- GoHighLevel CRM (forms, workflows)
- AI chat widget
- AI voice assistant

## Direct enquiry email delivery

Homepage, contact, primary referral and referral concierge submit to `/api/submit`.
Enquiries go only to `gemma@gentlecarenursing.com.au` using the existing Resend provider.
Server-only `RESEND_API_KEY` and the existing verified `REVIEW_FEEDBACK_FROM_EMAIL`
(default `noreply@gentlecarenursing.com.au`) must be confirmed in the Netlify site's
production function environment before approval to deploy. No GoHighLevel fallback.
No credentials, provider accounts or environment settings are changed by this PR.

Success means Resend accepted the email and returned its UUID, not inbox receipt.
Provider receipt IDs support redacted reconciliation in logs and GA4. Email content
is plain text; user content is absent from subject, logs and analytics. Identical
email requests are deduplicated by Resend for 24 hours using a server HMAC key,
including retries after ambiguous timeouts. Identical enquiries within that window
share the provider receipt. Changing any enquiry detail allows a new enquiry.
Existing hosting spam controls must be retained; application checks bound input
and reject invalid values/cross-origin browser submissions but are not a full
bot-protection service. Do not deploy until sender/key and provider acceptance
are verified, and the owner approves. Gemma must confirm inbox receipt.

Rollback: revert this PR; this restores the legacy webhook requirement and does
not restore access to the retired GoHighLevel account.
