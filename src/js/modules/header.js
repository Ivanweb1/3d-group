export function initHeader({ lenis } = {}) {
  // Текущий год в «2019 — 2026»
  document.querySelectorAll('[data-year-now]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  // После начала прокрутки под шапкой появляется размытая подложка
  const onScroll = () => document.documentElement.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const burger = document.querySelector('[data-burger]');
  const nav = document.getElementById('mobile-nav');
  if (!burger || !nav) return;
  const root = document.documentElement;

  const setOpen = (open) => {
    root.classList.toggle('is-nav-open', open);
    // пока меню открыто, страница под ним не прокручивается
    if (lenis) open ? lenis.stop() : lenis.start();
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  };

  burger.addEventListener('click', () => setOpen(!root.classList.contains('is-nav-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
}
