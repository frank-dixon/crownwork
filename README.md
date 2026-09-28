# Crownwork

Interactive pruning trainer for North American fruiting plants. Click labeled cut points on a diagram to learn **how** and **why** to prune; switch to **Advanced** for before/after physiology (auxin, apical dominance, carbohydrate allocation, wound response) with short Extension citations.

Default mode: **Trees / apple** with a central-leader diagram and 8 cut markers. Berries, vines, and other woody crops share the same UI shell with real cut copy and simpler diagram variants.

Part of the [frank-dixon.github.io](https://frank-dixon.github.io/) hub (cool spectrum: void / sea / action).

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

Built assets land in `docs/css/` and `docs/js/` (commit those for Pages when you enable it).

## Notes

- **GitHub Pages is not enabled yet** for this repository. The app is Pages-ready under `docs/` when you turn it on.
- Tailwind utility classes only for layout/chrome; plant rendering is SVG via `src/js/plant.js`.
- Accessibility: focusable cut markers, Escape closes the detail panel, `prefers-reduced-motion` respected in CSS.

## Stack

- Tailwind CSS 3 (hub tokens in `tailwind.config.js`)
- Plain ES5-friendly IIFE modules minified with esbuild into `docs/js/`
- No framework runtime
