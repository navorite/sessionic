import browser from 'webextension-polyfill';

export const runtimeURL = browser?.runtime?.getURL('');

export const storage = browser?.storage?.local;

export const isFirefox = !!browser?.runtime?.getBrowserInfo;
