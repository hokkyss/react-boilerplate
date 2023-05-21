/// <reference types="./globals" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HELLO: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
