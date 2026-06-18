import Link from 'next/link';

/* Standalone academic-site header for the portfolio route group. Deliberately
   minimal — brand on the left, About/Research on the right — so the portfolio
   reads as a personal scholar page rather than the college site. Styled by
   styles/scholar.css (namespaced under .scholar-site). Plain server component:
   next/link needs no client boundary, and we rely on CSS :hover rather than
   active-link highlighting to avoid pulling in usePathname(). */
export default function ScholarHeader() {
  return (
    <header className="sch-header">
      <div className="sch-bar">
        <Link href="/Naveen-Kumar-G/" className="sch-brand">
          Naveen Kumar G
        </Link>
        <nav className="sch-nav">
          <Link href="/Naveen-Kumar-G/">About</Link>
          <Link href="/Naveen-Kumar-G/research/">Research</Link>
        </nav>
      </div>
    </header>
  );
}
