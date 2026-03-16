# GSC + AI 5-Minute Audit (Caleb Ulku style)

Use this process to spot quick wins for titles, CTR, and content opportunities.

## Steps

1. **Export from Google Search Console**
   - Performance → Search results: export "Queries" or "Pages" (or both) as CSV.
   - Include columns: Query, Page, Clicks, Impressions, CTR, Position.

2. **Run with AI (Claude or ChatGPT)**
   - Upload or paste the CSV (or a sample of rows).
   - Use a prompt like:
     - "Analyze this GSC data. For each row with position 4–15 and CTR below 5%, suggest a better title tag and one content tweak to improve CTR. Focus on user intent and featured-snippet style answers."
   - Or use Caleb Ulku's free prompt from his site: [GSC 5-Minute CTR Analysis Prompt](https://calebulku.com/wp-content/uploads/2025/05/GSC-5-Minute-Analysis-Prompt-1.txt).

3. **Apply changes**
   - Update `title` and `description` in the page's `createMetadata()` or `metadata` (see `src/lib/metadata.ts` and each `src/app/**/page.tsx`).
   - Optionally add or refine a `snippetAnswer` or first-paragraph answer on the page for featured snippets.

4. **Repeat**
   - Run monthly or after big content launches to keep titles and intent aligned with what people search for.

## Key URLs to audit

- `/` (home)
- `/ndis`, `/dva`, `/aged-care`, `/private-nursing`
- `/services`, `/referral`, `/contact`, `/faq`, `/about`
- `/areas`, `/areas/inner-west`, `/areas/north-shore`, etc.

## Focus queries (examples)

- "NDIS nursing Sydney", "in-home care Sydney", "DVA community nursing"
- "aged care at home", "private nursing Sydney"
- "NDIS provider [suburb]" / "in-home nursing [region]"
