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

  // Заголовок первого экрана: карусель слайдов
  document.querySelectorAll('[data-title-slider]').forEach((title) => {
    const slides = [...title.querySelectorAll('.hero__title-slide')];
    if (!slides.length) return;

    const first = SplitText.create(slides[0].querySelector('.hero__title-word') || slides[0], { type: 'chars' });
    revealChars(first.chars, 0.2);
    if (slides.length < 2) return;

    let current = 0;
    const next = () => {
      const from = slides[current];
      current = (current + 1) % slides.length;
      const to = slides[current];
      gsap.to(from, { xPercent: 100, yPercent: -100, duration: 1.1, ease: 'power3.inOut' });
      gsap.fromTo(to, { xPercent: -100, yPercent: 100, x: 0, y: 0 }, { xPercent: 0, yPercent: 0, duration: 1.1, ease: 'power3.inOut' });
    };
    gsap.set(slides.slice(1), { xPercent: -100, yPercent: 100, x: 0, y: 0 });
    let timer = setInterval(next, 3500);

    // Не крутим, пока вкладка скрыта
    document.addEventListener('visibilitychange', () => {
      clearInterval(timer);
      if (!document.hidden) timer = setInterval(next, 3500);
    });
  });
}
