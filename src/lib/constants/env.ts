import browser from 'webextension-polyfill';

export const EXT_NAME = __EXT_NAME__;

export const isDEV = process.env.NODE_ENV !== 'production';

export const isFirefox = !!browser?.runtime?.getBrowserInfo;

export const runtimeURL = browser?.runtime?.getURL('');

export const isPopup = !new URL(document.location.href).searchParams.has('tab');

export const tabAttr = [
  'id',
  'title',
  'url',
  'favIconUrl',
  'active',
  'discarded',
  'pinned',
  'incognito',
  ...(isFirefox ? ['mutedInfo', 'isInReaderMode', 'cookieStoreId'] : []),
];

export const compress_options: compressOptions = {
  type: 'image/webp',
  quality: 0.7,
  max_size: 20,
};
