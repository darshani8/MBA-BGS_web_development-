import '../styles/styles.css';
import '../styles/home.css';
import '../styles/pages.css';
import '../styles/journey.css';

import UtilBar from './components/UtilBar';
import Nav from './components/Nav';
import Ticker from './components/Ticker';
import Footer from './components/Footer';
import BrochureFab from './components/BrochureFab';
import SiteScripts from './components/SiteScripts';

export const metadata = {
  title: 'BGSCET | MBA — Create, Enrich, Transform · Bengaluru',
  description:
    "BGSCET MBA, Bengaluru — Karnataka's premier business school. Admissions open for 2026–27. Approved by AICTE, Affiliated to VTU.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <UtilBar />
        <Nav />
        <Ticker />
        {children}
        <Footer />
        <BrochureFab />
        <SiteScripts />
      </body>
    </html>
  );
}
