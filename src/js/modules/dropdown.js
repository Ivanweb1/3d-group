// Выпадающий список: кнопка + listbox. Выбранное значение — в data-value у меню,
// при выборе отправляется событие 'change' (его слушает фильтр кейсов).
export function initDropdowns() {
  document.querySelectorAll('[data-dropdown]').forEach((root) => {
    const toggle = root.querySelector('[data-dropdown-toggle]');
    const menu = root.querySelector('[data-dropdown-menu]');
    const valueEl = root.querySelector('[data-dropdown-value]');
    const options = [...menu.querySelectorAll('[role="option"]')];
    let focused = Math.max(0, options.findIndex((o) => o.getAttribute('aria-selected') === 'true'));
    menu.value = options[focused]?.dataset.value;

    const focus = (i) => {
      focused = (i + options.length) % options.length;
      options.forEach((o, k) => o.classList.toggle('is-focused', k === focused));
    };
    const open = () => {
      root.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      focus(focused);
      menu.focus();
    };
    const close = (returnFocus = true) => {
      root.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (returnFocus) toggle.focus();
    };
    const select = (opt) => {
      options.forEach((o) => o.setAttribute('aria-selected', String(o === opt)));
      valueEl.textContent = opt.textContent;
      menu.value = opt.dataset.value;
      menu.dispatchEvent(new Event('change'));
      close();
    };

    toggle.addEventListener('click', () => (root.classList.contains('is-open') ? close() : open()));
    options.forEach((o, i) => {
      o.addEventListener('click', () => select(o));
      o.addEventListener('mousemove', () => focus(i));
    });
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); focus(focused + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); focus(focused - 1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(options[focused]); }
      else if (e.key === 'Escape' || e.key === 'Tab') close(e.key === 'Escape');
    });
    document.addEventListener('click', (e) => { if (!root.contains(e.target) && root.classList.contains('is-open')) close(false); });
  });
}
