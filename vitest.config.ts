import { defineConfig } from 'vitest/config'

// Kept separate from vite.config.ts: vitest's bundled vite peer currently trails
// this project's vite version, and merging the two configs' plugin types trips
// up `tsc -b`. Runtime behavior is unaffected either way.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
