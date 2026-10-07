# Enquiry email setup proposal — PR53

All four enquiry forms (homepage, contact, primary referral and referral concierge)
will send to **info@gentlecarenursing.com.au**, explicitly supplied by the owner.
The recipient is fixed server-side. This is separate from sender authentication.

## Current access and configuration state

- Owner confirms `RESEND_API_KEY` is missing; no key value has been accessed.
- Resend is installed and referenced by the feedback route, which proves only code
  integration. Existing Resend account/team, domain verification and sending
  permissions remain unknown: browser redirects to `https://resend.com/login`.
- Netlify site: `bf77fef2-8e33-4a5e-a92b-34e10d287699`, gentlecarenursing,
  team `68664a7a3810939dcecac81c`. Existing CLI is authenticated; browser environment
  settings are login-gated. No denied credential-bearing API inspection is retried.
- Environment dashboard:
  https://app.netlify.com/projects/gentlecarenursing/configuration/env
- No credentials, accounts, paid plans, DNS, permissions or deployments changed.

## Proposed sender and DNS review

Proposed From address: **noreply@gentlecarenursing.com.au**.
Proposed sending domain: **gentlecarenursing.com.au**.
Recipient mailbox: **info@gentlecarenursing.com.au**.
The sender matches the existing code fallback; it does not require a new mailbox.
`REVIEW_FEEDBACK_FROM_EMAIL` may override it, but its presence/value is unverified.
Confirm that nonsecret sender setting before selecting a different domain.

If the existing Resend account already has this exact domain verified with sending
enabled, use it. Otherwise domain registration/verification and its DNS changes
require separate, specific approval after the generated public DNS rows are
reviewable. Do not create a new account or upgrade a plan.

For the root domain and default return path, the candidate DNS hosts are:

| Purpose | Host | Type/value needed | Status |
|---|---|---|---|
| DKIM | `resend._domainkey.gentlecarenursing.com.au` | Provider-generated TXT or CNAME record exactly as displayed by Resend | Public authoritative NXDOMAIN; generated value unavailable |
| Return-path/SPF | `send.gentlecarenursing.com.au` | Provider-generated TXT or CNAME record exactly as displayed by Resend | Public authoritative NXDOMAIN; generated value unavailable |
| Return-path handling | `send.gentlecarenursing.com.au` | Provider-generated MX target/priority if required for this domain/region | Public NXDOMAIN; generated value unavailable |

These are a proposal, not executable DNS instructions. Custom selectors, region,
return path or CNAME verification can change the generated records. The existing
account's Domains screen must supply exact type, name, value, priority and region.
Do not invent DKIM values or assume region/MX targets. The domain currently uses
GoDaddy nameservers (`ns37.domaincontrol.com`, `ns38.domaincontrol.com`) and root
SPF includes `secureserver.net`. Do not replace root SPF or mailbox MX, enable
Resend inbound mail, or change DMARC/security policy as part of sending setup.

## Secure owner handoff

The smallest next step is for the owner to sign in to the **existing Resend account**
at https://resend.com/domains and report only its account/team identifier, whether
`gentlecarenursing.com.au` is verified with sending enabled, and the generated
public DNS rows if setup is missing. No API key should be sent in chat or screenshots.
If no existing account can be accessed, stop for a specific account/setup decision.

After the correct verified sending domain and scoped key action are approved,
the owner creates the key personally at https://resend.com/api-keys. Proposed
key name: `gentlecarenursing-website-enquiries-production`; permission: Sending
access only; restricted to the approved sending domain. The agent must not
click Create, view/reveal the resulting key or capture that screen. Resend shows
new key values only once, so the owner must securely retain it. No full-access
key or unrestricted domain access is needed for this enquiry route.

The owner pastes the key directly into the site's Netlify dashboard as
`RESEND_API_KEY`, marked **secret**, limited to **production context** and
**functions scope**. Keep the value hidden. This is owner-to-platform entry; do not
copy it to the task, .env files, source, CLI arguments, email or chat. A names-only
confirmation of saved key/context/scope is sufficient for the next preflight.
Set/confirm `REVIEW_FEEDBACK_FROM_EMAIL=noreply@gentlecarenursing.com.au` only if
needed to match the approved sender; that nonsecret setting also affects the
existing feedback route and must be reviewed.

Production function secrets become effective on the next deployment; saving the
key is not evidence that the currently deployed handler sends through Resend.
Do not deploy until provider/domain readiness, approved safe next-test scope and
owner release approval are established. No extra live form/email test has been
performed in this update. The one earlier baseline was accepted by the old GHL
webhook; it does not verify the new info inbox. Confirm provider acceptance and
actual inbox receipt separately after an approved test.

References:
- https://resend.com/docs/add-a-domain
- https://resend.com/docs/dashboard/api-keys/introduction
- https://cli.netlify.com/commands/env/
