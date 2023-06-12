import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@constants': fileURLToPath(
        new URL('./src/lib/constants', import.meta.url)
      ),
      '@components': fileURLToPath(
        new URL('./src/lib/components', import.meta.url)
      ),
      '@stores': fileURLToPath(new URL('./src/lib/stores', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/lib/utils', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
    },
  },

  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        popup: fileURLToPath(
          new URL('./src/popup/index.html', import.meta.url)
        ),
        options: fileURLToPath(
          new URL('./src/options/index.html', import.meta.url)
        ),
      },
    },
  },
});
