import PageContent from '@/lib/PageContent';
import { asset } from '@/lib/basePath';

export default function HomePage() {
  return (
    <>
      {/* Preload the LCP hero image so it starts downloading before the CSS/JS
          parse — pairs with the fetchpriority="high" on the <img> in home.html. */}
      <link
        rel="preload"
        as="image"
        type="image/webp"
        href={asset('/assets/hero-1.webp')}
        fetchPriority="high"
      />
      <PageContent name="home" />
    </>
  );
}
