import '../scss/main.scss';

import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initAnimations } from './modules/animations.js';
import { initSliders } from './modules/sliders.js';
import { initForms } from './modules/forms.js';

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initAnimations();
  initSliders();
  initForms();
});
