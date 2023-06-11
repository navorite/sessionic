import browser from 'webextension-polyfill';

export const isFirefox = !!browser?.runtime?.getBrowserInfo;
