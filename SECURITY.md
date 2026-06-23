# Security Policy

The BGSCET MBA website is a **static site** (HTML/CSS/JS produced by `npm run build`
into `out/`). It has no application server, no database, no user accounts, and no
stored personal data — enquiry forms submit directly to a third-party service
(Web3Forms). This narrow surface is intentional.

## Reporting a vulnerability

If you believe you have found a security issue, please report it privately:

- **Email:** mbainfo@bgscet.ac.in (subject line: `SECURITY`)
- Please include: a description, the affected URL/file, steps to reproduce, and
  the impact. A proof-of-concept is welcome.
- Please **do not** open a public GitHub issue for security reports, and please do
  not publicly disclose until we have had a reasonable chance to respond.

We aim to acknowledge reports within **5 working days** and to address confirmed,
in-scope issues promptly.

### Safe harbour
We will not pursue action against good-faith research that respects this policy:
testing only against assets you are authorised to test, avoiding privacy
violations and service disruption, and not exfiltrating data beyond the minimum
needed to demonstrate the issue.

## Scope

**In scope**
- The website code in this repository.
- The built site served at the production domain.

**Out of scope**
- The hosting provider's infrastructure (report those to the host).
- Third-party services: **Web3Forms** (form delivery), **Google Fonts**, and the
  **Google Maps** embed — report to those vendors.
- Findings that require a compromised end-user device or browser.
- Volumetric DoS / automated scanner output without a demonstrated impact.

## What is already hardened (for reviewers)

These controls ship inside the built files and travel to any host:

- **Build-time HTML sanitization** of every page body, including the weekly blog
  HTML (`lib/PageContent.js`, `sanitize-html`): strips `<script>`, inline `on*=`
  handlers, `javascript:` URLs, and clickjacking-style `position`/`z-index`
  inline styles; only the Google Maps iframe host is allowed to be framed.
- **Content-Security-Policy** plus `X-Content-Type-Options: nosniff` and a
  `referrer` policy, set as `<meta>` in `app/layout.js` so they apply on any host.
- **Forms** submit to Web3Forms (send-only, public-safe key) with a honeypot;
  no credentials are collected anywhere on the site.
- **Dependencies:** minimal (3 runtime deps); `npm audit` is clean, with a
  `postcss` security override pinned in `package.json`.
- External links use `rel="noopener noreferrer"`.

Some response headers (**HSTS**, **X-Frame-Options / frame-ancestors**,
**Permissions-Policy**) can only be set by the host. The required values and
per-host instructions are in [`docs/SECURITY-HANDOVER.md`](docs/SECURITY-HANDOVER.md);
copies are shipped as `public/_headers` (Netlify/Cloudflare) and `public/.htaccess`
(Apache).

## Supported versions

Only the current production build is supported. Fixes are rolled out by
rebuilding and redeploying the `out/` folder.
