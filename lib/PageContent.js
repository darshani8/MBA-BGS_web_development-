import { readFileSync } from 'fs';
import { join } from 'path';
import sanitizeHtml from 'sanitize-html';
import { BASE_PATH } from './basePath';

/* Server component: reads a pre-extracted HTML fragment at build time and
   injects it. Used as the strangler-migration step — the shared shell
   (nav/footer/etc.) is real React; each page body is the original markup,
   ready to be refactored into fine-grained components incrementally.
   Root-absolute refs (/assets, /route) are prefixed with the base path so the
   site works under a GitHub project-pages subpath.

   SECURITY: every fragment (including the weekly blog HTML) is sanitized at
   build time before it's injected. This strips <script>, inline on*= event
   handlers, and javascript:/data: URLs, so even tampered or pasted-in blog
   markup can't run code — while KEEPING all the rich markup the pages rely on
   (svg, the Google Maps iframe, forms, and every data-* attribute the
   interactive scripts read). */

// Attributes every tag is allowed to carry. data-* and aria-* are kept globally
// because the page scripts (SiteScripts.js) and accessibility both depend on them.
const COMMON_ATTRS = [
  'class', 'id', 'style', 'title', 'role', 'tabindex', 'hidden',
  'data-*', 'aria-*',
];

const SANITIZE_OPTIONS = {
  // Start from the default allowlist and add the tags this site uses.
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    // media / structure not in the default set
    'img', 'figure', 'figcaption', 'picture', 'source', 'video', 'audio',
    'section', 'article', 'header', 'footer', 'main', 'aside', 'nav',
    'button', 'label', 'span', 'svg', 'path', 'circle', 'rect', 'line',
    'polyline', 'polygon', 'g', 'defs', 'use', 'iframe',
    // forms (contact / admissions / programs / lead form)
    'form', 'input', 'select', 'option', 'optgroup', 'textarea', 'fieldset', 'legend',
  ],
  allowedAttributes: {
    '*': COMMON_ATTRS,
    a: ['href', 'name', 'target', 'rel', ...COMMON_ATTRS],
    img: ['src', 'srcset', 'alt', 'width', 'height', 'loading', 'decoding', 'fetchpriority', 'sizes', ...COMMON_ATTRS],
    source: ['src', 'srcset', 'type', 'media', 'sizes', ...COMMON_ATTRS],
    video: ['src', 'poster', 'controls', 'autoplay', 'muted', 'loop', 'playsinline', 'width', 'height', ...COMMON_ATTRS],
    audio: ['src', 'controls', ...COMMON_ATTRS],
    // Google Maps embed
    iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'loading', 'referrerpolicy', 'frameborder', ...COMMON_ATTRS],
    // SVG icons used throughout the markup
    svg: ['viewbox', 'viewBox', 'fill', 'stroke', 'stroke-width', 'width', 'height', 'xmlns', 'preserveaspectratio', ...COMMON_ATTRS],
    path: ['d', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', ...COMMON_ATTRS],
    circle: ['cx', 'cy', 'r', 'fill', 'stroke', 'stroke-width', ...COMMON_ATTRS],
    rect: ['x', 'y', 'width', 'height', 'rx', 'ry', 'fill', 'stroke', ...COMMON_ATTRS],
    line: ['x1', 'y1', 'x2', 'y2', 'stroke', 'stroke-width', ...COMMON_ATTRS],
    polyline: ['points', 'fill', 'stroke', ...COMMON_ATTRS],
    polygon: ['points', 'fill', 'stroke', ...COMMON_ATTRS],
    g: ['fill', 'stroke', 'transform', ...COMMON_ATTRS],
    // <use> is not used anywhere on the site; drop href/xlink:href so no
    // cross-origin SVG reference can survive sanitization. (Add a fragment-only
    // filter here if same-document sprites are introduced later.)
    use: [...COMMON_ATTRS],
    // form controls
    form: ['action', 'method', 'novalidate', 'name', ...COMMON_ATTRS],
    input: ['type', 'name', 'value', 'placeholder', 'required', 'checked', 'disabled', 'readonly', 'min', 'max', 'step', 'pattern', 'autocomplete', 'maxlength', ...COMMON_ATTRS],
    select: ['name', 'required', 'multiple', 'disabled', ...COMMON_ATTRS],
    option: ['value', 'selected', 'disabled', ...COMMON_ATTRS],
    textarea: ['name', 'placeholder', 'required', 'rows', 'cols', 'maxlength', ...COMMON_ATTRS],
    button: ['type', 'name', 'value', 'disabled', ...COMMON_ATTRS],
    label: ['for', ...COMMON_ATTRS],
  },
  // Allow the data: scheme only for images (some inline svg/data images); links
  // and other contexts cannot use javascript:/data:.
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['http', 'https', 'data'] },
  allowProtocolRelative: true,
  // Only allow the Google Maps domain to be framed.
  allowedIframeHostnames: ['www.google.com', 'google.com'],
  // Constrain inline style= values. The fragments use inline style heavily for
  // cosmetics (colors, spacing, sizing), so we KEEP those — but we do NOT allow
  // positioning/stacking props (position/top/left/right/bottom/inset/z-index),
  // which is how a tampered/pasted blog fragment could lay a full-viewport
  // invisible overlay over the page (clickjacking / UI-redress). Anything not in
  // this allowlist is stripped from the style attribute.
  allowedStyles: {
    '*': {
      color: [/.*/],
      'background': [/^(?!.*url\s*\(\s*(['"]?)\s*javascript:).*/i],
      'background-color': [/.*/],
      'background-image': [/^url\(\s*['"]?(https?:|\/|data:image\/)/i],
      'background-size': [/.*/], 'background-position': [/.*/], 'background-repeat': [/.*/],
      'border': [/.*/], 'border-color': [/.*/], 'border-width': [/.*/], 'border-style': [/.*/],
      'border-radius': [/.*/], 'box-shadow': [/.*/], 'outline': [/.*/],
      'margin': [/.*/], 'margin-top': [/.*/], 'margin-right': [/.*/], 'margin-bottom': [/.*/], 'margin-left': [/.*/],
      'padding': [/.*/], 'padding-top': [/.*/], 'padding-right': [/.*/], 'padding-bottom': [/.*/], 'padding-left': [/.*/],
      'width': [/.*/], 'min-width': [/.*/], 'max-width': [/.*/],
      'height': [/.*/], 'min-height': [/.*/], 'max-height': [/.*/],
      'display': [/.*/], 'flex': [/.*/], 'flex-direction': [/.*/], 'flex-wrap': [/.*/], 'gap': [/.*/],
      'align-items': [/.*/], 'justify-content': [/.*/], 'align-self': [/.*/], 'order': [/.*/],
      'grid-template-columns': [/.*/], 'grid-template-rows': [/.*/], 'grid-column': [/.*/], 'grid-row': [/.*/],
      'font': [/.*/], 'font-size': [/.*/], 'font-weight': [/.*/], 'font-family': [/.*/], 'font-style': [/.*/],
      'line-height': [/.*/], 'letter-spacing': [/.*/], 'text-align': [/.*/], 'text-transform': [/.*/],
      'text-decoration': [/.*/], 'white-space': [/.*/], 'word-break': [/.*/], 'overflow': [/.*/],
      'opacity': [/^(?:0?\.\d+|1(?:\.0+)?|0)$/], // keep opacity but only normal 0–1 values
      'transform': [/.*/], 'transition': [/.*/], 'object-fit': [/.*/], 'aspect-ratio': [/.*/],
      'list-style': [/.*/], 'cursor': [/.*/], 'visibility': [/^(?:visible|hidden|collapse)$/],
      // NOTE: position, top, left, right, bottom, inset, z-index, float are
      // deliberately NOT allowed → no off-page/overlay injection.
    },
  },
  parser: { lowerCaseAttributeNames: false }, // preserve viewBox etc. casing
};

export default function PageContent({ name, tag: Tag = 'main' }) {
  let html = readFileSync(join(process.cwd(), 'content', `${name}.html`), 'utf8');
  html = sanitizeHtml(html, SANITIZE_OPTIONS);
  if (BASE_PATH) {
    html = html.replace(/(src|data-src|href|poster)="\//g, `$1="${BASE_PATH}/`);
  }
  return <Tag dangerouslySetInnerHTML={{ __html: html }} />;
}
