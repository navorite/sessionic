import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export function _dir(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@constants': _dir('./src/lib/constants'),
      '@components': _dir('./src/lib/components'),
      '@stores': _dir('./src/lib/stores'),
      '@utils': _dir('./src/lib/utils'),
      '@styles': _dir('./src/styles'),
    },
  },

  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        popup: _dir('./src/popup/index.html'),
        options: _dir('./src/options/index.html'),
      },
    },
  },
});
