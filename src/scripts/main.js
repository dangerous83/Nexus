// ============================================================
// NEXUS — entry point
// Fonts, partial injection, smooth scroll, motion, interactions.
// ============================================================
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/jetbrains-mono';
import '../styles/main.css';

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { renderNav } from '../partials/nav.js';
import { renderFooter } from '../partials/footer.js';
import { initAnimations } from './animations.js';
import { initParallax } from './parallax.js';
import { mountIcons } from './mount-icons.js';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

document.documentElement.classList.add('js');

// ---- Inject partials (identical nav + footer on every page) ----
function mountPartials() {
  const active = document.body.dataset.page || '';
  const navEl = document.querySelector('[data-nav]');
  const footEl = document.querySelector('[data-footer]');
  if (navEl) navEl.innerHTML = renderNav(active);
  if (footEl) footEl.innerHTML = renderFooter();
}

// ---- Nav behaviour: scrolled state + mobile toggle ----
function initNav(lenis) {
  const nav = document.querySelector('.site-nav');
  const onScroll = (y) => nav && nav.classList.toggle('is-scrolled', y > 12);
  onScroll(window.scrollY);
  if (lenis) lenis.on('scroll', ({ scroll }) => onScroll(scroll));
  else window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });

  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      links.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (lenis) open ? lenis.stop() : lenis.start();
    });
    links.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        document.body.classList.remove('nav-open');
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        if (lenis) lenis.start();
      }
    });
  }
}

// ---- Magnetic pull on primary buttons (subtle, desktop only) ----
function initMagnetic() {
  if (reduced || !finePointer) return;
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic) || 0.3;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.5, ease: 'power3.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

// ---- Smooth anchor scrolling through Lenis ----
function initAnchors(lenis) {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    a.addEventListener('click', (e) => {
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -90 });
      else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
  });
}

// ---- Accessible tabs (platform: Stack / Deployment / Resilience) ----
function initTabs() {
  document.querySelectorAll('[role="tablist"]').forEach((list) => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const select = (tab) => {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
      ScrollTrigger.refresh();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const dir = e.key === 'ArrowRight' ? 1 : -1;
          const next = tabs[(i + dir + tabs.length) % tabs.length];
          next.focus();
          select(next);
        }
      });
    });
  });
}

// ---- Contact form (client-side demo handler) ----
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('#email')?.value || 'your inbox';
    form.innerHTML = `
      <div class="form-success">
        <div class="form-success__mark">✓</div>
        <h3>Request received.</h3>
        <p class="dim">Thanks — we’ll reach out to <b>${email}</b> within one business day to schedule your 45-minute walkthrough. No sales drip.</p>
      </div>`;
  });
}

// ---- Edition toggle (pricing) ----
function initEditionToggle() {
  const btn = document.querySelector('[data-edition-toggle]');
  const reg = document.querySelector('[data-edition="regulated"]');
  const non = document.querySelector('[data-edition="non-regulated"]');
  if (!btn || !reg || !non) return;
  const state = document.querySelector('[data-edition-state]');
  const label = btn.querySelector('[data-edition-label]');
  btn.addEventListener('click', () => {
    const regFeatured = reg.classList.contains('edition--featured');
    reg.classList.toggle('edition--featured', !regFeatured);
    non.classList.toggle('edition--featured', regFeatured);
    reg.querySelector('[data-viewing]').hidden = regFeatured;
    non.querySelector('[data-viewing]').hidden = !regFeatured;
    if (state) state.textContent = regFeatured
      ? 'site is showing non-regulated edition'
      : 'site is showing regulated edition';
    if (label) label.textContent = regFeatured
      ? 'Switch site to regulated edition →'
      : 'Switch site to non-regulated edition →';
  });
}

function boot() {
  mountPartials();
  mountIcons();
  initTabs();
  initEditionToggle();
  initContactForm();

  let lenis = null;
  if (!reduced) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add('lenis', 'lenis-smooth');
  }

  initNav(lenis);
  initAnchors(lenis);
  initMagnetic();
  initAnimations({ reduced });
  initParallax({ reduced });

  // Recalculate triggers once fonts settle to avoid drift.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
