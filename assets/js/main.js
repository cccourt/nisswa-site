/* =========================================================
   MAIN.JS — Shared across all pages
   Handles: loader, cursor, header scroll, scroll reveals,
            lake mode, Konami code easter egg trigger
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ── LOADER ──────────────────────────────────────────────
  const loader = document.getElementById('nbjs-loader');

  function hideLoader() {
    if (!loader) return;
    loader.classList.add('is-hidden');
  }

  // Hide after fonts + resources load
  window.addEventListener('load', function () {
    setTimeout(hideLoader, 400);
  });

  // Fallback: always hide within 2.5s
  setTimeout(hideLoader, 2500);


  // ── CUSTOM CURSOR ────────────────────────────────────────
  const cursor = document.getElementById('cursor');

  if (cursor && window.innerWidth > 768) {
    document.addEventListener('mousemove', function (e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    }, { passive: true });

    // Expand on interactive elements
    document.querySelectorAll('a, button, .pill, .fc, .ac, .fleet-card, .js-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('expand'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('expand'); });
    });
  }


  // ── SMART HEADER ─────────────────────────────────────────
  const hdr = document.getElementById('hdr');
  let lastScrollY = 0;

  window.addEventListener('scroll', function () {
    if (!hdr) return;
    const y = window.scrollY;
    hdr.classList.toggle('scrolled', y > 30);
    hdr.classList.toggle('hide', y > 200 && y > lastScrollY);
    lastScrollY = y;
  }, { passive: true });


  // ── SCROLL REVEALS ───────────────────────────────────────
  const revEls = document.querySelectorAll('.rev');
  if (revEls.length > 0) {
    const revObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add('in');
          }, i * 70);
        }
      });
    }, { threshold: 0.08 });

    revEls.forEach(function (el) { revObserver.observe(el); });
  }


  // ── LAKE MODE (logo click) ────────────────────────────────
  const lakeModeTrigger = document.getElementById('lakeModeTrigger');
  const lakeModeToast   = document.getElementById('lakeModeToast');

  if (lakeModeTrigger) {
    lakeModeTrigger.addEventListener('click', function (e) {
      // Only activate lake mode — don't navigate away on home page
      // (the href="index.html" still navigates on other pages)
      const isHome = document.body.classList.contains('page-home') ||
                     !document.body.className ||
                     window.location.pathname.endsWith('index.html') ||
                     window.location.pathname === '/';

      if (isHome) {
        e.preventDefault();
        document.body.classList.add('lake-mode-on');

        if (lakeModeToast) {
          lakeModeToast.classList.add('show');
          setTimeout(function () { lakeModeToast.classList.remove('show'); }, 2400);
        }

        setTimeout(function () { document.body.classList.remove('lake-mode-on'); }, 3200);
      }
    });
  }


  // ── KONAMI CODE → GAME.HTML ──────────────────────────────
  // Up Up Down Down Left Right Left Right B A
  const KONAMI = [
    'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
    'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
    'b','a'
  ];
  let konamiIndex = 0;

  document.addEventListener('keydown', function (e) {
    if (e.key === KONAMI[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI.length) {
        konamiIndex = 0;
        window.location.href = 'game.html';
      }
    } else {
      konamiIndex = 0;
    }
  });

});
