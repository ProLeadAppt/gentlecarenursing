# Five-suburb review preview

Prepared 12 November 2026 against main 33ce5b2c2fc9acbed20e4763621538d1a417449d (published PR78). This is review-only work, not a production release or a completed SEO rollout.

## Review paths

- /locality-review
- /locality-review/north-strathfield
- /locality-review/homebush
- /locality-review/concord-west
- /locality-review/homebush-west
- /locality-review/rhodes

No hosted preview URL has been created by this implementation. The coordinating reviewer will create a draft preview PR separately.

## Build gate

The pages are statically generated only when CONTEXT is exactly deploy-preview, or NODE_ENV is development for local work. The hub and five pages share one optional catch-all route with an explicit six-path static allowlist. In every other production/build context generateStaticParams returns an empty allowlist and dynamicParams is false, so Next rejects the paths before rendering. Layout and page checks also call notFound as defence in depth. A standalone static hub was replaced after a real HTTP check exposed a streamed soft-404; the final catch-all architecture is tested over the previous preview build cache. No environment settings are changed. Use CONTEXT=deploy-preview npm run build for the review build and CONTEXT=production npm run build for the exclusion check.

All six review pages are noindex/nofollow. Noindex is not access control: the eventual hosted review may be accessible to anyone with its URL. The content contains no patient information or private operating records. No production canonical, Place or locality Service schema is added. Existing global business/WebSite schema and the shared header/footer remain unchanged. Existing header/footer links can lead to ordinary enquiry pages; no form should be submitted for this review.

The production SUBURBS array, public suburb index, sitemap, robots, schema, global layout, footer, forms, dependencies and account settings are unchanged. The existing public index wording correction remains a separate proposal, not silently bundled into this preview.

## Content and source boundaries

Five individually edited older Riverside drafts were adapted into native components using the existing locality design. Repeated register/history boilerplate was removed from proposed reader copy. Visible review panels identify operational questions, sources and unverified search intent. North Strathfield uses the current business-supplied office address and makes no walk-in promise. The Rhodes library reference was removed because it did not establish healthcare relevance.

Homebush and Rhodes still require stronger first-hand local operational usefulness before publication. All five require Gemma's review of clinical/operational wording, confirmed scope and release approval. Official geographic and health information does not establish provider credentials, capacity, hospital partnerships, funding eligibility or a start date. SIL accommodation or direct SIL delivery is not offered by these drafts.

See five-suburb-source-ledger.json for source links and limits. GSC Wizard query access was subscription-blocked; no current query data was fetched. Titles, headings and questions are editorial intent hypotheses, not measured high-volume keywords. No billing, analytics or bot-permission changes were made. Search indexing, rankings and AI citations are not guaranteed.

## Test changes

Seven new tests cover the environment gate, preview-to-production gate transition, unknown slugs, rendering/noindex, production sitemap/schema separation, source/content limits and the exact five-file source allowlist. Historical source and semantic comparisons remain intact. Two existing tests allow only the five additional review files, and the locality stylesheet importer list permits the new review layout.

## Local verification

The supported Node test runner is node --import tsx --test tests/*.test.ts. The npm test wrapper's tsx CLI encountered an environment Unix-socket EPERM; no security settings or dependencies were changed. Initial test-only lint/typing issues were corrected before successful final checks.

Final result logs and exact patch are stored with the implementation evidence outside the repository. Browser/mobile/keyboard checks on the exact hosted preview remain required before presenting the preview as visually verified. No real enquiry, external communication, push, deployment or production change was performed.
