'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function BrochureFab() {
  const ref = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const fab = ref.current;
    if (!fab) return;
    const hero = document.querySelector('.hero');
    const foot = document.querySelector('.footer');
    const onScroll = () => {
      // stay hidden until the hero is scrolled past (pages without a hero show it immediately)
      const pastHero = hero ? hero.getBoundingClientRect().bottom <= 90 : true;
      // hide once the footer reaches the viewport so the button ends just above it
      const hitFooter = foot ? foot.getBoundingClientRect().top <= window.innerHeight - 16 : false;
      fab.classList.toggle('fab-hidden', !pastHero || hitFooter);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return (
    <a ref={ref} className="brochure-fab fab-hidden" href="#" aria-label="Download Brochure">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" /></svg>
      Download Brochure
    </a>
  );
}
