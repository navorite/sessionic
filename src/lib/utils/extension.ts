import type { Page } from '../types/navigation';
import browser from 'webextension-polyfill';

// Get runtime URL for a page in the extension

export function getExtensionURL(page?: Page) {
  return browser?.runtime?.getURL(`src/${page}/index.html`);
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
