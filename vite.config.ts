import { extension, isDEV } from './scripts/constants';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';

export function _dir(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __EXT_NAME__: JSON.stringify(extension.name),
    __EXT_VER__: isDEV ? JSON.stringify('DEV') : null,
  },

  plugins: [svelte()],
  resolve: {
    alias: {
      '@constants': _dir('src/lib/constants'),
      '@components': _dir('src/lib/components'),
      '@stores': _dir('src/lib/stores'),
      '@utils': _dir('src/lib/utils'),
      '@styles': _dir('src/styles'),
    },
  },

  build: {
    ...(isDEV && {
      watch: {},
      sourcemap: 'inline',
    }),

    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: 'src/popup/index.html',
        options: 'src/options/index.html',
      },
    },
  },
});
