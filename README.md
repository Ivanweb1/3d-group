# 3D GROUP — вёрстка

Страницы:
- `cases.html` — «Кейсы» (по прототипу из Figma, `design-v1` в Releases)
- `index.html` — заглушка главной

Картинки, которые нужно сгенерировать: [docs/image-prompts.md](docs/image-prompts.md).

## Стек

- **Vite** — сборка и dev-сервер
- **SCSS + BEM** (`block__element`)
- **GSAP + ScrollTrigger** — анимации при скролле
- **Lenis** — плавный скролл
- **Fancybox** — модальные окна
- **IMask** — маска телефона
- Шрифты: **Suisse Int'l** для заголовков (платный, пока подменяется Inter) и **Montserrat** для текста

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
    modules/       smooth-scroll, animations, header, cases (фильтр), forms
  assets/images/
  scss/
    _variables.scss   цвета, шрифт, брейкпоинты
    _base.scss
    _mixins.scss
    blocks/           header, page-head, tasks, case-search, case-filter, case-card, cta, footer
    main.scss
```

Атрибуты для анимаций:
- `data-reveal` — элемент плавно появляется при скролле
- `data-fancybox` — открыть модалку
- `data-mask` — маска телефона

## Фильтр кейсов

Каждой карточке `.case-card` нужны атрибуты:
- `data-sphere` — сфера: `ecommerce`, `corporate`, `industry`, `3d`, `creative`, `production`, `finance`, `realty`, `it`
- `data-format` — формат: `implementation`, `integration`, `development`, `support`
- `data-tags` — платформы через пробел: `bitrix24`, `amocrm`, `sites`

Поиск ищет по всему тексту карточки. Счётчик у кнопки «Все» считается автоматически.
