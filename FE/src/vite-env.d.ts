/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_NAVERMAP_CLIENT_ID: string;
  readonly VITE_NAVER_SEARCH_CLIENT_ID: string;
  readonly VITE_NAVER_SEARCH_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
