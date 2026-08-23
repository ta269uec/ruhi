# Handoff: Ruhi — valuation percentile app (web, installable)

## Overview

**Ruhi** ranks 28 slices of the investable market by how expensive each one is **today relative to its own 20-year history**, expressed as a 0–100 valuation percentile. It never recommends a position size or issues a buy; it labels each slice **Cheap / Fair / Rich** and explains, in plain English, why it is priced where it is, what could go wrong, and which ETFs give exposure at what expense ratio.

Brand line: *Your return is decided by the price you pay.* Descriptor locked to the wordmark: **PRICE IN PERSPECTIVE**.

**Build target for this handoff: a responsive web app, installable to the iOS home screen as a PWA.** No App Store dependency. A native wrapper can come later — the data layer and screens are identical either way.

## About the design files

Everything in `reference/` is a **design reference created in HTML** — a prototype of intended look and behavior, not production code to copy. `Ruhi.dc.html` runs on a bespoke streaming-template runtime (`support.js`); do not attempt to reuse that runtime. **Read it, screenshot it, then rebuild the screens natively** in the target stack.

Recommended stack if starting fresh: **Vite + React + TypeScript**, plain CSS custom properties (the design system is already token-based), `vite-plugin-pwa` for installability. No component library — the design is hairlines and type, and a library will fight it.

| File | What it is |
|---|---|
| `reference/Ruhi.dc.html` | The app prototype: all five screens, real interaction logic |
| `reference/Ruhi Brand.dc.html` | Brand exercise: logo, lockup, descriptor rationale, voice, About copy |
| `reference/slices-data.js` | All 28 slices as data, extracted verbatim — **illustrative values** |
| `reference/_ds/styles.css` | Design-system tokens (source of truth for color/type) |
| `reference/_ds/readme.md` | Design-system intent and usage notes |

## Fidelity

**High-fidelity.** Colors, typography, spacing and interaction states are final. Recreate pixel-accurately. Where this README and the HTML disagree, the HTML wins.

---

## Design tokens

Copy `reference/_ds/styles.css` `:root` block verbatim. The values the app actually uses:

```
--color-bg          #f2f2f3   page ground
--color-surface     #e9e9ea
--color-text        #1d1f20   body ink
--color-accent      #5980a6   steel blue, primary
--color-divider     color-mix(in srgb, #1d1f20 16%, transparent)

neutral  100 #f5f5f8  200 #e7e7ea  300 #d4d4d7  400 #b7b7ba  500 #98989b
         600 #7a7a7d  700 #5d5d60  800 #424244  900 #2b2b2d
accent   100 #eef6ff  200 #d6ebff  300 #b5d9fd  400 #94bce3  500 #749dc4
         600 #597ea3  700 #416180  800 #2c455d  900 #1d2d3d

--font-heading  "Barlow Condensed", system-ui, sans-serif   (600/700)
--font-body     "Barlow", system-ui, sans-serif             (400/500/600/700)
```

Load both from Google Fonts, weights 400–700. **Self-host before launch** — a valuation app should not block first paint on fonts.google.com.

Radius: **0 everywhere.** The design uses square corners and 1px hairlines exclusively. Do not soften.

### The two color ramps — important

There are **two** functions mapping a percentile to a color, and they are not interchangeable.

```js
// FILL — backgrounds of heatmap cells and bars. Lightens monotonically as a slice gets richer.
function ink(p) {
  return p < 30 ? '#2c455d' : p < 50 ? '#416180' : p < 70 ? '#749dc4'
       : p < 85 ? '#b7b7ba' : '#d4d4d7';
}
// TEXT — the big percentile numerals and sparkline strokes. Stays legible on the light ground.
function textInk(p) {
  return p < 30 ? '#2c455d' : p < 50 ? '#416180' : p < 70 ? '#597ea3' : '#7a7a7d';
}
```

Heatmap cell text color: `p < 50 ? '#fff' : '#2b2b2d'`.

**No red/green.** Cheapness is one steel hue at varying value. This is deliberate — traffic lights imply a recommendation, and the product does not make one.

---

## Domain model

```ts
type Group = 'US size & style' | 'Income & dividend' | 'International' | 'Real assets';
type Verdict = 'CHEAP' | 'FAIR' | 'RICH';

interface Etf   { ticker: string; name: string; expenseRatio: number }  // 0.04 = 0.04%
interface Slice {
  key: string;            // 'ussv'
  name: string;           // 'US Small Value'
  group: Group;
  pct: number;            // 0–100 valuation percentile vs. own 20y history — THE headline number
  fwdPE: string; cape: string; pb: string;   // '—' for real assets with no earnings
  yld: string;            // '2.4%'
  eps: string;            // est. 12m earnings growth, '+5%'
  ath: string;            // distance from all-time high, '-12%'
  athDate: string;        // 'Nov 2021'
  dd: string;             // worst 20y drawdown, '-45%'
  r1: string; r3: string; r5: string; r10: string;   // annualised total return
  vol: string;            // annual volatility, '22'
  corr: string;           // correlation to S&P 500, '0.85'
  flow: string;           // 12m fund flows, '+$2B'
  take: string;           // commentary para 1 — why it is priced here
  take2: string;          // commentary para 2 — shown only in 'narrative' mode
  risks: string[];        // 3–4 risk factors, rendered numbered 01/02/03
  etfs: Etf[];            // 3 per slice, with expense ratios
}
```

`verdict(pct) = pct < 30 ? 'CHEAP' : pct > 70 ? 'RICH' : 'FAIR'`

### Coverage — all 28 slices

- **US size & style (9)** — the 3×3 box: Large/Mid/Small × Value/Blend/Growth
- **Income & dividend (4)** — Dividend Growth, High Dividend Yield, International Dividend, Covered-Call Income
- **International (9)** — Developed Markets, Developed Value, Developed Small, Japan, Europe, Emerging Markets, EM Value, EM ex-China, China
- **Real assets (6)** — Gold, Silver, Broad Commodities, Energy Equity, Gold Miners, Copper & Industrial Metals

Full values (percentiles, all metrics, commentary, risks, 84 ETF rows with expense ratios) are in `reference/slices-data.js`, pipe/semicolon-delimited in the `D` array with `FIELDS` giving the column order. Parse it once into JSON and commit that instead.

### ⚠️ Data is illustrative

**Every number in `slices-data.js` is invented for design review.** It must not ship as fact. Before launch you need a licensed source for index-level forward P/E, CAPE, price-to-book, yield and 20-year history — index-provider factsheets (MSCI, S&P, FTSE Russell), a vendor feed, or fund-level proxies from the ETF issuers. Expense ratios must be re-verified against current issuer filings; they change.

### Percentile methodology (implement, don't fake)

Blend **forward P/E, CAPE and price-to-book, equally weighted**, then rank today's blended value against the slice's own monthly history since 2006 → percentile 0–100. Real-asset slices have no earnings, so use **real (inflation-adjusted) price and cost-curve percentiles** instead; their `fwdPE`/`cape`/`pb` render as `—`.

Percentiles are **within a slice, never across slices** — the ranking compares each slice to its own past, not to its peers. This distinction is the entire product; do not let a well-meaning refactor cross-normalize.

---

## Screens

Mobile-first, 390px design width. Layout: fixed brand bar → scrolling content → fixed 4-tab bar. On viewports ≥768px, center the column at max-width 480px on the `--color-bg` ground; do not build a separate desktop layout for v1.

### Brand bar (persistent, all screens)

Height ~44px, `border-bottom: 1px solid var(--color-text)`, `padding: 11px 20px 10px`, `justify-content: space-between`.

- **Left:** logo mark (26×26 SVG, see Brand below) + gap 10px + `RUHI` in Barlow Condensed 700 / 20px / `.16em` tracking, with `PRICE IN PERSPECTIVE` beneath it at Barlow 600 / 7.5px / `.2em` / uppercase / `--color-accent-700`, margin-top 2px.
- **Right:** `About` button — Barlow 600 / 9px / `.14em` / uppercase, `padding: 6px 9px`, 1px `--color-divider` border, transparent fill. Hover: border `--color-accent`, background `--color-accent-100`, text `--color-accent-800`.

The wordmark never appears without the descriptor. This is a brand rule, not a layout preference.

### 1. Ranks (default tab) — cheapest first

- **Header** `padding: 18px 20px 14px`, bottom hairline. `CHEAPEST FIRST` in Barlow Condensed 700/24px/`.02em`; today's date right-aligned at 10px `.12em` uppercase `--color-neutral-600`; one-line explainer at 12.5px `--color-neutral-700`.
- **Stat strip** — 3 equal columns divided by hairlines, `padding: 12px 14px`: Cheapest slice name, Richest slice name, "N of 28" below the 30th percentile. Labels 9.5px `.13em` uppercase; values Barlow Condensed 600/16px.
- **Filter row** — horizontally scrollable segmented control, hairline-divided: All / US / Intl / Income / Real assets. Active = `--color-accent` fill, `#fff` text. Inactive = transparent, `--color-neutral-700`. `padding: 11px 14px`, 10.5px `.12em` uppercase.
- **Rows**, sorted ascending by `pct`, `padding: 14px 18px` (9px 18px in compact), bottom hairline, hover `--color-accent-100`, whole row tappable → Detail:
  - rank `01`–`28`, 22px wide, Barlow Condensed 600/15px, `--color-neutral-500`
  - slice name, Barlow Condensed 600/17px, with the verdict badge inline
  - meta line, 10px `.1em` uppercase: `{group} · fwd P/E {x} · yld {y}`
  - **the cheapness visual** (see below)
  - right rail, 56px: the percentile in Barlow Condensed 700/26px colored by `textInk(pct)`, with `PCTILE` beneath at 9px
- **Footnote** — methodology + "Illustrative data", 11.5px `--color-neutral-600`.

**Verdict badges:** CHEAP = `--color-accent` fill / white text. FAIR = `--color-accent-200` fill / `--color-accent-800` text. RICH = 1px `--color-neutral-700` border / transparent / `--color-neutral-800`. All 9.5px Barlow 600, `.1em`, `padding: 3px 6px`.

**Cheapness visual — three modes** (currently a build-time tweak; ship `bar`):
- `bar` — 7px track, `--color-neutral-200` fill, 1px `--color-neutral-300` border, filled to `pct%` with `ink(pct)`, plus a 1px `--color-neutral-500` median tick at 50% overhanging 3px top and bottom.
- `spark` — 240×30 viewBox SVG, 40-point percentile history polyline at `textInk(pct)` stroke-width 1.5, 1px `--color-neutral-300` baseline at y=15, 2.5r end dot.
- `dial` — 44px SVG ring, r=17, `--color-neutral-300` track, `textInk(pct)` arc via `stroke-dasharray` (circumference 106.8), rotated −90°, percentile numeral centered.

### 2. Map — valuation heatmap

Four labeled blocks, `gap: 1px` grids, every cell tappable → Detail. Legend at the bottom: a `linear-gradient(90deg, --color-accent-800, --color-accent-400, --color-neutral-200)` bar captioned CHEAP → RICH.

- **US size & style** — a true 3×3 style box, `grid-template-columns: 34px 1fr 1fr 1fr`. Column heads Value / Blend / Growth; row labels Large / Mid / Small right-aligned. Cells are 54px tall, percentile numeral only, Barlow Condensed 700/19px, centered.
- **Income & dividend / International / Real assets** — 2-column grids of 48px cells, `justify-content: space-between`, `padding: 0 10px`: slice name left (Barlow Condensed 600/13px, `Developed`→`Dev`, `International`→`Intl`), percentile right.

All cell backgrounds `ink(pct)`; text `#fff` under 50, `#2b2b2d` at or above.

### 3. Watch — watchlist with percentile alerts

Per row: slice name (Barlow Condensed 600/19px) + percentile (700/26px, `textInk`); a 26px-tall track with the fill to `pct%` in `ink(pct)` and a **1px full-height `--color-text` marker at the user's trigger percentile**; below it `ALERT AT {n}TH` and either `Triggered` or `{n} pts away`; then a free-text note at 13px. Primary `Add a slice` button at the foot — full width, `--color-accent` fill, white, 13px padding, 12px `.14em` uppercase label, hover `--color-accent-600`.

Alert semantics: fires when `pct` **crosses down through** the trigger, once, not while it remains below.

### 4. Notes — "What changed"

Reverse-chronological cards, each tappable → Detail: a verdict-colored slice-name chip + date, headline (Barlow Condensed 600/19px), 13.5px body, and `READ THE SLICE →` in `--color-accent-700` 10px `.12em` uppercase.

Editorial rule: written when a percentile **moves enough to matter** — not daily. Suggested trigger for v1: a ±5 percentile move, or a Cheap/Fair/Rich boundary crossing.

### 5. Slice detail (pushed view, not a tab)

Sticky back bar (`← BACK` + group name), then:

1. **Hero** — slice name Barlow Condensed 700/32px; the percentile at **76px, weight 700, line-height .8**, colored `textInk(pct)`; verdict badge; and one generated sentence that **flips with the percentile**:
   - `pct < 50` → *"Cheaper than today in only {pct}% of the last 20 years."*
   - `pct >= 50` → *"Only {100-pct}% of the last 20 years was more expensive than today."*
   Getting this backwards is the single most likely bug in the build. It was one in the prototype.
2. **20-year percentile chart** — 330×120 SVG: `--color-accent-100` band across the 30th–70th percentile zone, dashed `--color-neutral-400` median line, 80-point history polyline in `--color-accent-700` at 1.6, 3.5r end dot, axis labels *100 · richest* / *0 · cheapest*.
3. **ATH / drawdown pair** — two hairline-divided cells: distance from all-time high (Barlow Condensed 700/30px) with the ATH date beneath; worst 20-year drawdown likewise.
4. **Valuation & character** — 2-column grid, 8 metrics: Forward P/E, CAPE, Price/book, Dividend yield, Earnings growth, Volatility, Correlation to S&P 500, Fund flows. Each: 9.5px uppercase label, 21px Barlow Condensed 600 value, 11px qualifier.
5. **Annualised total return** — 4 equal cells: 1yr / 3yr / 5yr / 10yr.
6. **Why it is priced here** — commentary, 14px/1.55. Para 2 only in `narrative` mode.
7. **Risk factors** — numbered `01`/`02`/`03`, accent numeral, hairline between, 13.5px text.
8. **How to own it** — 3-column table (`64px 1fr 56px`), `--color-accent-100` header row: Ticker (Barlow Condensed 700/16px) / Fund name (12.5px) / Expense ratio, right-aligned. Footnote: *"Expense ratios are annual, in percent. Listed for coverage of the slice, not as a recommendation of a fund provider."*

### 6. About (from the brand-bar link)

Centered 64px logo mark, RUHI at 34px `.16em`, descriptor beneath. Then: headline *"The essence of a price"*, three body paragraphs, the Buffett epigraph in a `--color-accent` left rule, a **Method** section, and the closing italic line *"Named for someone whose name means soul."* Exact copy is in the prototype and in `Ruhi Brand.dc.html` §07 — **use it verbatim**; it is the only place the name explains itself.

### Tab bar

74px, `border-top: 1px solid var(--color-text)`, 4 equal hairline-divided columns. 20px Lucide icon (stroke 1.5, `currentColor`) above a 9.5px `.12em` uppercase label. Active = `--color-accent-100` background, `--color-accent-800` ink; inactive `--color-neutral-600`. Icons: `bar-chart-3`, `layout-grid`, `eye`, `newspaper`. Detail and About are pushed views — no tab is active in them.

---

## State

```
tab:     'ranks' | 'map' | 'watch' | 'notes'
filter:  'all' | Group          // Ranks only
detail:  sliceKey | null        // pushed view over any tab
about:   boolean                // pushed view over everything
```

Transitions: tab change clears `detail` and `about`. Opening a slice from any screen sets `detail` and returns to the `ranks` tab underneath. Back clears both.

In a real router make `detail` and `about` **real routes** (`/slice/ussv`, `/about`) so back-gesture and share-links work; the prototype fakes it with local state. Persist `tab` and `filter` in `localStorage`; do not persist `detail`.

## Behavior beyond the prototype

The prototype has no async, so these are yours to design:

- **Loading** — skeleton the row list at the real row height; never collapse-then-expand the layout.
- **Error / stale data** — a slice with no fresh valuation must render as unavailable, not as percentile 0. A wrong "CHEAP" is the worst possible failure mode for this product.
- **Data freshness** — show the as-of date in the Ranks header (already in the design) and drive it from the feed, not the clock.
- **Refresh** — daily is ample. These are 20-year percentiles; intraday updating would misrepresent the signal's timescale.

## PWA / installability

- `manifest.webmanifest`: `name: "Ruhi — Price in Perspective"`, `short_name: "Ruhi"`, `display: "standalone"`, `background_color`/`theme_color` `#f2f2f3`, icons at 192/512 (maskable variant too).
- iOS: `<meta name="apple-mobile-web-app-capable" content="yes">`, `apple-touch-icon` at 180×180, `<meta name="apple-mobile-web-app-status-bar-style" content="default">`.
- App icon: the range mark reversed white on `--color-accent-900` `#1d2d3d`, strokes thickened to 3 — never with a wordmark.
- Service worker: cache the shell and the last successful data payload so the app opens offline showing clearly-dated stale data.

Install flow on iOS is Share → Add to Home Screen. Worth a one-time hint on the About screen.

## Brand rules the build must honor

1. The wordmark **never** appears without the descriptor `PRICE IN PERSPECTIVE`, set at ~⅓ its size, Barlow 600, uppercase, `.2em`.
2. The mark alone is allowed only where the name is already present: app icon, favicon, loading state.
3. Steel on paper, or paper on steel. No third color, no gradient, no rounded corner.
4. Clear space around the lockup = the cap height of RUHI.

**Logo — the range mark**, 64×64 viewBox (thicken strokes to 2 at ≤48px, 3 at ≤26px):

```html
<svg viewBox="0 0 64 64">
  <line x1="32" y1="6" x2="32" y2="58" stroke="#5980a6" stroke-width="1.5"/>
  <line x1="21" y1="6" x2="43" y2="6"  stroke="#5980a6" stroke-width="1.5"/>
  <line x1="21" y1="58" x2="43" y2="58" stroke="#5980a6" stroke-width="1.5"/>
  <rect x="22" y="41" width="20" height="8" fill="#2c455d"/>
</svg>
```

It is the 20-year range as a capped vertical line with today's price marked low in it — the product in four strokes.

## Voice

A good analyst who respects your time: declarative, numerate, never excited. States the price, states the risk, stops. **Never uses the word "opportunity."** Examples in `Ruhi Brand.dc.html` §06 — match them for any new copy, including empty states and error messages.

## Compliance — read before shipping

Not legal advice; flagging exposure.

- **The `CHEAP` badge is the product's legal surface.** "Cheap versus its own history" is a valuation statement; "you should buy this" is advice. Keep every string on the valuation side of that line and have counsel review the badge labels and commentary before launch.
- Ship a persistent disclaimer: not investment advice, illustrative/informational, past performance, no relationship created.
- Name ETFs **as exposure to a slice**, never as a recommendation — the existing table footnote does this; keep it.
- Data licensing terms will constrain what you may display and cache. Read them before designing the feed.
- If a native App Store build follows: Apple Guideline 3.1.1 and the finance-app category get extra scrutiny. Have the disclaimer and data provenance answers ready.

## Assets

No bitmaps. Everything is SVG (Lucide icons + the logo mark) and type. Fonts: Barlow and Barlow Condensed (Google Fonts, OFL) — self-host for launch.

## Suggested build order

1. Scaffold Vite + React + TS; drop in tokens; build the brand bar and tab shell.
2. Commit `slices-data.js` as typed JSON; write `ink`/`textInk`/`verdict`/`pctLine` as pure, unit-tested functions. **Test `pctLine` at 0, 29, 30, 49, 50, 70, 71, 100.**
3. Ranks screen with the `bar` visual — this alone is a usable product.
4. Slice detail, including the percentile chart.
5. Map, Notes, About.
6. Watch + alert logic (needs persistence; do it last).
7. PWA manifest, service worker, icons.
8. Swap illustrative data for the real feed. Do not launch before this.
