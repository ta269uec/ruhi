# Starting prompt for Claude Code

Paste this as your first message in Claude Code, with this folder as the working directory.

---

Read `README.md` in full, plus `reference/slices-data.js`, before writing any code.

Build **Ruhi** as a responsive, installable web app: Vite + React + TypeScript, plain CSS custom properties (no component library), `vite-plugin-pwa`. Mobile-first at a 390px design width; on viewports ≥768px just center the column at max-width 480px.

The HTML files in `reference/` are **design references**, not code to copy — they run on a bespoke template runtime. Read them for exact layout, color and copy, then rebuild the screens idiomatically in React. Where the README and the HTML disagree, the HTML wins.

Work in this order, and stop after each step so I can look at it:

1. Scaffold + design tokens + brand bar + tab shell.
2. Convert `reference/slices-data.js` into typed JSON (28 slices). Implement `ink`, `textInk`, `verdict` and `pctLine` as pure functions with unit tests — including `pctLine` at 0, 29, 30, 49, 50, 70, 71, 100.
3. The Ranks screen (cheapest-first list, `bar` visual, filter row, stat strip).
4. Slice detail, including the 20-year percentile SVG chart.
5. Map, Notes, About.
6. Watch + alert logic with persistence.
7. PWA manifest, service worker, icons.

Non-negotiables, all explained in the README:

- **No red/green anywhere.** Cheapness is one steel hue at varying value.
- **Square corners, 1px hairlines.** Border-radius is 0 everywhere.
- The wordmark never appears without the descriptor `PRICE IN PERSPECTIVE`.
- Percentiles are computed **within a slice against its own history**, never across slices.
- The detail-page sentence **flips at 50** — see `pctLine`. This was a real bug in the prototype; get it right.
- All bundled data is **illustrative**. Keep the "Illustrative data" footnote and the compliance disclaimer visible until a licensed feed replaces it.
- Copy is final. Use the commentary, risk factors and About text verbatim.
- `/slice/:key` and `/about` are real routes so back-gesture and sharing work.

Start with step 1.
