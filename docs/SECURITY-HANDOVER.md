# Security handover — BGSCET MBA website

This site is a **static website** (plain HTML/CSS/JS files produced by
`npm run build` into the `out/` folder). There is no application server or
database. Most security is baked into the files; **one thing genuinely depends on
the host** (the response headers — see Part 2). You do **not** need to know which
provider or location the host uses — Part 2 gives instructions for every common
host.

> **Deploy:** run `npm run build`, then upload the **contents of `out/`** to the
> site's web root. That's the entire website (your form key + all hardening are
> inside these files).

---

## Part 1 — Already handled in the code (travels with the files, any host)

| Item | Status |
|------|--------|
| Demo login form removed (no fake credential collection) | ✅ Done |
| All forms (contact, admissions, programs, home lead, newsletter) deliver to you via Web3Forms | ✅ **Live** |
| Form spam protection (honeypot on every form) | ✅ Done |
| Blog/page HTML sanitized at build time (strips `<script>`, inline handlers, `javascript:`, unsafe inline-CSS positioning) | ✅ Done — **tested** (script / onerror / javascript: / overlay all stripped in the build) |
| Content-Security-Policy + X-Content-Type-Options + Referrer-Policy as `<meta>` tags (work on any host) | ✅ Done |
| `postcss` vulnerability patched (`npm audit` = 0 vulnerabilities) | ✅ Done |
| External links use `rel="noopener noreferrer"` | ✅ Done |
| Privacy policy discloses the Web3Forms processor / cross-border transfer | ✅ Done |
| No secrets committed (the Web3Forms key is public-safe by design — send-only) | ✅ True |
| `SECURITY.md` vulnerability-disclosure policy (contact + scope + safe harbour) | ✅ Done |
| `robots.txt`, `sitemap.xml`, favicons + `site.webmanifest` (crawl/SEO hygiene) | ✅ Done |

These need **no action from the host**. They are inside the `out/` files.

> Note: `robots.txt` and `sitemap.xml` use the canonical domain
> `https://mba.bgscet.ac.in`. If the site goes live on a different domain, update
> that hostname in `public/robots.txt` and `public/sitemap.xml`, then rebuild.

---

## Part 2 — The ONE thing the host must do (give them this section)

⚠️ **Important and honest:** a static site **cannot set HTTP response headers by
itself.** Some headers — **HSTS, X-Frame-Options/frame-ancestors (clickjacking
protection), Permissions-Policy** — only work as *real response headers*, which
**only the host can send.** The `public/_headers` and `public/.htaccess` files
shipped in the build provide these **only on certain hosts** (see table). On other
hosts they are ignored, so the host must add the headers their own way.

**So tell the host (one instruction, works regardless of provider):**

> *"Serve the site over HTTPS (force http→https), and apply these 6 HTTP response
> headers to all responses. The exact values are in the `_headers` file at the
> site root."*

**The 6 headers (exact values — copy from `out/_headers`):**

```
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self' https://api.web3forms.com; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.web3forms.com; frame-src https://www.google.com; frame-ancestors 'self'
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=()
```

**How to apply, per host (the host picks the row matching their setup):**

| If the host uses… | How the 6 headers get applied |
|---|---|
| **Apache / cPanel / shared hosting** | The shipped **`.htaccess`** (in `out/`) applies them automatically. Nothing extra. |
| **Netlify / Cloudflare Pages** | The shipped **`_headers`** file applies them automatically. Nothing extra. |
| **Nginx** | Add `add_header` lines (one per header above) to the `server {}` block, then reload. |
| **AWS S3 + CloudFront** | Create a **CloudFront Response Headers Policy** with the 6 headers and attach it to the distribution (the `_headers`/`.htaccess` files do **not** work here). |
| **Cloudflare (proxying any origin)** | Add the headers via **Transform Rules → Modify Response Header**, or a Worker. |
| **Anything else** | Whatever the panel calls "custom HTTP response headers" — paste the 6 values. |

> Why this matters: the `<meta>` CSP in the HTML already protects against most
> injection on **every** host. What the host must add is mainly **HSTS** (forces
> HTTPS) and **clickjacking protection** (X-Frame-Options / frame-ancestors),
> which browsers ignore when set via `<meta>`.

### Also ask the host for (standard, not site-specific)
- [ ] **HTTPS/TLS** with auto-renewing cert + **force http→https redirect**.
- [ ] **Per-person accounts** for deploy/FTP/SSH/panel + **2FA** (no shared passwords).
- [ ] **Automated backups** with a tested restore.
- [ ] **Server software kept patched.**
- [ ] **A security/abuse contact.**
- [ ] *(Nice to have)* CDN/WAF in front (Cloudflare free tier).

### Domain (yours, not the host's)
- [ ] Domain registered in **your** name. **Registrar lock** on. **2FA** on the
      registrar account. You keep DNS control.

---

## Part 3 — Verify after they deploy (5 quick checks)

1. **Padlock:** site loads on `https://` with a valid padlock on every page.
2. **Redirect:** `http://yourdomain` bounces to `https://`.
3. **Headers grade:** paste the URL into **https://securityheaders.com** and
   **https://observatory.mozilla.org** → aim for **A**. If the grade is low, the
   host has not applied Part 2's headers — point them back to it.
4. **Forms:** submit each form; confirm the email arrives at mbainfo@bgscet.ac.in.
5. **404 / no demo:** a nonsense URL shows the site's 404, and `/login/` returns 404.

---

## Part 4 — Ongoing (low effort)

- Update blogs through the normal repo workflow — the build sanitizes the HTML.
- Re-run `npm run build` and hand over a **fresh `out/`** for any change (the key
  and hardening live inside the build).
- Every ~3 months: `npm audit`; update if it flags anything.
- Keep mbainfo@bgscet.ac.in monitored so enquiries aren't missed.

---

**Bottom line:** Hand the host the **`out/` folder** + **Part 2**. Everything else
is already inside the files. The single real host dependency is HTTPS + the 6
response headers — and Part 2 tells them how, whatever they run.
