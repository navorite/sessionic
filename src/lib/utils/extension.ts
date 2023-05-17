import type { Page } from '../types/extension';
import browser from 'webextension-polyfill';
import { dark, isTabPopup } from '@stores/settings';

export function initSettings() {
  getDarkMode();
  initPopup();
}

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
  window?.open(popupURL, popupURL);
}

export function initPopup() {
  let url = new URL(document.location.href);
  isTabPopup.set(url.searchParams.has('tab'));
}

export function handleDarkMode() {
  const local = browser?.storage?.local;

  local?.get('dark').then((value: { dark: boolean }) => {
    const theme = !value.dark;

    document.body.classList.add('fade');
    document.body.classList.toggle('dark', theme);
    document.documentElement.style.colorScheme = theme ? 'dark' : 'normal';

    local
      ?.set({
        dark: theme,
      })
      .then(() => {
        dark.set(theme);
      });
  });
}

export function getDarkMode() {
  const local = browser?.storage?.local;
  let theme = true;

  local?.get('dark').then((value: { dark: boolean }) => {
    theme = value.dark;

    if (value.dark === undefined) {
      dark.subscribe((value) => {
        theme = value;
      });
    } else {
      dark.set(theme);
    }

    document.body.classList.toggle('dark', theme);
    document.documentElement.style.colorScheme = theme ? 'dark' : 'normal';
  });
}
