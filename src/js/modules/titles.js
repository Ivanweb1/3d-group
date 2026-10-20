import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Буквы проявляются в случайном порядке — как заголовки на главной 3d-group.space
function revealChars(chars, delay = 0) {
  return gsap.from(chars, {
    opacity: 0,
    duration: 0.6,
    ease: 'power1.out',
    delay,
    stagger: { each: 0.035, from: 'random' },
  });
}

export function initTitles() {
  if (reduced()) return;

  // Заголовки секций: побуквенно при прокрутке
  document.querySelectorAll('[data-split]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words,chars', aria: 'auto' });
    gsap.set(split.chars, { opacity: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => gsap.to(split.chars, { opacity: 1, duration: 0.6, ease: 'power1.out', stagger: { each: 0.035, from: 'random' } }),
    });
  });

  // Заголовок первого экрана: побуквенно при загрузке и плавный сдвиг вбок при прокрутке
  document.querySelectorAll('[data-hero-title]').forEach((title) => {
    const word = title.querySelector('.hero__title-word');
    if (!word) return;
    const split = SplitText.create(word, { type: 'chars' });
    revealChars(split.chars, 0.2);
    gsap.to(word, {
      xPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: title, start: 'top 30%', end: 'bottom top', scrub: true },
    });
  });
}
