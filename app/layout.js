import '../styles/styles.css';
import '../styles/home.css';
import '../styles/pages.css';
import '../styles/journey.css';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';

// Self-hosted via next/font: the fonts are downloaded at build time and served
// from this origin (no fonts.googleapis.com / fonts.gstatic.com round-trip),
// which is why the CSP below no longer lists those origins. Each font exposes a
// CSS variable; styles.css feeds them into --font-display / --font-sans.
const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

export const metadata = {
  title: 'BGSCET | MBA — Create, Enrich, Transform · Bengaluru',
  description:
    "BGSCET MBA, Bengaluru — Karnataka's premier business school. Admissions open for 2026–27. Approved by AICTE, Affiliated to VTU.",
};

export default function RootLayout({ children }) {
  // In dev, Next.js/React need eval() for HMR & debugging, so allow 'unsafe-eval'
  // ONLY during development. The production build (output: 'export') ships the
  // strict policy below WITHOUT 'unsafe-eval' — React never uses eval in prod.
  const isDev = process.env.NODE_ENV !== 'production';
  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'";
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        {/* Security headers baked into the HTML so they apply on ANY host
            (no server config needed). The host-format copies in public/_headers
            and public/.htaccess add the few headers <meta> can't carry
            (HSTS, frame-ancestors). Fonts are self-hosted via next/font, so the
            CSP allowlist now only needs the Google Maps iframe and Web3Forms. */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={[
            "default-src 'self'",
            "base-uri 'self'",
            "object-src 'none'",
            "form-action 'self' https://api.web3forms.com",
            "img-src 'self' data: https:",
            scriptSrc,
            "style-src 'self' 'unsafe-inline'",
            "font-src 'self'",
            "connect-src 'self' https://api.web3forms.com",
            "frame-src https://www.google.com",
          ].join('; ')}
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {/* Favicons, app icons and PWA manifest (files live in public/). */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#5b2587" />
      </head>
      <body>{children}</body>
    </html>
  );
}
