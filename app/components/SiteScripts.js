'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* Page-content interactions ported from the original site.js. Runs after each
   route's content mounts (keyed on pathname) and cleans up timers/observers on
   unmount so nothing stacks across client-side navigations. The persistent
   shell behaviours (nav shadow, mobile drawer, brochure FAB) live in their own
   components (Nav, BrochureFab). */
export default function SiteScripts() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups = [];
    const observers = [];
    const addObserver = (o) => {
      observers.push(o);
      return o;
    };

    /* hero photo loop (crossfade) */
    const slides = document.querySelectorAll('.hero-bg .slide');
    if (slides.length > 1) {
      const hydrate = () => {
        slides.forEach((s) => {
          const im = s.querySelector('img[data-src]');
          if (im) {
            im.src = im.getAttribute('data-src');
            im.removeAttribute('data-src');
          }
        });
      };
      if ('requestIdleCallback' in window) {
        requestIdleCallback(hydrate, { timeout: 2500 });
      } else {
        const onLoad = () => setTimeout(hydrate, 400);
        window.addEventListener('load', onLoad);
        cleanups.push(() => window.removeEventListener('load', onLoad));
      }
      let i = 0;
      const id = setInterval(() => {
        slides[i].classList.remove('on');
        i = (i + 1) % slides.length;
        slides[i].classList.add('on');
      }, 4200);
      cleanups.push(() => clearInterval(id));
    }

    /* reveal on scroll */
    const revs = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revs.length) {
      const io = addObserver(
        new IntersectionObserver(
          (es) => {
            es.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add('in');
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        )
      );
      revs.forEach((el) => io.observe(el));
    } else {
      revs.forEach((el) => el.classList.add('in'));
    }

    /* counters */
    function animateCount(el) {
      const target = parseFloat(el.getAttribute('data-count'));
      const dec = el.getAttribute('data-dec') === '1';
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const dur = 1400;
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent =
          prefix + (dec ? val.toFixed(1) : Math.round(val).toLocaleString('en-IN')) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else
          el.textContent =
            prefix + (dec ? target.toFixed(1) : Math.round(target).toLocaleString('en-IN')) + suffix;
      }
      requestAnimationFrame(step);
    }
    const counters = document.querySelectorAll('[data-count]');
    if ('IntersectionObserver' in window && counters.length) {
      const cio = addObserver(
        new IntersectionObserver(
          (es) => {
            es.forEach((e) => {
              if (e.isIntersecting) {
                animateCount(e.target);
                cio.unobserve(e.target);
              }
            });
          },
          { threshold: 0.5 }
        )
      );
      counters.forEach((el) => cio.observe(el));
    }

    /* placement bars */
    const bars = document.querySelectorAll('.pb .bar i');
    if ('IntersectionObserver' in window && bars.length) {
      const bio = addObserver(
        new IntersectionObserver(
          (es) => {
            es.forEach((e) => {
              if (e.isIntersecting) {
                e.target.style.width = e.target.getAttribute('data-w');
                bio.unobserve(e.target);
              }
            });
          },
          { threshold: 0.4 }
        )
      );
      bars.forEach((el) => bio.observe(el));
    }

    /* journey active toggle */
    const jcards = document.querySelectorAll('.jr-card');
    jcards.forEach((c) => {
      c.addEventListener('click', function () {
        jcards.forEach((x) => x.classList.remove('active'));
        c.classList.add('active');
      });
    });

    /* FAQ accordion */
    document.querySelectorAll('.faq-item').forEach((item) => {
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      q.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach((x) => {
          x.classList.remove('open');
          x.querySelector('.faq-a').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });

    /* program detail accordion */
    document.querySelectorAll('.pd-item').forEach((item) => {
      const head = item.querySelector('.pd-head');
      const body = item.querySelector('.pd-body');
      if (item.classList.contains('open')) body.style.maxHeight = body.scrollHeight + 'px';
      head.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.pd-item').forEach((x) => {
          x.classList.remove('open');
          x.querySelector('.pd-body').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });

    /* field filled state for selects */
    document.querySelectorAll('.field select').forEach((sel) => {
      const sync = () => sel.parentElement.classList.toggle('filled', !!sel.value);
      sel.addEventListener('change', sync);
      sync();
    });

    /* multi-step lead form */
    const lead = document.querySelector('#leadForm');
    if (lead) {
      const pages = lead.querySelectorAll('.lc-page');
      const steps = document.querySelectorAll('#leadSteps .st');
      const stepLabels = document.querySelectorAll('#leadSteps .lbl');
      let cur = 0;
      const showPage = (n) => {
        pages.forEach((p, idx) => p.classList.toggle('show', idx === n));
        steps.forEach((s, idx) => s.classList.toggle('on', idx <= n));
        stepLabels.forEach((s, idx) => s.classList.toggle('on', idx <= n));
        cur = n;
      };
      const validatePage = (n) => {
        let ok = true;
        pages[n].querySelectorAll('input[required],select[required]').forEach((f) => {
          if (
            !f.value ||
            (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value)) ||
            (f.type === 'tel' && f.value.replace(/\D/g, '').length < 10)
          ) {
            ok = false;
            f.style.borderColor = 'var(--magenta)';
          } else {
            f.style.borderColor = '';
          }
        });
        return ok;
      };
      lead.querySelectorAll('[data-next]').forEach((b) => {
        b.addEventListener('click', () => {
          if (validatePage(cur)) showPage(cur + 1);
        });
      });
      lead.querySelectorAll('[data-prev]').forEach((b) => {
        b.addEventListener('click', () => showPage(cur - 1));
      });
      lead.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validatePage(cur)) return;
        const name = (lead.querySelector('[name=name]') || {}).value || 'there';
        lead.querySelector('.lc-form-inner').style.display = 'none';
        const ok = lead.querySelector('.lc-success');
        ok.style.display = 'block';
        const nm = ok.querySelector('[data-name]');
        if (nm) nm.textContent = name.split(' ')[0];
        document.getElementById('leadSteps').style.display = 'none';
      });
    }

    /* login tabs */
    const loginTabs = document.querySelectorAll('.login-tabs button');
    if (loginTabs.length) {
      const setTab = (key) => {
        loginTabs.forEach((b) => b.classList.toggle('active', b.getAttribute('data-tab') === key));
        document
          .querySelectorAll('.login-panel')
          .forEach((p) => p.classList.toggle('active', p.getAttribute('data-panel') === key));
      };
      loginTabs.forEach((b) => b.addEventListener('click', () => setTab(b.getAttribute('data-tab'))));
      if (location.hash === '#faculty') setTab('faculty');
    }

    /* generic login form mock */
    document.querySelectorAll('[data-login]').forEach((f) => {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = f.querySelector('button[type=submit]');
        const orig = btn.textContent;
        btn.textContent = 'Signing in…';
        btn.disabled = true;
        setTimeout(() => {
          const msg = f.querySelector('.login-msg');
          if (msg) msg.style.display = 'flex';
          btn.textContent = orig;
          btn.disabled = false;
        }, 1100);
      });
    });

    /* newsletter subscribe mock */
    document.querySelectorAll('[data-newsletter]').forEach((f) => {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        f.classList.add('is-done');
      });
    });

    /* blog filters */
    const fbtns = document.querySelectorAll('.blog-filters button');
    if (fbtns.length) {
      fbtns.forEach((b) => {
        b.addEventListener('click', function () {
          fbtns.forEach((x) => x.classList.remove('active'));
          b.classList.add('active');
          const cat = b.getAttribute('data-filter');
          document.querySelectorAll('.blog-grid .bp-card').forEach((c) => {
            const show = cat === 'all' || c.getAttribute('data-cat') === cat;
            c.style.display = show ? 'flex' : 'none';
          });
        });
      });
    }

    /* testimonials filtered by graduating year */
    const tYears = document.getElementById('testiYears');
    const tGrid = document.getElementById('testiGrid');
    if (tYears && tGrid) {
      const tBtns = tYears.querySelectorAll('.testi-year');
      const tCards = tGrid.querySelectorAll('.testi-card');
      const filterTesti = (year) => {
        tBtns.forEach((b) => {
          const on = b.getAttribute('data-grad-year') === year;
          b.classList.toggle('is-on', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        tCards.forEach((c) => {
          const match = c.getAttribute('data-grad-year') === year;
          c.classList.remove('is-show');
          c.classList.toggle('is-hidden', !match);
          if (match) {
            void c.offsetWidth;
            c.classList.add('is-show');
          }
        });
      };
      tBtns.forEach((b) =>
        b.addEventListener('click', () => filterTesti(b.getAttribute('data-grad-year')))
      );
      const tInit = tYears.querySelector('.testi-year.is-on') || tBtns[tBtns.length - 1];
      if (tInit) filterTesti(tInit.getAttribute('data-grad-year'));
    }

    /* guest faculty flip cards: tap to flip on touch devices */
    document.querySelectorAll('.gf-card').forEach((card) => {
      card.addEventListener('click', function () {
        if (window.matchMedia('(hover:none)').matches) card.classList.toggle('is-flipped');
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('is-flipped');
        }
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
      observers.forEach((o) => o.disconnect());
    };
  }, [pathname]);

  return null;
}
