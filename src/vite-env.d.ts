/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  // Where the app fetches its valuation data from. Defaults to the bundled
  // placeholder file (/data/slices.json) when unset — see src/lib/dataClient.ts.
  readonly VITE_DATA_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
