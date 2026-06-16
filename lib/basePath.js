// Inlined at build time (NEXT_PUBLIC_*). Empty for local dev / root deploys.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Prefix a root-absolute asset path (e.g. "/assets/x.png") with the base path.
// next/link adds the base path automatically, so this is only for raw <img src>.
export const asset = (p) => `${BASE_PATH}${p}`;
