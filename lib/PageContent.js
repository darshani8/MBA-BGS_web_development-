import { readFileSync } from 'fs';
import { join } from 'path';
import { BASE_PATH } from './basePath';

/* Server component: reads a pre-extracted HTML fragment at build time and
   injects it. Used as the strangler-migration step — the shared shell
   (nav/footer/etc.) is real React; each page body is the original markup,
   ready to be refactored into fine-grained components incrementally.
   Root-absolute refs (/assets, /route) are prefixed with the base path so the
   site works under a GitHub project-pages subpath. */
export default function PageContent({ name, tag: Tag = 'main' }) {
  let html = readFileSync(join(process.cwd(), 'content', `${name}.html`), 'utf8');
  if (BASE_PATH) {
    html = html.replace(/(src|data-src|href|poster)="\//g, `$1="${BASE_PATH}/`);
  }
  return <Tag dangerouslySetInnerHTML={{ __html: html }} />;
}
