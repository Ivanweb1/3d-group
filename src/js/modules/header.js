export function initHeader() {
  const header = document.querySelector('[data-header]');
  const burger = header?.querySelector('[data-burger]');
  if (!burger) return;

  burger.addEventListener('click', () => {
    const open = header.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
}
