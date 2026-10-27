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

document.addEventListener('DOMContentLoaded', () => {
  if (figma) {
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
