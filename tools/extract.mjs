/* One-off build helper: extract each source page's unique content (the part
   between the shared mobile drawer and the shared footer) into
   content/<name>.html, rewriting asset paths and internal .html links for the
   Next.js routes. Run with: node tools/extract.mjs */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = 'C:\\Users\\admin\\BGSCET-MBA';
const OUT = join(__dirname, '..', 'content');
mkdirSync(OUT, { recursive: true });

// source file -> output fragment name (also the route segment)
const pages = {
  'index.html': 'home',
  'about.html': 'about',
  'programs.html': 'programs',
  'admissions.html': 'admissions',
  'contact.html': 'contact',
  'blog.html': 'blog',
  'people.html': 'people',
  'journey.html': 'journey',
  'gallery.html': 'gallery',
  'login.html': 'login',
  'sitemap.html': 'sitemap',
  'privacy-policy.html': 'privacy-policy',
  'terms-of-use.html': 'terms-of-use',
  'blog-analytics.html': 'blog-analytics',
  'blog-bplan.html': 'blog-bplan',
  'blog-casestudy.html': 'blog-casestudy',
  'blog-dayinlife.html': 'blog-dayinlife',
  'blog-resume.html': 'blog-resume',
  'blog-skills.html': 'blog-skills',
  'blog-specializations.html': 'blog-specializations',
};

function rewriteLinks(html) {
  // assets: relative -> absolute from web root
  html = html.replace(/(src|data-src|href|poster)="assets\//g, '$1="/assets/');
  // internal .html links -> clean trailing-slash routes, preserving #frag / ?query
  html = html.replace(
    /href="([a-zA-Z0-9_\-]+)\.html(#[^"]*|\?[^"]*)?"/g,
    (m, name, tail = '') => {
      const base = name === 'index' ? '/' : `/${name}/`;
      return `href="${base}${tail}"`;
    }
  );
  return html;
}

function extractContent(html) {
  let body = html.slice(html.indexOf('<body>') + 6, html.indexOf('</body>'));
  // drop the footer (and the brochure FAB + script that follow it) — they live in the layout
  const footIdx = body.indexOf('<footer');
  if (footIdx !== -1) body = body.slice(0, footIdx);
  // drop the shared chrome (util bar + nav + mobile drawer): everything up to
  // and including the drawer, whose close is the first run of 3 </div> after .d-cta
  const dCta = body.indexOf('class="d-cta"');
  if (dCta !== -1) {
    const after = body.slice(dCta);
    const m = after.match(/(?:<\/div>\s*){3}/);
    if (m) body = after.slice(m.index + m[0].length);
  }
  // remove the announcements ticker (shared chrome) when present, incl. its comment
  body = body.replace(
    /(?:<!--\s*TICKER\s*-->\s*)?<div class="ticker"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
    ''
  );
  return body.trim() + '\n';
}

for (const [file, name] of Object.entries(pages)) {
  const html = readFileSync(join(SRC, file), 'utf8');
  const content = rewriteLinks(extractContent(html));
  writeFileSync(join(OUT, `${name}.html`), content, 'utf8');
  console.log(`${file.padEnd(24)} -> content/${name}.html  (${content.length} chars)`);
}
console.log(`Done. ${Object.keys(pages).length} fragments.`);
