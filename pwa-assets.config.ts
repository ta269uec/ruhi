import { defineConfig, minimal2023Preset } from "@vite-pwa/assets-generator/config";

// Source is the app icon per README: the range mark reversed white on
// --color-accent-900 (#1d2d3d), strokes thickened to 3, never with a
// wordmark. Same file backs the browser-tab favicon.
export default defineConfig({
  headLinkOptions: {
    preset: "2023",
  },
  preset: minimal2023Preset,
  images: ["public/icons/favicon.svg"],
});
