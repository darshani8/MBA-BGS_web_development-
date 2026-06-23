import '@/styles/scholar.css';
import { Newsreader, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google';

/* Route group for the standalone academic portfolio. The root layout owns
   <html>/<body> and the global college CSS; this group renders ONLY the
   self-contained "bento" profile page wrapped in .scholar-site, so scholar.css
   (and its fonts) stay fully scoped and none of the college chrome
   (Nav/Ticker/Footer/SiteScripts) bleeds in. The portfolio is a single page,
   so it carries no separate header or footer of its own.

   The three portfolio fonts are self-hosted via next/font (downloaded at build
   time, served from this origin — no Google Fonts round-trip, so the site CSP
   needs no external font origins). Because the portfolio layout doesn't own
   <html>, each font's CSS variable is attached to the .scholar-site wrapper,
   where scholar.css reads them as --serif / --sans / --mono. */
const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
});
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hanken',
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

export default function PortfolioLayout({ children }) {
  return (
    <div className={`scholar-site ${newsreader.variable} ${hanken.variable} ${plexMono.variable}`}>
      {children}
    </div>
  );
}
