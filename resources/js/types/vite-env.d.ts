/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MENU_SLUG?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
