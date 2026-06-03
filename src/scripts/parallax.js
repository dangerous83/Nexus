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

  // Distinct rates per layer create obvious depth: background pushes in slowly,
  // atmosphere and grid race ahead, the headline rises and fades.
  const bg = hero.querySelector('.hero__bg');
  const grid = hero.querySelector('.hero__grid');
  const atmos = hero.querySelector('.hero__atmos');
  const inner = hero.querySelector('.hero__inner');

  if (bg) gsap.to(bg, { yPercent: 22, scale: 1.16, ease: 'none', scrollTrigger: st });
  if (atmos) gsap.to(atmos, { yPercent: 40, ease: 'none', scrollTrigger: st });
  if (grid) gsap.to(grid, { yPercent: 64, ease: 'none', scrollTrigger: st });
  if (inner) gsap.to(inner, { yPercent: -26, opacity: 0, ease: 'none', scrollTrigger: st });

  // floating platform panels drift at distinct rates for clear depth
  const rates = [58, -34, 84];
  hero.querySelectorAll('.hero-card').forEach((card, i) => {
    gsap.to(card, { yPercent: rates[i % rates.length], ease: 'none', scrollTrigger: st });
  });
}

function sectionParallax() {
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    const speed = (parseFloat(el.dataset.parallax) || 12) * 1.8;
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
