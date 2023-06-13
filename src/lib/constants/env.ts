import browser from 'webextension-polyfill';
import type { compressOptions } from '../types/browser';

export const EXT_ID = 'TABIFYEXT_ID';

export const isFirefox = !!browser?.runtime?.getBrowserInfo;

export const isPopup = !new URL(document.location.href).searchParams.has('tab');

export const tabAttr = [
  'active',
  'discarded',
  'title',
  'url',
  'id',
  'pinned',
  'favIconUrl',
  ...(isFirefox ? ['mutedInfo', 'isInReaderMode', 'cookieStoreId'] : []),
];

export const compress_options: compressOptions = {
  type: 'image/webp',
  quality: 0.7,
  max_size: 20,
};
