import browser from 'webextension-polyfill';

export const isFirefox = !!browser?.runtime?.getBrowserInfo;

export const runtimeURL = browser?.runtime?.getURL('');

export const isPopup = !new URL(document.location.href).searchParams.has('tab');

export const storage = browser?.storage?.local;
