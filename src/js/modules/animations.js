import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  document.documentElement.classList.add('is-gsap-ready');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Плавное появление при скролле
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // Кубы плывут с разной скоростью при прокрутке (data-parallax — скорость)
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.2;
    gsap.to(el, {
      yPercent: speed * 100,
      rotate: speed * 40,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Кубы, которые только поворачиваются при скролле (data-rotate — угол)
  gsap.utils.toArray('[data-rotate]').forEach((el) => {
    gsap.to(el, {
      rotate: parseFloat(el.dataset.rotate) || 20,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top top', end: 'bottom top', scrub: true },
    });
  });

  // Высота страницы меняется (фильтр кейсов, загрузка шрифтов и картинок) —
  // пересчитываем точки срабатывания, иначе нижние блоки могут так и не появиться
  let timer;
  new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(() => ScrollTrigger.refresh(), 100);
  }).observe(document.body);
}
