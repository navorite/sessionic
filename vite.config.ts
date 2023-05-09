import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@components': fileURLToPath(
        new URL('./src/lib/components', import.meta.url)
      ),
      '@types': fileURLToPath(new URL('./src/lib/types', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/lib/stores', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/lib/utils', import.meta.url)),
    },
  },
  build: {
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
