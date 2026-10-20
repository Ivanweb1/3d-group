# Картинки для страницы «Кейсы»

Иконки, кубы и фон взяты с сайта 3d-group.space. Для карточек кейсов нужны обложки (ниже). Иконки остаются запасным вариантом, если обложки нет.

## Обложки кейсов — `src/assets/images/cases/<название>.jpg`

Если у кейса есть настоящий скриншот CRM — лучше ставить его. Для остальных — 3D-сцена в стиле сайта.

Размер **1920×1080** (16:9). Главный объект по центру, левый верхний угол свободный (там плашка). На странице картинка чёрно-белая, при наведении — цветная.

Общая часть промпта (добавлять к каждому):
> 3D render, dark charcoal background #202020, objects made of translucent iridescent glass with violet #8247ED and peach #EB8F73 refractions, soft studio lighting, subtle reflections on a dark glossy floor, minimal composition, centered subject, empty space in the top-left corner, no text, no logos, no people, cinematic, high detail, 16:9

| Файл | Кейс | Промпт |
|---|---|---|
| `logistics.jpg` | Логистика | a glass delivery truck driving along a glowing route line between small glass cubes like warehouses |
| `diamond.jpg` | Алмазное оборудование | a large faceted glass diamond above a glass circular saw blade with a diamond-coated edge, sparks of light |
| `gear.jpg` | Военная экипировка | a glass tactical helmet and a backpack standing on a dark pedestal, rugged shapes |
| `outdoor.jpg` | Активный отдых | a glass tent, a fishing rod and a compass on a dark rock, a faint mountain silhouette in the background |
| `finance.jpg` | Финансы | stacks of glass coins rising like a bar chart, with a floating glass ruble coin above them |
| `party.jpg` | Организация праздников | glass balloons, confetti pieces and a party popper floating in the air |
| `bankruptcy.jpg` | Банкротство (есть скриншот) | glass scales of justice balanced over a broken glass chain |
| `auto.jpg` | Продажа авто (есть скриншот) | a sleek glass car silhouette on a turntable under spotlight |

## Иконка кейса — `src/assets/images/cases/<название>.png`

Размер **600×600**, PNG **с прозрачным фоном**. Плоская иконка-силуэт, заливка градиентом от фиолетового `#8247ED` к персиковому `#EB8F73`, как у иконок на сайте.

Общая часть промпта (добавлять к каждому):
> flat solid silhouette icon, single object, smooth linear gradient fill from violet #8247ED to peach #EB8F73, no outline, no shadow, no text, simple geometric shapes, centered, isolated on transparent background, 1:1

Примеры объектов:
- логистика — `a delivery truck with an arrow on its side`
- производство — `crossed wrench and hammer`
- торговля — `a shopping bag`
- юриспруденция — `a person with a coin with a dollar sign`
- финансы — `a hand holding a coin with a dollar sign`
- услуги / праздники — `a party popper with confetti`
- авто — `a car front view`
- медицина — `a medical cross inside a shield`
- строительство — `a construction helmet`
- образование — `a graduation cap`
- недвижимость — `a house with a key`
- IT — `a laptop with code brackets on screen`

## Стеклянный куб (необязательно)

Если захочется новых ракурсов для декора: PNG/WebP с прозрачным фоном, 1200×1200.
> 3D render of a single glass cube with rounded edges, translucent, iridescent violet, purple and orange refractions, soft studio lighting, floating, slight tilt, isolated on transparent background, high detail
