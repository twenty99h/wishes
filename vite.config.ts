import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), babel()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
