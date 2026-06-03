// Replaces [data-icon="name"] placeholders with inline SVG line icons.
import { icon } from './icons.js';

export function mountIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((el) => {
    if (el.dataset.iconMounted) return;
    el.innerHTML = icon(el.dataset.icon);
    el.dataset.iconMounted = '1';
  });
}
