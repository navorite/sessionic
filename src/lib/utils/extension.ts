import type { Icon, Page } from '@/lib/types';
import browser from 'webextension-polyfill';
import {
  favIconAllowedList,
  favIconDisallowedList,
  isFirefox,
  runtimeURL
} from '@constants/shared';
import { decompress } from 'lz-string';

export function isExtensionViewed() {
  return document.visibilityState === 'visible';
}

export function isExtensionReady() {
  return document.readyState === 'complete';
}

// Open the Options page
export function openOptions() {
  return openExtensionPage('options');
}

// Open the Popup page
export function openFullView() {
  return openExtensionPage('popup', '?tab=true');
}

// Open an extension page, under a unique ID to prevent duplicate tabs
// candidate: close already open full view pages if it exists
export async function openExtensionPage(page: Page, query?: string) {
  const [t1, t2] = await Promise.all([
    browser.tabs.query({ active: true, currentWindow: true }),
    browser.tabs.query({
      url: getExtensionURL(page, query)
    })
  ]);

  if (!t1.length) return;

  const currentTab = t1[0]!;

  if (!t2.length)
    browser.tabs.create({
      url: getExtensionURL(page, query),
      index: currentTab.index + 1
    });
  else {
    const extensionTab = t2[0]!;

    if (
      (Math.abs(currentTab.index - extensionTab.index) >= 15 && isFirefox) ||
      extensionTab.windowId !== currentTab.windowId
    )
      browser.tabs.move(extensionTab.id!, {
        index: currentTab.index + 1,
        windowId: currentTab.windowId
      });

    browser.tabs.update(extensionTab.id, { active: true, highlighted: true });
  }
}

// Get runtime URL for a page in the extension
export function getExtensionURL(page?: Page, query: string = '') {
  return `${runtimeURL}src/${page}/index.html${query}`;
}

// Get the favIcon
export function getFavIcon(
  url: string | undefined,
  favIconUrl: string | undefined
) {
  if (!url) return null;

  if (favIconUrl) favIconUrl = decompress(favIconUrl);

  if (
    (isFirefox || url.startsWith('http')) &&
    favIconAllowedList.some((favIcon) => favIconUrl?.startsWith(favIcon))
  )
    return favIconUrl;

  return defaultFavIcon(url);
}

// Get a fall-back icon for some urls
export const getFavIconType = (url: string) => {
  for (const tab in favIconDisallowedList) {
    if (url.includes(tab)) return favIconDisallowedList[tab] as Icon;
  }

  return 'global';
};

const defaultFavIcon = (url: string) =>
  isFirefox ? null : `${runtimeURL}_favicon/?pageUrl=${url}&size=16`;
