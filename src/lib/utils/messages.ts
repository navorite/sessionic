import browser from 'webextension-polyfill';

export const sendMessage = browser?.runtime?.sendMessage;
