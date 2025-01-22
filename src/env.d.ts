/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_KAKAO_MAP_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
