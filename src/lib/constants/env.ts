import browser from 'webextension-polyfill';

export const isFirefox = !!browser?.runtime?.getBrowserInfo;

export const runtimeURL = browser?.runtime?.getURL('');

export const isPopup = !new URL(document.location.href).searchParams.has('tab');

export const storage = browser?.storage?.local;

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
