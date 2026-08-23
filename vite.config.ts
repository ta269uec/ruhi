import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/favicon.svg', 'icons/favicon.ico'],
      manifest: {
        name: 'Ruhi — Price in Perspective',
        short_name: 'Ruhi',
        description:
          "Ruhi ranks 28 slices of the market by valuation percentile vs. their own 20-year history.",
        display: 'standalone',
        background_color: '#f2f2f3',
        theme_color: '#f2f2f3',
        icons: [
          { src: 'icons/pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'icons/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache the app shell (JS/CSS/HTML/icons) — always available offline.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // The data feed is fetched at runtime, not precached: try the network
        // first for the freshest numbers, fall back to the last successful
        // response when offline. This is "cache the last successful data
        // payload" from the README, now that data isn't bundled into the JS.
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname === '/data/slices.json',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'ruhi-data',
              networkTimeoutSeconds: 4,
              expiration: { maxEntries: 1 },
            },
          },
        ],
      },
    }),
  ],
})
