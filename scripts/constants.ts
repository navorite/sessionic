import { version } from 'package.json';

export const isFirefox = process.env.BROWSER_ENV === 'FF';

export const extension = {
  name: 'Sessionic',
  version,
  description: 'A browser extension to save tabs, sessions, and manage them.',
  author: 'navorite',
  homepage_url: 'https://github.com/navorite/sessonic',
  permissions: [
    'tabs',
    'storage',
    'unlimitedStorage',
    ...(isFirefox ? ['cookies'] : []),
  ],
  firefoxId: 'sessonic@navorite',
};

export const isDEV = process.env.NODE_ENV !== 'production';

export const dir = './dist/';

export const views = ['popup', 'options'];
