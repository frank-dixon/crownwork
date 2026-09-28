# Crownwork

Interactive **fruit-tree pruning desk** for North American fruiting plants. Click labeled cut points on a cream-paper diagram to learn **how**, **why**, **when**, and what **good vs bad** cuts look like. Switch to **Advanced** for before/after physiology (auxin, apical dominance, carbohydrate allocation, CODIT wound response) with short Extension citations.

Default mode: **Trees** — apple (central leader), peach (open center), pear (upright / spurs), each with anatomy labels, thinning vs heading, renewal, suckers/watersprouts, deadwood, narrow crotches, and crossing wood. Berries, vines, and other woody crops share the same UI shell.

**Live:** [frank-dixon.github.io/crownwork](https://frank-dixon.github.io/crownwork/) (GitHub Pages from `docs/`).

Part of the [frank-dixon.github.io](https://frank-dixon.github.io/) hub — cream / paper surfaces with turquoise `#0B8A8F`.

## Run locally

```bash
npm install
npm run watch
```

Then open `docs/index.html` in a browser (or serve the `docs/` folder with any static server).

One-shot production build:

```bash
npm run build
```

Built assets land in `docs/css/` and `docs/js/` (committed for Pages).

## Notes

- Theme tokens live in `tailwind.config.js` (void/bg/raised cream, sea teal, wood, cut).
- Tailwind utility classes for layout/chrome; plant rendering is SVG via `src/js/plant.js` (wood browns + teal strokes, optional anatomy label layer).
- Accessibility: focusable cut markers, Escape closes the detail panel, anatomy labels toggle, `prefers-reduced-motion` respected in CSS.

## Stack

- Tailwind CSS 3 (hub cream + teal tokens)
- Plain ES5-friendly IIFE modules minified with esbuild into `docs/js/`
- No framework runtime
