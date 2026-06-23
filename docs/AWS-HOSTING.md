# Hosting on AWS Amplify — step-by-step guide

This site is a **fully static** Next.js export (`next.config.mjs` →
`output: 'export'`). `npm run build` produces an `out/` folder of plain
HTML/CSS/JS — **no server, no database**. **AWS Amplify Hosting** is the easiest
fit: connect the GitHub repo once, and every push auto-builds and deploys to a
global CDN with free HTTPS.

> An `amplify.yml` build spec is committed at the repo root, so Amplify will pick
> up the correct build command and output folder automatically.

---

## Before you start (checklist)

- [ ] An **AWS account** (console access).
- [ ] This repo on **GitHub**: `darshani8/mba-bgs_web_development-`.
- [ ] Your **custom domain** (e.g. `mba.bgscet.ac.in`) and access to its DNS, if
      you want a custom URL (optional — Amplify gives you a free URL too).

---

## Step 1 — Open AWS Amplify

1. Sign in to the **AWS Management Console**.
2. In the top search bar type **Amplify** and open **AWS Amplify**.
3. (Optional) Pick the AWS **Region** nearest your users (e.g. Mumbai
   `ap-south-1`). Hosting is served from a global CDN regardless, so this is not
   critical.

## Step 2 — Create the app and connect GitHub

1. Click **Create new app** (or **Host web app**).
2. Choose **GitHub** as the source and click **Continue**.
3. **Authorize AWS Amplify** in the GitHub popup (grant access to the repo).
4. Select:
   - **Repository:** `darshani8/mba-bgs_web_development-`
   - **Branch:** the branch you want live (e.g. `main`).
5. Click **Next**.

## Step 3 — Confirm build settings

1. Amplify auto-detects the committed **`amplify.yml`**. Confirm it shows:
   - **Build command:** `npm run build`
   - **Output / artifact directory:** `out`
2. Make sure the deploy type is **static hosting** (not the Next.js SSR/compute
   option) — this site is a static export, so no server runtime is needed.
3. (Optional) Under **Advanced settings → Environment variables**, you normally
   add **nothing**. Only set `NEXT_PUBLIC_BASE_PATH` if hosting under a sub-path
   (not the case for a root domain — leave it empty).
4. Click **Next**.

## Step 4 — Deploy

1. Review the summary and click **Save and deploy**.
2. Watch the stages go green: **Provision → Build → Deploy → Verify**
   (first build ~2–4 min).
3. Open the generated **`https://<branch>.<app-id>.amplifyapp.com`** URL — your
   site is live over HTTPS.

> From now on, **every `git push` to the connected branch auto-redeploys.**

## Step 5 — Add the required security headers

A static site can't set HTTP response headers by itself, and the shipped
`_headers`/`.htaccess` files do **not** work on Amplify — you add them in the
console (this satisfies Part 2 of `docs/SECURITY-HANDOVER.md`).

1. In your app: **Hosting → Custom headers** (also under **App settings**).
2. Add the following (copy the exact values from your built **`out/_headers`**
   file), applied to all paths:

```yaml
customHeaders:
  - pattern: '**'
    headers:
      - key: 'Content-Security-Policy'
        value: "default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self' https://api.web3forms.com; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.web3forms.com; frame-src https://www.google.com; frame-ancestors 'self'"
      - key: 'Strict-Transport-Security'
        value: 'max-age=63072000; includeSubDomains; preload'
      - key: 'X-Content-Type-Options'
        value: 'nosniff'
      - key: 'X-Frame-Options'
        value: 'SAMEORIGIN'
      - key: 'Referrer-Policy'
        value: 'strict-origin-when-cross-origin'
      - key: 'Permissions-Policy'
        value: 'geolocation=(), camera=(), microphone=(), payment=()'
```

3. **Save**, then redeploy (or push any commit) so the headers take effect.

## Step 6 — Connect your custom domain (optional)

1. Go to **Hosting → Custom domains → Add domain**.
2. Enter your domain (e.g. `mba.bgscet.ac.in`) and map the branch to the root
   and/or `www` subdomain.
3. Amplify shows **CNAME/validation records** — add them at your DNS registrar.
4. Wait for status **Available** (DNS can take minutes to a few hours). Amplify
   issues and **auto-renews a free SSL certificate**; HTTPS and http→https
   redirect are automatic.

> If your live domain is **not** `https://mba.bgscet.ac.in`, update that
> hostname in `public/robots.txt` and `public/sitemap.xml`, then push (per
> `docs/SECURITY-HANDOVER.md`).

## Step 7 — Verify (5 quick checks)

1. **Padlock:** every page loads on `https://` with a valid certificate.
2. **Redirect:** `http://` bounces to `https://`.
3. **Headers grade:** paste the URL into <https://securityheaders.com> → aim for
   **A**. A low grade means Step 5's headers aren't applied.
4. **Forms:** submit a form; confirm the email arrives at mbainfo@bgscet.ac.in.
5. **404:** a nonsense URL shows the site's 404 page.

---

## Ongoing / day-to-day

- **Update content:** edit files, `git push` to the connected branch — Amplify
  rebuilds and redeploys automatically. No manual upload.
- **Roll back:** Amplify keeps previous deploys; redeploy an older build from the
  console if needed.
- **Cost:** at this site's size (~10 MB, normal college traffic) this is
  effectively **free** — Amplify's free tier covers it, and overages are a few
  dollars only at very high traffic. See the cost comparison in the hosting
  discussion if you expect heavy download traffic.

## Alternative

If you ever want the lowest long-term cost and don't mind manual uploads, the
same `out/` folder also hosts on **AWS S3 + CloudFront** (add the same 6 headers
via a CloudFront **Response Headers Policy**). Amplify is recommended here for
its push-to-deploy simplicity.
