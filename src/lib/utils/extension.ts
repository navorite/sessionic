import browser from 'webextension-polyfill';
import type { Page } from '../types/navigation';

// Get runtime URL for a page in the extension - Ex popup becomes moz:ext-identifier/src/popup/index.html

export function getExtensionURL(page?: Page) {
  return browser?.runtime?.getURL(`./src/${page}/index.html`);
}

// Open the extension Options page, under a unique ID to prevent duplicate tabs

export function openOptions() {
  return browser?.runtime?.openOptionsPage();
}

// Open the extension Popup page, under a unique ID to prevent duplicate tabs

export function openPopup() {
  const popupURL = getExtensionURL('popup');
  window?.open(popupURL, popupURL);
}
