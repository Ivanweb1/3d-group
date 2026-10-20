import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  // Бегущая строка, сдвигается при скролле
  gsap.utils.toArray('[data-marquee]').forEach((el) => {
    gsap.to(el.firstElementChild, {
      xPercent: -25,
      ease: 'none',
      scrollTrigger: { trigger: el, scrub: true },
    });
  });

  document.documentElement.classList.add('is-gsap-ready');
}
