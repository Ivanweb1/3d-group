// Фильтр кейсов: задача, сфера, формат, платформа и поиск по тексту карточки.
// Атрибуты карточки: data-sphere, data-format, data-tags и data-tasks (через пробел).
export function initCases({ lenis } = {}) {
  const grid = document.querySelector('[data-cases]');
  if (!grid) return;

  const cards = [...grid.querySelectorAll('[data-case]')];
  const empty = grid.querySelector('[data-cases-empty]');
  const taskBtns = [...document.querySelectorAll('[data-task]')];
  const sphereBtns = [...document.querySelectorAll('[data-sphere]:not([data-case])')];
  const tagBtns = [...document.querySelectorAll('[data-tag]')];
  const formatSelect = document.querySelector('[data-format-select]');
  const searchForm = document.querySelector('[data-search]');
  const searchInput = document.querySelector('[data-search-input]');
  const hints = [...document.querySelectorAll('[data-hint]')];
  const taskActive = document.querySelector('[data-task-active]');
  const taskActiveName = document.querySelector('[data-task-active-name]');
  const taskReset = document.querySelector('[data-task-reset]');

  const state = { task: null, sphere: 'all', format: 'all', tags: new Set(), query: '' };
  const list = (el, attr) => (el.dataset[attr] || '').split(' ').filter(Boolean);

  document.querySelectorAll('[data-count]').forEach((el) => { el.textContent = cards.length; });

  // Счётчик кейсов на плитках задач; задачи без кейсов неактивны
  taskBtns.forEach((btn) => {
    const n = cards.filter((c) => list(c, 'tasks').includes(btn.dataset.task)).length;
    const counter = btn.querySelector('[data-task-count]');
    if (counter) counter.textContent = n ? `${n} ${plural(n, 'кейс', 'кейса', 'кейсов')}` : 'Скоро';
    btn.disabled = n === 0;
  });

  function apply() {
    const q = state.query.trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const tags = list(card, 'tags');
      const ok =
        (!state.task || list(card, 'tasks').includes(state.task)) &&
        (state.sphere === 'all' || card.dataset.sphere === state.sphere) &&
        (state.format === 'all' || card.dataset.format === state.format) &&
        [...state.tags].every((t) => tags.includes(t)) &&
        (!q || card.textContent.toLowerCase().includes(q));
      card.hidden = !ok;
      if (ok) visible += 1;
    });

    if (empty) empty.hidden = visible > 0;
  }

  // Прокрутка к фильтрам: видно и выбранную задачу, и карточки под ней
  const filterEl = document.querySelector('.filter') || grid;
  function scrollToGrid() {
    const top = filterEl.getBoundingClientRect().top + window.scrollY - 120;
    if (lenis) lenis.scrollTo(top, { duration: 1.2 });
    else window.scrollTo({ top, behavior: 'smooth' });
  }

  function setTask(key) {
    state.task = key;
    taskBtns.forEach((b) => {
      const active = b.dataset.task === key;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    if (taskActive) {
      taskActive.hidden = !key;
      const btn = taskBtns.find((b) => b.dataset.task === key);
      if (btn && taskActiveName) taskActiveName.textContent = btn.querySelector('.tasks__name').textContent;
    }
    apply();
  }

  taskBtns.forEach((btn) => btn.addEventListener('click', () => {
    setTask(state.task === btn.dataset.task ? null : btn.dataset.task);
    if (state.task) scrollToGrid();
  }));
  taskReset?.addEventListener('click', () => setTask(null));

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
    scrollToGrid();
  });

  hints.forEach((hint) => hint.addEventListener('click', () => {
    const active = !hint.classList.contains('is-active');
    hints.forEach((h) => h.classList.toggle('is-active', h === hint && active));
    searchInput.value = active ? hint.dataset.hint : '';
    state.query = searchInput.value;
    apply();
  }));
}

function plural(n, one, few, many) {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n100 > 10 && n100 < 20) return many;
  if (n10 === 1) return one;
  if (n10 > 1 && n10 < 5) return few;
  return many;
}
