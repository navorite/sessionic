export const isFirefox = process.env.TARGET === 'firefox';

export const extension = {
  name: 'Sessionic',
  version: process.env.npm_package_version!,
  description: 'A browser extension to save tabs, sessions, and manage them.',
  author: 'navorite',
  homepage_url: 'https://github.com/navorite/sessionic',
  permissions: [
    'tabs',
    'storage',
    'unlimitedStorage',
    'alarms',
    ...(isFirefox ? ['cookies'] : ['system.display'])
  ],
  firefoxId: 'sessonic@navorite'
};

export const isDEV = process.env.NODE_ENV !== 'production';

export const dir = './dist/';
