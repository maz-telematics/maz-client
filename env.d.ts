// src/env.d.ts
interface ImportMetaEnv {
    VITE_API_URL: string;
    // другие переменные окружения, если необходимо
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }