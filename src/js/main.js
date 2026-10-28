import '../scss/main.scss';

import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initAnimations } from './modules/animations.js';
import { initTitles } from './modules/titles.js';
import { initHeader } from './modules/header.js';
import { initCases } from './modules/cases.js';
import { initForms } from './modules/forms.js';
import { initCursor } from './modules/cursor.js';

// Режим для выгрузки в Figma (cases.html?figma): плагин снимает страницу без прокрутки,
// поэтому всё показываем сразу — без появления при скролле, печати заголовков и ленивых картинок
const figma = new URLSearchParams(location.search).has('figma');
if (figma) {
  document.documentElement.classList.add('is-figma');
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = 'eager'; });
}

// Плагины выгрузки в Figma не видят градиент из общего скрытого SVG (stroke: url(#brand-g)),
// и иконки выходят пустыми. Кладём копию градиента в каждую иконку и задаём обводку атрибутами.
function inlineIconGradients() {
  const source = document.getElementById('brand-g');
  if (!source) return;
  document.querySelectorAll('.tasks__icon').forEach((icon, i) => {
    const id = `brand-g-${i}`;
    const gradient = source.cloneNode(true);
    gradient.id = id;
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.append(gradient);
    icon.prepend(defs);
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', `url(#${id})`);
    icon.setAttribute('stroke-width', '1.3');
    icon.setAttribute('stroke-linecap', 'round');
    icon.setAttribute('stroke-linejoin', 'round');
    icon.style.stroke = `url(#${id})`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (figma) {
    inlineIconGradients();
    initHeader();
    initCases();
    initForms();
    return;
  }
  const lenis = initSmoothScroll();
  initAnimations();
  initTitles();
  initHeader({ lenis });
  initCases({ lenis });
  initForms();
  initCursor();
});
