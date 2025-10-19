/// <reference types="vite/client" />

// (opcjonalnie) doprecyzuj własną zmienną:
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}