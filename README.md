# 3D сайт

Заготовка проекта: стартовая страница и подключённые библиотеки.

## Стек

- **Vite** — сборка и dev-сервер
- **SCSS + BEM** (`block__element`), сетка Bootstrap (только grid)
- **GSAP + ScrollTrigger** — анимации при скролле
- **Lenis** — плавный скролл
- **Swiper** — слайдеры
- **Fancybox** — модальные окна
- **IMask** — маска телефона
- Шрифт **Montserrat**

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # готовые файлы в dist/
```

## Структура

```
index.html
src/
  js/
    main.js
    modules/       smooth-scroll, animations, sliders, forms
  scss/
    _variables.scss   цвета, шрифт, брейкпоинты
    _base.scss
    blocks/           стили блоков: header, hero, cases, footer, ...
    main.scss
```

Атрибуты для анимаций:
- `data-reveal` — элемент плавно появляется при скролле
- `data-marquee` — бегущая строка, двигается при скролле
- `data-fancybox` — открыть модалку
- `data-mask` — маска телефона
