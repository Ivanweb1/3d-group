import '../scss/main.scss';

import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initAnimations } from './modules/animations.js';
import { initTitles } from './modules/titles.js';
import { initHeader } from './modules/header.js';
import { initDropdowns } from './modules/dropdown.js';
import { initCases } from './modules/cases.js';
import { initForms } from './modules/forms.js';
import { initCursor } from './modules/cursor.js';

document.addEventListener('DOMContentLoaded', () => {
  const lenis = initSmoothScroll();
  initAnimations();
  initTitles();
  initHeader({ lenis });
  initDropdowns();
  initCases({ lenis });
  initForms();
  initCursor();
});
