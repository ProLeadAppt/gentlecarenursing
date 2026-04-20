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
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID. Analytics loads only when set. | Optional |
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
