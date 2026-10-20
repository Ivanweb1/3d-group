import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        cases: resolve(import.meta.dirname, 'cases.html'),
      },
    },
  },
});
