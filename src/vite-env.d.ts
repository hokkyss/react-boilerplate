/// <reference types="./types/svg" />
/// <reference types="./globals" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_CSS_PREFIX: string;
  readonly VITE_IDENTIFIER_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
