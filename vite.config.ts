import { extension, isDEV } from './scripts/constants';
import { defineConfig, type UserConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import UnoCSS from 'unocss/vite';

export const sharedConfig: UserConfig = {
  define: {
    __EXT_NAME__: JSON.stringify(extension.name),
    __EXT_VER__: JSON.stringify(extension.version),
    __EXT_MODE__:
      parseInt(extension.version) < 1
        ? JSON.stringify('ALPHA')
        : isDEV
          ? JSON.stringify('DEV')
          : null
  },

  resolve: {
    alias: {
      '@': resolve('src'),
      '@constants': resolve('src/lib/constants'),
      '@components': resolve('src/lib/components'),
      '@stores': resolve('src/lib/stores'),
      '@utils': resolve('src/lib/utils'),
      '@styles': resolve('src/styles')
    }
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  ...sharedConfig,

  plugins: [UnoCSS(), svelte()],

  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: 'src/popup/index.html',
        options: 'src/options/index.html',
        discarded: 'src/discarded/index.html'
      }
    }
  }
});
