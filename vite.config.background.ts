import { defineConfig } from 'vite';
import { isDEV } from './scripts/constants';
import { sharedConfig } from './vite.config';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  ...sharedConfig,

  build: {
    emptyOutDir: false,

    ...(isDEV && {
      watch: {},
      sourcemap: 'inline'
    }),

    rollupOptions: {
      input: {
        background: resolve('src/background/background.ts')
      },
      output: {
        format: 'iife',
        entryFileNames: 'src/background/background.js'
      }
    }
  }
});
