
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Определяем конфигурацию Vite
export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3000, // Укажите нужный порт (по умолчанию 5173)
  },
  
  build: {
    outDir: 'dist', // Каталог для сборки
  },
  
  resolve: {
    alias: {
      '@': '/src', // Создайте псевдонимы для сокращенного импорта
    },
  },
  
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')], // Подключаем Tailwind и Autoprefixer
    },
  },
});