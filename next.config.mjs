/** @type {import('next').NextConfig} */

// On GitHub *project* Pages the site is served from /<repo>/ — set
// NEXT_PUBLIC_BASE_PATH to that subpath at build time. Empty for local dev and
// for root deployments (custom domain / user page / AWS).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  // Produce a fully static site in `out/` — deployable to GitHub Pages, AWS S3+CloudFront, any static host.
  output: 'export',
  // Static hosts serve folder/index.html cleanly with a trailing slash.
  trailingSlash: true,
  // next/image optimization needs a server; static export must use plain <img>.
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
