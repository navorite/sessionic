import type { Page } from '../types/extension';
import browser from 'webextension-polyfill';
import storage from './storage';
import { EXT_ID } from '@constants/env';

// Get runtime URL for a page in the extension
export function getExtensionURL(page?: Page, query: string = '') {
  return browser?.runtime?.getURL(`src/${page}/index.html${query}`);
}

// Open the extension Options page, under a unique ID to prevent duplicate tabs
export function openOptions() {
  return browser?.runtime?.openOptionsPage();
}

// Open the extension Popup page, under a unique ID to prevent duplicate tabs
export function openPopup() {
  const popupURL = getExtensionURL('popup', '?tab=true');
  window?.open(popupURL, EXT_ID);
}

export async function setDarkMode(dark: boolean, fade?: boolean) {
  if (fade) document.body.classList.add('fade');
  document.body.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'normal';
}

export async function getDarkMode() {
  return (await storage?.get('dark'))?.dark;
}
