# Architecture

How the BGSCET MBA site is structured and how it renders. Read the
[README](../README.md) first for the project map; this document explains *why*
it's shaped this way.

---

## 1. Rendering model — a static site built by Next.js

`next.config.mjs` sets `output: 'export'`, so `npm run build` produces a **fully
static** site in `out/` (HTML + CSS + JS, no server). Key settings:

```js
output: 'export',          // emit static files to out/
trailingSlash: true,       // /about/ → out/about/index.html (clean folder URLs)
images: { unoptimized: true }, // no server, so plain <img> (no next/image optimizer)
basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',  // for sub-path hosting
```

Because there is no server, **everything is decided at build time**. There is no
runtime data fetching, no API, no database.

---

## 2. The content-injection pattern (the core idea)

Pages are split into two layers:

- **Layout = React** (`app/`): the shared chrome — navigation, footer, etc.
- **Body = HTML** (`content/`): the actual page content as a hand-written `.html`
  fragment.

A route file just names the body to inject:

```jsx
// app/(site)/programs/page.js
import PageContent from '@/lib/PageContent';
export const metadata = { title: '…', description: '…' };
export default function ProgramsPage() {
  return <PageContent name="programs" />;   // → content/programs.html
}
```

[`lib/PageContent.js`](../lib/PageContent.js) is the single chokepoint every page
body passes through. At build time it:

1. **Reads** `content/<name>.html`.
2. **Sanitizes** it with `sanitize-html` — strips `<script>`, inline `on*=`
   handlers, and `javascript:` URLs, while **keeping** the markup the site needs
   (SVG, the Google Maps `iframe`, forms, and all `data-*` attributes that
   `SiteScripts.js` relies on). This makes pasting a new blog HTML file safe by
   default.
3. **Rewrites root-absolute asset paths** (`/assets/…`, `/blog/…`) to include
   `BASE_PATH` when the site is hosted under a sub-path.

Because all bodies funnel through this one function, **security and path handling
are solved once** instead of per page.

> Why HTML files instead of JSX for bodies? The site was migrated from a
> hand-written static site; keeping bodies as HTML let the rich existing markup
> move over verbatim and keeps weekly content edits approachable (plain HTML, no
> React knowledge needed). New *interactive* pages can still be written as normal
> JSX — the portfolio pages under `app/(portfolio)/` are, for example.

---

## 3. Layouts — three layers of chrome

Next.js nests layouts from the root down. This project uses that to give two
sections different looks while sharing one `<html>` shell.

```
app/layout.js                ← ROOT: <html>/<body>, global CSS imports, Google Fonts,
                                       security <meta> (CSP, X-Content-Type-Options, referrer).
                                       Renders ONLY {children} — no visible chrome.
├─ app/(site)/layout.js      ← college chrome: <UtilBar><Nav><Ticker>{children}<Footer><BrochureFab><SiteScripts>
└─ app/(portfolio)/layout.js ← just {children} wrapped in .scholar-site (self-contained bento page)
```

The **root layout deliberately renders no header/footer** — it only owns the
document shell and global concerns. Each route group's own layout adds its
chrome. This is what lets `/Naveen-Kumar-G/` skip the college nav while still
inheriting the global CSS, fonts, and security headers.

### Route groups
`(site)` and `(portfolio)` are **route groups**: the parentheses keep them out of
the URL. So `app/(site)/about/page.js` serves `/about/`, not `/(site)/about/`.
They exist purely to attach different layouts to different sets of pages.

---

## 4. Shared components (`app/components/`)

| Component | Role |
|-----------|------|
| `UtilBar`       | Top utility strip (phone/email). |
| `Nav`           | Main college navigation (client component; highlights the active link). |
| `Ticker`        | Scrolling announcement strip. |
| `Footer`        | College footer (reused by **both** route groups). |
| `BrochureFab`   | Floating "download brochure" button. |
| `SiteScripts`   | Client-side interactions for the injected HTML — scroll reveal, counters, accordions, blog filters, form submit. Keyed on the route so it re-runs per page. |
| `JourneyScripts`| Extra interactions for the Journey page only. |

`SiteScripts.js` is the JS counterpart to the HTML bodies: since bodies are static
HTML, this component wires up their behavior after they mount. Its hooks key off
`data-*` attributes — which is why the sanitizer (section 2) preserves them.

---

## 5. Styling

Plain global CSS, no framework. The **design system** lives in CSS variables at
the top of [`styles/styles.css`](../styles/styles.css):

- Colors: `--navy`, `--purple`, `--magenta`, `--teal`, `--gold`, surfaces, text.
- Type: `--font-display` (Playfair Display), `--font-sans` (Plus Jakarta Sans).
- Layout: `--shell` (max width), radii, shadows, gradients.

`home.css`, `pages.css`, `journey.css` style specific pages. `scholar.css` styles
the portfolio and is **scoped under `.scholar-site`** so it can never affect the
college site. All are imported once in `app/layout.js` (except `scholar.css`,
imported in `app/(portfolio)/layout.js`).

---

## 6. Asset paths & sub-path hosting

Assets live in `public/assets/…` and are referenced root-absolute (`/assets/…`).

[`lib/basePath.js`](../lib/basePath.js) exposes `BASE_PATH` (from
`NEXT_PUBLIC_BASE_PATH`) and an `asset()` helper. For a **root domain** the base
path is empty and paths work as-is. For **sub-path hosting** (e.g. GitHub project
pages at `/repo-name/`), set `NEXT_PUBLIC_BASE_PATH=/repo-name` at build time and
both `PageContent` (for HTML bodies) and `asset()` (for JSX `<img>`) prefix it.

---

## 7. Forms & security (pointers)

- **Forms** submit to Web3Forms (no backend). Details: [`FORMS-SETUP.md`](FORMS-SETUP.md).
- **Security** is baked into the files (sanitization, CSP `<meta>`, headers files)
  with one host dependency (real response headers + HTTPS).
  Details: [`SECURITY-HANDOVER.md`](SECURITY-HANDOVER.md).

---

## 8. Build output

`npm run build` → `out/`:

```
out/
├─ index.html                 /
├─ about/index.html           /about/
├─ blog/index.html            /blog/
├─ blog/<article>/index.html  /blog/<article>/
├─ Naveen-Kumar-G/index.html  /Naveen-Kumar-G/
├─ _next/                      hashed JS/CSS bundles
├─ assets/                     copied from public/assets/
├─ _headers  .htaccess         copied from public/ (security headers per host)
└─ 404.html
```

Upload the contents of `out/` to the host's web root. That folder is the whole
website.
