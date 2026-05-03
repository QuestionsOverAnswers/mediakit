/* ============================================================
   NATE PARKER MEDIA KIT — main.js
   ============================================================ */

// --- SLIDESHOW ---
(function () {
  const track = document.getElementById('slideshow');
  if (!track) return;

  const slides = track.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slideshow-dot');
  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startTimer() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopTimer();
      goTo(i);
      startTimer();
    });
  });

  track.addEventListener('mouseenter', stopTimer);
  track.addEventListener('mouseleave', startTimer);

  startTimer();
})();


// --- EXPERTISE CARDS (multi-open) ---
(function () {
  document.querySelectorAll('.expertise-card').forEach(card => {
    const body = card.querySelector('.card-body');

    function toggle() {
      const expanded = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', String(!expanded));
      body.classList.toggle('open', !expanded);
    }

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
})();


// --- SPEAKING ACCORDION (single-open) ---
(function () {
  const triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const wasOpen = trigger.getAttribute('aria-expanded') === 'true';

      // close all
      triggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.classList.remove('open');
      });

      // open clicked one (unless it was already open)
      if (!wasOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        const panel = document.getElementById(trigger.getAttribute('aria-controls'));
        if (panel) panel.classList.add('open');
      }
    });
  });
})();


// --- NAV SCROLL SPY ---
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
})();


// --- MOBILE NAV ---
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  const closeBtn = document.getElementById('nav-close');

  function open() {
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();
