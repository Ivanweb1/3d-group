# 3D GROUP

Вёрстка сайта 3D GROUP (https://3d-group.space). Стек повторяет текущий сайт, но собирается через Vite.

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
    _variables.scss
    _base.scss
    blocks/        header, hero, cases, footer, ...
    main.scss
```

Атрибуты для анимаций:
- `data-reveal` — элемент плавно появляется при скролле
- `data-marquee` — бегущая строка, двигается при скролле
- `data-fancybox` — открыть модалку
- `data-mask` — маска телефона

Сайт работает на 1С-Битрикс (шаблон `leadspace`). Вёрстку из `dist/` можно перенести в шаблон Битрикса.
