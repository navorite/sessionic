import { extension, isDEV } from './scripts/constants';
import { defineConfig, type UserConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';

export function _dir(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}

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
      '@': _dir('src'),
      '@constants': _dir('src/lib/constants'),
      '@components': _dir('src/lib/components'),
      '@stores': _dir('src/lib/stores'),
      '@utils': _dir('src/lib/utils'),
      '@styles': _dir('src/styles')
    }
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  ...sharedConfig,

  plugins: [svelte()],

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
