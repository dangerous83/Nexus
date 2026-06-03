// ============================================================
// Scroll-triggered reveals, hero entrance, stat counters.
// Animates transform/opacity only.
// ============================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function heroIntro() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  gsap.set('[data-hero] .hero__inner, [data-hero] .hero__panels', { opacity: 1 });
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.from('[data-hero] .hero__eyebrow', { y: 18, opacity: 0, duration: 0.8 })
    .from(
      '[data-hero] .hero__line > span',
      { yPercent: 110, duration: 1.1, stagger: 0.1 },
      '-=0.45'
    )
    .from('[data-hero] .hero__sub', { y: 24, opacity: 0, duration: 0.9 }, '-=0.7')
    .from('[data-hero] .hero__cta > *', { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.6')
    .from('[data-hero] .hero-card', { y: 36, opacity: 0, scale: 0.95, duration: 0.95, stagger: 0.14 }, '-=0.85')
    .from('[data-hero] .hero__scroll', { opacity: 0, duration: 0.6 }, '-=0.3');
}

function reveals() {
  // Single elements
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.95,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  // Staggered children
  gsap.utils.toArray('[data-reveal-children]').forEach((group) => {
    gsap.to(group.children, {
      y: 0,
      opacity: 1,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.09,
      scrollTrigger: { trigger: group, start: 'top 85%' },
    });
  });
}

function counters() {
  gsap.utils.toArray('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
      onUpdate: () => {
        el.textContent =
          prefix +
          obj.v.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) +
          suffix;
      },
    });
  });
}

// A subtle "live" feel for the status ticker: nudge last prices occasionally.
function liveTicker() {
  const cells = document.querySelectorAll('[data-tick]');
  if (!cells.length) return;
  setInterval(() => {
    const cell = cells[Math.floor(Math.random() * cells.length)];
    const base = parseFloat(cell.dataset.tick);
    const dec = parseInt(cell.dataset.dec || '2', 10);
    const jitter = base * (1 + (Math.random() - 0.5) * 0.0006);
    cell.textContent = jitter.toLocaleString('en-US', {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });
    cell.style.color = '';
    gsap.fromTo(cell, { color: '#fcf6ba' }, { color: '', duration: 1.2, ease: 'power2.out' });
  }, 2200);
}

export function initAnimations({ reduced }) {
  if (reduced) {
    // Ensure everything is visible; no motion.
    gsap.set('[data-reveal], [data-reveal-children] > *', { clearProps: 'all', opacity: 1, y: 0 });
    gsap.set('[data-hero] .hero__inner, [data-hero] .hero__panels', { opacity: 1 });
    document.querySelectorAll('[data-count]').forEach((el) => {
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      el.textContent =
        (el.dataset.prefix || '') +
        parseFloat(el.dataset.count).toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        (el.dataset.suffix || '');
    });
    return;
  }
  heroIntro();
  reveals();
  counters();
  liveTicker();
}
