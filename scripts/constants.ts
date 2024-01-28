export const isFirefox = process.env.TARGET === 'firefox';

export const extension = {
  name: 'Sessionic',
  version: process.env.npm_package_version!,
  description:
    'A web extension to save, manage and restore sessions, windows and tabs.',
  author: 'navorite',
  homepage_url: 'https://github.com/navorite/sessionic',
  permissions: [
    'tabs',
    'storage',
    'unlimitedStorage',
    'alarms',
    'contextMenus',
    ...(isFirefox ? ['cookies'] : ['system.display', 'favicon'])
  ],
  firefoxId: 'sessonic@navorite'
};

export const isDEV = process.env.NODE_ENV !== 'production';

export const dir = './dist/';
