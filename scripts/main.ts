import { clog, colors, ensureDir, writeJSON } from './utils';
import { dir, isDEV, isFirefox } from './constants';
import { manifest } from '@/manifest';
import { readFileSync, writeFileSync } from 'fs';
import { _dir } from 'vite.config';
import chokidar from 'chokidar';

function injectHMR() {
	const views = ['options', 'popup', 'discarded'];

	for (const view of views) {
		ensureDir(_dir(`dist/src/${view}`));
		let data = readFileSync(_dir(`src/${view}/index.html`), {
			encoding: 'utf-8'
		});
		data = data
			.replace('"./main.ts"', `"http://localhost:${5173}/src/${view}/main.ts"`)
			.replace(
				'<div id="app"></div>',
				'<div id="app">Vite server did not start</div>'
			);

		writeFileSync(_dir(`dist/src/${view}/index.html`), data, {
			encoding: 'utf-8'
		});
	}
}

if (isDEV) {
	injectHMR();

	manifest.content_security_policy = {
		extension_pages:
			"script-src 'self'; object-src 'self'; script-src-elem 'self' 'unsafe-inline' http://localhost:5173/;"
	};

	if (isFirefox) {
		manifest.manifest_version = 2;
		manifest.browser_action = { ...manifest.action };
		delete manifest.action;
		manifest.content_security_policy =
			"script-src 'self' http://localhost:5173/ 'unsafe-eval'; object-src 'self'";
	}

	chokidar.watch(_dir('src/**/*.html')).on('change', injectHMR);
}

writeJSON(dir, 'manifest.json', manifest);

clog(
	`\n\nCreated ${dir}manifest.json - ${
		isFirefox ? 'Firefox' : 'Chromium'
	} version\n`,
	colors.green
);
