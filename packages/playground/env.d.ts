/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WECOM_CORP_ID: string;
  readonly VITE_WECOM_AGENT_ID: string;
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
