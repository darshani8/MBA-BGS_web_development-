import '@/styles/scholar.css';
import ScholarHeader from '@/app/components/ScholarHeader';
import Footer from '@/app/components/Footer';

/* Route group for the standalone academic portfolio. The root layout owns
   <html>/<body>, global CSS and fonts; this group renders only the scholar
   header + page + the shared college Footer (kept for branding) and inherits
   none of the college chrome (Nav/Ticker/UtilBar/BrochureFab/SiteScripts).
   Everything is wrapped in .scholar-site so scholar.css stays scoped. */
export default function PortfolioLayout({ children }) {
  return (
    <div className="scholar-site">
      <ScholarHeader />
      {children}
      <Footer />
    </div>
  );
}
