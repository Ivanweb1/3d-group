import { gsap } from 'gsap';

// Точка за курсором, как на 3d-group.space: только на десктопе с мышью
export function initCursor() {
  if (!window.matchMedia('(hover: hover) and (min-width: 992px)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor';
  dot.setAttribute('aria-hidden', 'true');
  document.body.append(dot);

  const x = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3.out' });
  const y = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3.out' });
  let shown = false;

  window.addEventListener('mousemove', (e) => {
    if (!shown) { gsap.set(dot, { x: e.clientX, y: e.clientY }); dot.style.opacity = 1; shown = true; }
    x(e.clientX); y(e.clientY);
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', () => { dot.style.opacity = 0; shown = false; });
}
