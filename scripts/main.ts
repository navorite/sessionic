import { clog, colors, writeJSON } from './utils';
import { dir, isFirefox } from './constants';
import manifest from './manifest';

writeJSON(dir, 'manifest.json', manifest);

clog(`Created ${dir}manifest.json - ${isFirefox ? 'Firefox' : 'Chromium'} version`, colors.green);
