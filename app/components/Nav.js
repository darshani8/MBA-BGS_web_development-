'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { asset } from '@/lib/basePath';

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // navbar shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // body scroll lock + Escape-to-close while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  // close the drawer whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const active = (href) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href);

  return (
    <>
      <header className={scrolled ? 'nav scrolled' : 'nav'}>
        <div className="shell">
          <Link href="/" className="brand" aria-label="BGSCET MBA home">
            <img width="200" height="230" className="crest" src={asset('/assets/logo-shield-trim.png')} alt="BGSCET MBA crest" />
            <img width="500" height="60" className="wm" src={asset('/assets/logo-wordmark-only.png')} alt="BGSCET MBA" />
          </Link>
          <nav className="nav-links" aria-label="primary">
            <Link href="/" className={active('/') ? 'active' : undefined}>Home</Link>
            <Link href="/about/" className={active('/about') ? 'active' : undefined}>About</Link>
            <Link href="/people/" className={active('/people') ? 'active' : undefined}>People</Link>
            <div className="nav-dd">
              <Link className="nav-dd-btn" href="/programs/" aria-haspopup="true">
                Programs
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </Link>
              <div className="nav-dd-menu" role="menu">
                <Link href="/programs/" role="menuitem">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>
                  Programs Overview
                </Link>
                <Link href="/programs/#admissions" role="menuitem">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M9 13l2 2 4-4" /></svg>
                  Admissions
                </Link>
                <Link href="/journey/" role="menuitem">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" /><path d="M9 3v15M15 6v15" /></svg>
                  The Journey
                </Link>
              </div>
            </div>
            <Link href="/blog/" className={active('/blog') ? 'active' : undefined}>Blog</Link>
          </nav>
          <div className="nav-cta">
            <Link href="/login/" className="btn btn-ghost btn-sm">
              Login
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </Link>
            <Link href="/contact/" className="btn btn-primary btn-sm apply-key">
              Contact Us
              <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m0 0l-6-6m6 6l-6 6" /></svg>
            </Link>
            <button className="nav-toggle" aria-label="menu" aria-expanded={open} onClick={() => setOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            </button>
          </div>
        </div>
      </header>

      <div className={open ? 'drawer open' : 'drawer'} aria-hidden={open ? 'false' : 'true'}>
        <div className="drawer-veil" onClick={() => setOpen(false)}></div>
        <div className="drawer-panel">
          <div className="d-head">
            <img width="500" height="95" src={asset('/assets/logo-wordmark-trim.png')} alt="BGSCET MBA" style={{ height: '24px' }} />
            <button className="drawer-close" aria-label="close" onClick={() => setOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about/" onClick={() => setOpen(false)}>About</Link>
          <Link href="/people/" onClick={() => setOpen(false)}>People</Link>
          <Link href="/programs/" onClick={() => setOpen(false)}>Programs</Link>
          <Link href="/programs/#admissions" onClick={() => setOpen(false)}>Admissions</Link>
          <Link href="/journey/" onClick={() => setOpen(false)}>The Journey</Link>
          <Link href="/blog/" onClick={() => setOpen(false)}>Blog</Link>
          <div className="d-cta">
            <Link href="/login/" className="btn btn-ghost" onClick={() => setOpen(false)}>Login</Link>
            <Link href="/contact/" className="btn btn-primary" onClick={() => setOpen(false)}>Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  );
}
