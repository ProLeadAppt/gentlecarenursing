# Disposable controlled referral preview

Never merge this tree or deploy it to production. Publish only as a distinct draft preview if separately authorized. No secrets or production environment are needed. Enter synthetic test data only.

ReferralConcierge, ReferralOutcome, FormModal, FormModalTrigger and FormModalContext are unchanged. The default form-client transport is replaced with a deterministic in-memory transport. Success supplies a fixed valid test UUID, rejected supplies HTTP 502, and uncertain throws a simulated network error. The selector affects the next call; in-flight calls retain the scenario captured at start. All calls wait 1.2 seconds. Reload resets selection.

Both API handlers unconditionally return 503 without reading the request or invoking integrations. Browser analytics, GHL embeds and service-worker registration are disabled. Existing security headers and CSP are preserved exactly; robots metadata and X-Robots-Tag request no indexing. Feedback transport is also blocked in memory. Ordinary external link clicks are prevented after hydration. This is defense in depth, not an access-control boundary: use an isolated draft host, never real data. Host access logs and hosting-platform telemetry are outside this application’s control. External links can still be manually opened or opened through alternate browser actions; do not do so during QA.

This harness validates rendered UI state/focus/navigation and mock transport outcomes. It does not verify actual API delivery, email, webhook, GA, HTTP failure transport, production hosting configuration or real-world ambiguous submissions. Production-route and production-integration assertions are expected to differ in this disposable tree. The release candidate is the authoritative production source.
