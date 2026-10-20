import IMask from 'imask';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export function initForms() {
  document.querySelectorAll('[data-mask]').forEach((input) => {
    IMask(input, { mask: '+{7} (000) 000-00-00' });
  });

  Fancybox.bind('[data-fancybox]');

  // Отправка формы пока не подключена — здесь будет запрос к обработчику Битрикса
  document.querySelectorAll('[data-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (btn) btn.textContent = 'отправлено';
    });
  });
}
