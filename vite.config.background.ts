import { defineConfig } from 'vite';
import { isDEV } from './scripts/constants';
import { _dir, sharedConfig } from './vite.config';

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
				background: _dir('src/background/background.ts')
			},
			output: {
				format: 'iife',
				entryFileNames: 'src/background/background.js'
			}
		}
	}
});
