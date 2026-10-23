// Фильтр кейсов: задача, сфера, направление и поиск по тексту карточки, плюс постраничный вывод.
// Атрибуты карточки: data-sphere, data-tags и data-tasks (через пробел).
const PER_PAGE = 6;

export function initCases({ lenis } = {}) {
  const grid = document.querySelector('[data-cases]');
  if (!grid) return;

  const cards = [...grid.querySelectorAll('[data-case]')];
  const empty = grid.querySelector('[data-cases-empty]');
  const pager = document.querySelector('[data-pager]');
  const taskBtns = [...document.querySelectorAll('[data-task]')];
  const sphereBtns = [...document.querySelectorAll('[data-sphere]:not([data-case])')];
  const tagBtns = [...document.querySelectorAll('[data-tag]')];
  const searchForm = document.querySelector('[data-search]');
  const searchInput = document.querySelector('[data-search-input]');
  const taskActive = document.querySelector('[data-task-active]');
  const taskActiveName = document.querySelector('[data-task-active-name]');
  const taskReset = document.querySelector('[data-task-reset]');

  // Направление выбирается одно: «или», а не «и»
  const state = { task: null, sphere: 'all', tag: null, query: '', page: 1 };
  const list = (el, attr) => (el.dataset[attr] || '').split(' ').filter(Boolean);

  document.querySelectorAll('[data-count]').forEach((el) => { el.textContent = cards.length; });

  // Счётчик кейсов на плитках задач; задачи без кейсов неактивны
  taskBtns.forEach((btn) => {
    const n = cards.filter((c) => list(c, 'tasks').includes(btn.dataset.task)).length;
    const counter = btn.querySelector('[data-task-count]');
    if (counter) counter.textContent = n ? `${n} ${plural(n, 'кейс', 'кейса', 'кейсов')}` : 'Скоро';
    btn.disabled = n === 0;
  });

  function matches(card) {
    const q = state.query.trim().toLowerCase();
    return (!state.task || list(card, 'tasks').includes(state.task)) &&
      (state.sphere === 'all' || card.dataset.sphere === state.sphere) &&
      (!state.tag || list(card, 'tags').includes(state.tag)) &&
      (!q || card.textContent.toLowerCase().includes(q));
  }

  function apply({ page = 1 } = {}) {
    const found = cards.filter(matches);
    const pages = Math.max(1, Math.ceil(found.length / PER_PAGE));
    state.page = Math.min(Math.max(page, 1), pages);
    const from = (state.page - 1) * PER_PAGE;
    const shown = new Set(found.slice(from, from + PER_PAGE));

    cards.forEach((card) => { card.hidden = !shown.has(card); });
    if (empty) empty.hidden = found.length > 0;
    renderPager(pages);
  }

  // Пагинация: ‹ 1 2 … 9 ›; рядом с текущей страницей — соседние, остальное сворачивается в «…»
  function renderPager(pages) {
    if (!pager) return;
    pager.hidden = pages < 2;
    if (pages < 2) { pager.innerHTML = ''; return; }

    const cur = state.page;
    const nums = [...new Set([1, cur - 1, cur, cur + 1, pages])].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
    const arrow = (dir, to, label) => `<button class="pager__arrow pager__arrow--${dir}" type="button" data-page="${to}" aria-label="${label}"${to < 1 || to > pages ? ' disabled' : ''}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 6-6 6 6 6" stroke="currentColor" stroke-width="1.5"/></svg></button>`;

    let html = arrow('prev', cur - 1, 'Предыдущая страница');
    nums.forEach((n, i) => {
      if (i && n - nums[i - 1] > 1) html += '<span class="pager__gap">…</span>';
      html += n === cur
        ? `<span class="pager__num is-active" aria-current="page">${n}</span>`
        : `<button class="pager__num" type="button" data-page="${n}">${n}</button>`;
    });
    html += arrow('next', cur + 1, 'Следующая страница');
    pager.innerHTML = html;
  }

  pager?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-page]');
    if (!btn || btn.disabled) return;
    apply({ page: Number(btn.dataset.page) });
    scrollTo(grid);
  });

  // Прокрутка к фильтрам: видно и выбранную задачу, и карточки под ней
  const filterEl = document.querySelector('.filter') || grid;
  function scrollTo(el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
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
    if (state.task) scrollTo(filterEl);
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

  // Повторный клик по выбранному направлению снимает выбор
  tagBtns.forEach((btn) => btn.addEventListener('click', () => {
    state.tag = state.tag === btn.dataset.tag ? null : btn.dataset.tag;
    tagBtns.forEach((b) => {
      const active = b.dataset.tag === state.tag;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    apply();
  }));

  searchInput?.addEventListener('input', () => {
    state.query = searchInput.value;
    apply();
  });

  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.query = searchInput.value;
    apply();
    scrollTo(grid);
  });

  apply();
}

function plural(n, one, few, many) {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n100 > 10 && n100 < 20) return many;
  if (n10 === 1) return one;
  if (n10 > 1 && n10 < 5) return few;
  return many;
}
