import { defineConfig } from 'vite';
import { _dir } from './vite.config';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        background: _dir('./src/background/background.ts'),
      },
      output: {
        sourcemap: true,
        format: 'iife',
        entryFileNames: 'src/background/background.js',
      },
    },
  },
});
