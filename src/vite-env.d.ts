/// <reference types="./types/svg" />
/// <reference types="./globals" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HELLO: string;
  readonly VITE_CSS_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
