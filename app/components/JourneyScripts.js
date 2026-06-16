'use client';

import { useEffect } from 'react';

/* The Journey page: scroll-spy rail + glowing spine fill + milestone reveals.
   Ported from the original journey.js. Mounted only on /journey/, so it sets
   up on mount and tears down its listeners/observer on unmount. */
export default function JourneyScripts() {
  useEffect(() => {
    const items = [].slice.call(document.querySelectorAll('.tl-item'));

    function revealInView() {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.classList.contains('seen')) continue;
        const r = el.getBoundingClientRect();
        if (r.height > 0 && r.top < vh * 0.92 && r.bottom > 0) {
          el.classList.add('seen');
        }
      }
    }

    let io;
    if ('IntersectionObserver' in window && items.length) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('seen');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.18, rootMargin: '0px 0px -6% 0px' }
      );
      items.forEach((el) => io.observe(el));
    }

    const timelines = [].slice.call(document.querySelectorAll('.tl'));
    function paintSpines() {
      const refY = window.innerHeight * 0.62;
      timelines.forEach((tl) => {
        const fill = tl.querySelector('.tl-fill');
        if (!fill) return;
        const rect = tl.getBoundingClientRect();
        let prog = refY - rect.top;
        prog = Math.max(0, Math.min(prog, rect.height));
        fill.style.height = prog + 'px';
        const tlItems = tl.querySelectorAll('.tl-item');
        for (let i = 0; i < tlItems.length; i++) {
          const node = tlItems[i].querySelector('.tl-node');
          const nodeY = (node ? node.offsetTop : tlItems[i].offsetTop) + 10;
          tlItems[i].classList.toggle('lit', nodeY <= prog);
        }
      });
    }

    const steps = {};
    [].slice.call(document.querySelectorAll('.pr-step')).forEach((s) => {
      steps[s.getAttribute('data-rail')] = s;
    });
    const phases = [].slice.call(document.querySelectorAll('.phase'));
    function spyRail() {
      const line = window.innerHeight * 0.4;
      let current = null;
      phases.forEach((p) => {
        const r = p.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) current = p.id;
      });
      if (!current && phases.length) {
        if (phases[0].getBoundingClientRect().top > line) current = null;
        else current = phases[phases.length - 1].id;
      }
      for (const k in steps) steps[k].classList.toggle('active', k === current);
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        revealInView();
        paintSpines();
        spyRail();
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('load', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('load', onScroll);
      if (io) io.disconnect();
    };
  }, []);

  return null;
}
