import { defineConfig } from 'vite';
import { extension, isDEV } from './scripts/constants';
import { _dir } from './vite.config';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __EXT_NAME__: JSON.stringify(extension.name),
    __EXT_VER__: isDEV ? JSON.stringify('DEV') : null,
  },

  build: {
    ...(isDEV && {
      watch: {},
      sourcemap: 'inline',
    }),

    emptyOutDir: false,
    rollupOptions: {
      input: {
        background: _dir('src/background/background.ts'),
      },
      output: {
        format: 'iife',
        entryFileNames: 'src/background/background.js',
      },
    },
  },
});
