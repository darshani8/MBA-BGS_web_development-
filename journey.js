/* ============================================================
   The Journey — scroll-spy rail + glowing spine fill + reveals
   ============================================================ */
(function () {
  'use strict';

  /* ---- reveal milestone cards as they enter ----
     Scroll-position based (works reliably on mobile and inside the
     single-file bundle where routes start hidden). IntersectionObserver
     kept as an enhancement for instant reveal where supported. */
  var items = [].slice.call(document.querySelectorAll('.tl-item'));
  function revealInView() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < items.length; i++) {
      var el = items[i];
      if (el.classList.contains('seen')) continue;
      var r = el.getBoundingClientRect();
      // visible (or already scrolled past) and the element actually has layout
      if (r.height > 0 && r.top < vh * 0.92 && r.bottom > 0) {
        el.classList.add('seen');
      }
    }
  }
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- glowing spine fill + node lighting ---- */
  var timelines = [].slice.call(document.querySelectorAll('.tl'));
  function paintSpines() {
    var refY = window.innerHeight * 0.62;
    timelines.forEach(function (tl) {
      var fill = tl.querySelector('.tl-fill');
      if (!fill) return;
      var rect = tl.getBoundingClientRect();
      var prog = refY - rect.top;                 // px from top of timeline
      prog = Math.max(0, Math.min(prog, rect.height));
      fill.style.height = prog + 'px';
      var tlItems = tl.querySelectorAll('.tl-item');
      for (var i = 0; i < tlItems.length; i++) {
        var node = tlItems[i].querySelector('.tl-node');
        var nodeY = (node ? node.offsetTop : tlItems[i].offsetTop) + 10;
        tlItems[i].classList.toggle('lit', nodeY <= prog);
      }
    });
  }

  /* ---- rail scroll-spy ---- */
  var steps = {};
  [].slice.call(document.querySelectorAll('.pr-step')).forEach(function (s) {
    steps[s.getAttribute('data-rail')] = s;
  });
  var phases = [].slice.call(document.querySelectorAll('.phase'));
  function spyRail() {
    var line = window.innerHeight * 0.4;
    var current = null;
    phases.forEach(function (p) {
      var r = p.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) current = p.id;
    });
    if (!current && phases.length) {
      // before first / after last fallback
      if (phases[0].getBoundingClientRect().top > line) current = null;
      else current = phases[phases.length - 1].id;
    }
    for (var k in steps) steps[k].classList.toggle('active', k === current);
  }

  /* ---- rAF-throttled scroll loop ---- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
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
})();
