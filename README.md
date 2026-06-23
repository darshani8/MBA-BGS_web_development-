# BGSCET MBA — Website

The website for the **BGS School of Management (BGSCET MBA), Bengaluru**, plus a
standalone academic portfolio for the founding director.

It is built with **Next.js (App Router)** and exported as a **fully static site**
(plain HTML/CSS/JS) — there is no server or database. You run one build command
and upload the resulting `out/` folder to any web host.

> **New here? Read this file top to bottom — it's the map.** For deeper detail see
> [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). To publish a blog post see
> [`docs/ADD-A-BLOG-POST.md`](docs/ADD-A-BLOG-POST.md).

---

## Quick start

```bash
npm install        # install dependencies (first time only)
npm run dev        # local preview at http://localhost:3000
npm run build      # produce the static site in ./out
```

- **Node 20+** recommended.
- `npm run build` writes the entire website to **`out/`**. That folder *is* the
  site — deploying = uploading its contents to the host's web root.

---

## What's where (project map)

```
.
├─ app/                     Next.js App Router — routes, layouts, components
│  ├─ layout.js             Root layout: <html>/<body>, global CSS, fonts, security headers (CSP <meta>)
│  ├─ (site)/               ROUTE GROUP — the main college website (see "Route groups" below)
│  │  ├─ layout.js          College chrome: top bar + nav + ticker + footer + brochure button
│  │  ├─ page.js            Home              →  /
│  │  ├─ about/page.js      About             →  /about/
│  │  ├─ admissions/ programs/ contact/ people/ gallery/ journey/ sitemap/ …   (one folder per page)
│  │  └─ blog/
│  │     ├─ page.js         Blog index        →  /blog/
│  │     └─ <article>/page.js  One folder per article  →  /blog/<article>/
│  ├─ (portfolio)/          ROUTE GROUP — standalone scholar site (NO college chrome)
│  │  ├─ layout.js          Just the .scholar-site wrapper (page is self-contained)
│  │  └─ Naveen-Kumar-G/    →  /Naveen-Kumar-G/  (single-page "bento" profile)
│  └─ components/           Shared React components (Nav, Footer, Ticker, UtilBar, BrochureFab, …)
│
├─ content/                 Page BODIES as raw HTML, injected at build time (see "How a page is built")
│  ├─ home.html  about.html  programs.html  …    one file per page
│  └─ blog/                 one HTML file per blog article (matches app/(site)/blog/<article>/)
│
├─ lib/                     Small helpers
│  ├─ PageContent.js        Reads a content/*.html file, SANITIZES it, injects it into the page
│  ├─ basePath.js           Prefixes asset URLs when the site is hosted under a sub-path
│  └─ formConfig.js         The Web3Forms key the enquiry forms submit to
│
├─ styles/                  Plain global CSS (no Tailwind)
│  ├─ styles.css            Design system — colors, fonts, spacing (CSS variables) + shared chrome
│  ├─ home.css  pages.css  journey.css        page styles
│  └─ scholar.css           portfolio-only styles (scoped under .scholar-site)
│
├─ public/                  Static files served as-is at the site root
│  ├─ assets/               Images, grouped by section (lead, faculty, scholar, blog, gallery, …)
│  ├─ _headers              Security headers for Netlify / Cloudflare Pages hosts
│  └─ .htaccess             Security headers for Apache / cPanel hosts
│
├─ docs/                    Handover & how-to guides (start with the ones linked below)
├─ next.config.mjs          Static-export config (output:'export', trailingSlash, basePath)
└─ package.json             Scripts + dependencies (+ a postcss security override)
```

---

## The one idea that explains everything: how a page is built

This project uses a simple, deliberate split between **layout** and **content**:

- The **shared layout** (header, navigation, footer) is real **React** in `app/`.
- Each **page body** is a plain **HTML file in `content/`**.

A route file is tiny — it just names which content file to inject:

```jsx
// app/(site)/about/page.js   →  serves /about/
import PageContent from '@/lib/PageContent';
export const metadata = { title: 'About — BGSCET MBA', description: '…' };
export default function AboutPage() {
  return <PageContent name="about" />;   // injects content/about.html
}
```

[`lib/PageContent.js`](lib/PageContent.js) reads `content/<name>.html`,
**sanitizes it** (strips `<script>`, inline event handlers, `javascript:` URLs —
so even pasted blog HTML is safe), and renders it. Because **every** page body
flows through this one function, security and asset-path handling are solved in a
single place. This is the most important pattern in the codebase — see
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full explanation.

### Route groups: `(site)` vs `(portfolio)`

Folders in parentheses are **route groups** — they organize files **without
appearing in the URL**. They exist so two different "skins" can live in one app:

| Group | Purpose | Gets the college nav/footer? |
|-------|---------|------------------------------|
| `app/(site)/`      | The main college website (home, about, blog, …) | Yes — full college chrome |
| `app/(portfolio)/` | The director's standalone academic site | No nav — its own scholar header + the footer |

`/about/` lives at `app/(site)/about/` — the `(site)` part is invisible in the URL.

---

## Common tasks

| I want to… | Do this |
|------------|---------|
| **Edit a page's words/images** | Edit the matching file in `content/` (e.g. `content/about.html`). |
| **Add a new normal page** | Create `app/(site)/<slug>/page.js` (copy an existing one) + `content/<slug>.html`. |
| **Publish a blog post** | Follow [`docs/ADD-A-BLOG-POST.md`](docs/ADD-A-BLOG-POST.md). |
| **Change where forms send** | Edit the key in `lib/formConfig.js` — see [`docs/FORMS-SETUP.md`](docs/FORMS-SETUP.md). |
| **Change colors / fonts** | Edit the CSS variables at the top of `styles/styles.css`. |
| **Deploy / hand to a host** | `npm run build`, then give the host the `out/` folder + [`docs/SECURITY-HANDOVER.md`](docs/SECURITY-HANDOVER.md). |

---

## Deploying

The site is **static**, so it runs on any host (Apache/cPanel, Netlify, Cloudflare
Pages, AWS S3+CloudFront, GitHub Pages, …).

1. `npm run build`
2. Upload the **contents of `out/`** to the host's web root.
3. Ensure the host serves **HTTPS** and applies the security response headers —
   the host-specific instructions are in
   [`docs/SECURITY-HANDOVER.md`](docs/SECURITY-HANDOVER.md).

> Hosting under a sub-path (e.g. GitHub project pages)? Set
> `NEXT_PUBLIC_BASE_PATH=/<sub-path>` before `npm run build`. For a root domain,
> leave it empty (the default).

---

## Documentation index

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — how the site is structured and renders (deep dive).
- [`docs/ADD-A-BLOG-POST.md`](docs/ADD-A-BLOG-POST.md) — step-by-step weekly blog workflow.
- [`docs/FORMS-SETUP.md`](docs/FORMS-SETUP.md) — how the enquiry forms deliver (Web3Forms).
- [`docs/SECURITY-HANDOVER.md`](docs/SECURITY-HANDOVER.md) — what's hardened and what the host must do.

## Tech stack

Next.js 16 (App Router, `output: 'export'`) · React 19 · plain CSS ·
`sanitize-html` for build-time HTML sanitization. Three runtime dependencies, no
backend. See `package.json`.
