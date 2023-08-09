import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { log } from 'node:console';
import type { Manifest } from 'webextension-polyfill';

export enum colors {
	default = 0,
	black = 30,
	red = 31,
	green = 32,
	yellow = 33,
	blue = 34,
	purple = 35,
	cyan = 36,
	white = 37
}

export function writeJSON(dir: string, fileName: string, manifest: Manifest.WebExtensionManifest) {
	!existsSync(dir) && mkdirSync(dir);

	writeFileSync(`${dir}${fileName}`, JSON.stringify(manifest, null, 2));
}

export function clog(msg: string, color: colors = colors.default) {
	log(`\x1b[${color}m${msg}\x1b[0m`);
}

export function generateScale(color: string, start: number = 1, end: number = 12) {
	const length = end - start + 1;
	const palette = Array.from({ length }) as [[number, string]];
	for (let i = 0; i < length; i++) {
		palette[i] = [i + 1, `hsl(var(--${color}-${i + start}) / <alpha-value>)`];
	}

	return Object.fromEntries(palette);
}
