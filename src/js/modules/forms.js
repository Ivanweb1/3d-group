import IMask from 'imask';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export function initForms() {
  document.querySelectorAll('[data-mask]').forEach((input) => {
    IMask(input, { mask: '+{7} (000) 000-00-00' });
  });

  Fancybox.bind('[data-fancybox]');
}
