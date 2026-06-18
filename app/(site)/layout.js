import UtilBar from '@/app/components/UtilBar';
import Nav from '@/app/components/Nav';
import Ticker from '@/app/components/Ticker';
import Footer from '@/app/components/Footer';
import BrochureFab from '@/app/components/BrochureFab';
import SiteScripts from '@/app/components/SiteScripts';

/* Shared chrome for the main college site. Lives in the (site) route group so
   the standalone portfolio routes can opt out of it while the root layout keeps
   ownership of <html>/<body>, global CSS and fonts. Route groups don't affect
   URLs, so every page under here keeps its original path. */
export default function SiteLayout({ children }) {
  return (
    <>
      <UtilBar />
      <Nav />
      <Ticker />
      {children}
      <Footer />
      <BrochureFab />
      <SiteScripts />
    </>
  );
}
