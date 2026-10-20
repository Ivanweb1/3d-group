import '../scss/main.scss';

import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initAnimations } from './modules/animations.js';
import { initHeader } from './modules/header.js';
import { initCases } from './modules/cases.js';
import { initForms } from './modules/forms.js';

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initAnimations();
  initHeader();
  initCases();
  initForms();
});
