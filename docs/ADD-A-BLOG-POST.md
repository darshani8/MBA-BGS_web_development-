# How to add a blog post

The blog is updated regularly. Each post is **two files** plus a **card** on the
blog index. No coding beyond copy-paste. Budget ~10 minutes.

> Background: page bodies live as HTML in `content/` and are injected by
> `lib/PageContent.js` (which sanitizes them). See
> [ARCHITECTURE.md](ARCHITECTURE.md) for the full picture. Blog articles live at
> the URL `/blog/<slug>/`.

---

## Step 0 — choose a slug

Pick a short, descriptive, lowercase, hyphenated slug from the article topic — it
becomes the URL. Examples already in use: `business-analytics`, `mba-resume`,
`day-in-the-life`. Avoid abbreviations; the slug should be readable on its own.

For this guide assume the slug is **`placement-tips`**.

---

## Step 1 — write the article body

Create **`content/blog/placement-tips.html`**. Easiest: copy an existing article
(e.g. `content/blog/business-analytics.html`) and replace the text. The file is
the article body only — the header and footer are added automatically.

Notes:
- Reference images as `/assets/blog/<image>.webp` and put the image in
  `public/assets/blog/`.
- You may paste rich HTML; the build **sanitizes** it (removes `<script>`, inline
  `onclick=`, `javascript:` links). Normal markup, images, lists, links are fine.

---

## Step 2 — create the route

Create **`app/(site)/blog/placement-tips/page.js`**:

```jsx
import PageContent from '@/lib/PageContent';

export const metadata = {
  title: 'Your Article Title | BGSCET MBA',
  description: 'One-sentence summary for search results and link previews.',
};

export default function PlacementTipsPage() {
  return <PageContent name="blog/placement-tips" />;
}
```

> The `name` prop is the path under `content/` **without** `.html` — so
> `content/blog/placement-tips.html` → `name="blog/placement-tips"`. The folder
> name under `app/(site)/blog/` must match the slug.

This publishes the article at **`/blog/placement-tips/`**.

---

## Step 3 — add a card to the blog index

Open **`content/blog.html`**, find the `<div class="blog-grid">`, and add a card
(copy an existing `<a class="bp-card …">` block and edit it):

```html
<a class="bp-card reveal" data-cat="placements" href="/blog/placement-tips/">
  <div class="bp-img">
    <img width="1200" height="668" src="/assets/blog/placement-tips.webp"
         alt="Your Article Title" loading="lazy"/>
    <span class="bp-cat">Placements</span>
  </div>
  <div class="bp-body">
    <div class="bp-meta"><span>Jun 20, 2026</span>·<span>5 min</span></div>
    <h3>Your Article Title</h3>
    <p>One-line teaser shown on the card.</p>
    <span class="bp-link">Read
      <svg class="arr" viewBox="0 0 24 24" width="16" height="16" fill="none"
           stroke="currentColor" stroke-width="2"><path d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
    </span>
  </div>
</a>
```

- `data-cat` drives the index's category filter. Use an existing value:
  `placements`, `campus`, `industry`, `academics`, `careers` (match the others).
- `href` must equal `/blog/<slug>/` with the trailing slash.

*(Optional)* The articles also cross-link to each other in a "related posts"
section at the bottom of each `content/blog/*.html`; add a link there if you like.
You can also feature the post on the home page (`content/home.html`).

---

## Step 4 — preview and publish

```bash
npm run dev          # open http://localhost:3000/blog/  → your card shows;
                     # click it → the article renders at /blog/placement-tips/
npm run build        # regenerate the static site into out/
```

Then deploy (`out/` to the host) as usual — see
[SECURITY-HANDOVER.md](SECURITY-HANDOVER.md).

---

## Checklist

- [ ] `content/blog/<slug>.html` created (article body).
- [ ] `app/(site)/blog/<slug>/page.js` created with `name="blog/<slug>"` and metadata.
- [ ] Image added to `public/assets/blog/` and referenced in both files.
- [ ] Card added to `content/blog.html` with `href="/blog/<slug>/"`.
- [ ] `npm run build` succeeds; the article opens at `/blog/<slug>/`.
