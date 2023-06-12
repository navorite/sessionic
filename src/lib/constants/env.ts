import browser from 'webextension-polyfill';

export const EXT_ID = 'TABIFYEXT_ID';
export const isFirefox = !!browser?.runtime?.getBrowserInfo;
export const isPopup = !new URL(document.location.href).searchParams.has('tab');
