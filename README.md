# BGSCET MBA — Website (Developer Handoff)

Static, dependency-free marketing site for the BGSCET MBA program. Plain HTML + CSS + vanilla JS — no build step, no framework, no package manager. Open `index.html` in a browser or serve the folder with any static host.

## Run locally
Any static server works, e.g.:
```
npx serve .
# or
python3 -m http.server 8000
```
Then open http://localhost:8000/ . (Opening `index.html` via file:// also works, but a server is recommended so relative paths and fonts behave like production.)

## Structure
```
index.html              Home
about.html              About / vision / leadership messages
programs.html           MBA program detail
admissions.html         Admissions + multi-step lead form
journey.html            Student journey timeline
people.html             Leadership + faculty
gallery.html            Campus gallery
blog.html               Blog index (+ blog-*.html articles)
contact.html            Contact + enquiry form
login.html              Student/faculty login (mock)
sitemap.html            HTML sitemap
privacy-policy.html, terms-of-use.html

styles.css              Global tokens, nav, footer, shared components, responsive base
home.css                Home-page sections (hero, stats, testimonials, etc.)
pages.css               Interior pages (leadership, faculty, programs, forms)
journey.css             Journey timeline page
site.js                 Shared interactions (nav drawer, reveals, counters,
                        accordions, forms, testimonial year filter, FAB)
journey.js              Journey page interactions
assets/                 All images (webp/jpeg), logos, icons
```

## CSS architecture
- Design tokens (colors, radii, shadows, fonts) are CSS custom properties in `:root` in `styles.css`.
- Fonts: Playfair Display (display) + Plus Jakarta Sans (body) via Google Fonts `<link>`.
- Responsive: mobile-first breakpoints at 1140 / 1080 / 980 / 900 / 820 / 760 / 640 / 620 / 600 / 560 / 520 / 440 px. Grids collapse to 1 column on phones; nav switches to a hamburger drawer below 1140px.

## JavaScript notes
`site.js` is a single IIFE that feature-detects each widget, so it's safe to include on every page. Notable behaviors:
- Mobile nav drawer (`.nav-toggle` / `.drawer`).
- Scroll reveals via IntersectionObserver (graceful fallback if unsupported).
- Animated stat counters and placement bars.
- FAQ + program-detail accordions.
- Testimonials filtered by graduating year (`#testiYears` / `#testiGrid`).
- Multi-step lead form + mock login/newsletter submit (front-end only).

## Forms — needs backend wiring
All forms (admissions lead form, contact, login, newsletter) are **front-end mocks** — they validate and show a success state but do **not** submit anywhere. Wire these to your backend / CRM / email service before launch.

## Images
- Photographs are pre-cropped and compressed (`.webp` mostly, some `.jpeg`). Source/raw originals are not included in this package.
- Faculty + testimonial avatars are square/centered crops sized for their circular frames.

## Known TODO for next stage
1. Connect all forms to a backend.
2. Replace mock login with real auth.
3. Add real brochure PDF for the "Download Brochure" button.
4. Add analytics + meta/OG tags per page for SEO as needed.
5. Optionally introduce a build step (minification, asset hashing) — not required for the current static setup.
