import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export function initSliders() {
  document.querySelectorAll('.cases__slider').forEach((el) => {
    new Swiper(el, {
      modules: [Pagination],
      slidesPerView: 1.1,
      spaceBetween: 16,
      pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
      breakpoints: { 992: { slidesPerView: 2.5, spaceBetween: 24 } },
    });
  });
}
