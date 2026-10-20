// Фильтр кейсов: сфера, формат, платформа и поиск по тексту карточки.
// Карточке нужны атрибуты data-sphere, data-format и data-tags (через пробел).
export function initCases() {
  const grid = document.querySelector('[data-cases]');
  if (!grid) return;

  const cards = [...grid.querySelectorAll('[data-case]')];
  const empty = grid.querySelector('[data-cases-empty]');
  const sphereBtns = [...document.querySelectorAll('[data-sphere]:not([data-case])')];
  const tagBtns = [...document.querySelectorAll('[data-tag]')];
  const formatSelect = document.querySelector('[data-format-select]');
  const searchForm = document.querySelector('[data-search]');
  const searchInput = document.querySelector('[data-search-input]');
  const hints = [...document.querySelectorAll('[data-hint]')];

  const state = { sphere: 'all', format: 'all', tags: new Set(), query: '' };

  document.querySelectorAll('[data-count]').forEach((el) => { el.textContent = cards.length; });

  function apply() {
    const q = state.query.trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const tags = (card.dataset.tags || '').split(' ');
      const ok =
        (state.sphere === 'all' || card.dataset.sphere === state.sphere) &&
        (state.format === 'all' || card.dataset.format === state.format) &&
        [...state.tags].every((t) => tags.includes(t)) &&
        (!q || card.textContent.toLowerCase().includes(q));
      card.hidden = !ok;
      if (ok) visible += 1;
    });

    if (empty) empty.hidden = visible > 0;
  }

  sphereBtns.forEach((btn) => btn.addEventListener('click', () => {
    state.sphere = btn.dataset.sphere;
    sphereBtns.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    apply();
  }));

  tagBtns.forEach((btn) => btn.addEventListener('click', () => {
    const tag = btn.dataset.tag;
    const active = !state.tags.has(tag);
    if (active) state.tags.add(tag); else state.tags.delete(tag);
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
    apply();
  }));

  formatSelect?.addEventListener('change', () => {
    state.format = formatSelect.value;
    apply();
  });

  searchInput?.addEventListener('input', () => {
    state.query = searchInput.value;
    hints.forEach((h) => h.classList.remove('is-active'));
    apply();
  });

  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.query = searchInput.value;
    apply();
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  hints.forEach((hint) => hint.addEventListener('click', () => {
    const active = !hint.classList.contains('is-active');
    hints.forEach((h) => h.classList.toggle('is-active', h === hint && active));
    searchInput.value = active ? hint.dataset.hint : '';
    state.query = searchInput.value;
    apply();
  }));
}
