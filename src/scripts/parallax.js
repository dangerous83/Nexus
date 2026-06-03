// ============================================================
// Parallax — layered hero + section background drift.
// GSAP ScrollTrigger scrub. Transform-only. Degrades on mobile.
// ============================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function heroParallax() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const st = {
    trigger: hero,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  };

  // Background drifts down slowest; mid-ground grid faster; foreground rises.
  const bg = hero.querySelector('.hero__bg');
  const grid = hero.querySelector('.hero__grid');
  const atmos = hero.querySelector('.hero__atmos');
  const inner = hero.querySelector('.hero__inner');

  if (bg) gsap.to(bg, { yPercent: 16, ease: 'none', scrollTrigger: st });
  if (atmos) gsap.to(atmos, { yPercent: 26, ease: 'none', scrollTrigger: st });
  if (grid) gsap.to(grid, { yPercent: 38, ease: 'none', scrollTrigger: st });
  if (inner) gsap.to(inner, { yPercent: -12, opacity: 0.4, ease: 'none', scrollTrigger: st });
}

function sectionParallax() {
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 12;
    gsap.fromTo(
      el,
      { yPercent: -speed },
      {
        yPercent: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('[data-parallax-scope]') || el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });
}

export function initParallax({ reduced }) {
  if (reduced) return;
  heroParallax();
  sectionParallax();
  ScrollTrigger.refresh();
}
