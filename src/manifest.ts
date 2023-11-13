import type { Manifest } from 'webextension-polyfill';
import { extension, isFirefox } from '../scripts/constants';

export const manifest: Manifest.WebExtensionManifest = {
  manifest_version: 3,
  name: extension.name,
  version: extension.version,
  description: extension.description,
  author: extension.author,
  homepage_url: extension.homepage_url,

  action: {
    default_title: extension.name,
    default_popup: './src/popup/index.html',
    default_icon: {
      16: './favicons/16.png',
      32: './favicons/32.png',
      64: './favicons/64.png'
    }
  },

  background: isFirefox
    ? {
        scripts: ['./src/background/background.js'],
        type: 'module'
      }
    : {
        service_worker: './src/background/background.js',
        type: 'module'
      },

  options_ui: {
    page: './src/options/index.html',
    open_in_tab: true
  },

  permissions: extension.permissions,

  icons: {
    16: './favicons/16.png',
    32: './favicons/32.png',
    48: './favicons/48.png',
    64: './favicons/64.png',
    96: './favicons/96.png'
  },

  default_locale: 'en',

  ...(isFirefox && {
    browser_specific_settings: {
      gecko: {
        id: extension.firefoxId
      }
    }
  })
};
