export function initHeader() {
  const burger = document.querySelector('[data-burger]');
  const nav = document.getElementById('mobile-nav');
  if (!burger || !nav) return;
  const root = document.documentElement;

  const setOpen = (open) => {
    root.classList.toggle('is-nav-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  };

  burger.addEventListener('click', () => setOpen(!root.classList.contains('is-nav-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
}
