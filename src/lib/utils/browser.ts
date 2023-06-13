import browser from 'webextension-polyfill';
import type { QueryInfo, Tab, Window } from '../types/browser';
import type { Session } from '../types/extension';
import { isFirefox } from '@constants/env';
import compress from './compress';
import { tabAttr, tabAttr_firefox, tabAttr_chrome } from '@constants/constants';

// Get current active tab
export async function getCurrentTab(): Promise<Tab> {
  return (await getWindowTabs({ active: true }))[0];
}

// Get all tabs of current window
export async function getWindowTabs(
  optionalQuery: QueryInfo = {}
): Promise<Tab[]> {
  return getTabs({ ...optionalQuery, currentWindow: true });
}

// Get all tabs that match a query obj
export async function getTabs(queryInfo: QueryInfo = {}): Promise<Tab[]> {
  const tabs = await browser?.tabs?.query(queryInfo);

  const totalLength = { before: 0, url: 0, after: 0, size: 24, quality: 0.2 }; // measuring purpose
  for (const tab of tabs) {
    if (isFirefox && tab.favIconUrl) {
      totalLength.before += tab.favIconUrl.length;
      tab.favIconUrl = await compress.icon(tab.favIconUrl, {
        type: 'image/webp',
        quality: totalLength.quality,
        max_size: totalLength.size,
      });
      totalLength.after += tab.favIconUrl.length;

      totalLength.url += compress.optimizeFavIcons(tab.url).length;
    }

    for (const prop in tab) {
      if (
        !tabAttr.includes(prop) &&
        (isFirefox
          ? !tabAttr_firefox.includes(prop)
          : !tabAttr_chrome.includes(prop))
      )
        delete tab[prop];
    }
  }

  console.log(totalLength);

  return tabs;
}

// Get current session (Either all windows or current window)
export async function getSession() {
  let session = { title: 'Current Session', windows: [] } as Session;
  let tabsNumber = 0;

  const windows = await browser?.windows?.getAll();

  for (const window of windows) {
    window.tabs = await getTabs({ windowId: window.id, url: '*://*/*' });
    tabsNumber += window.tabs.length;
    session.windows.push(window);
  }

  session.tabsNumber = tabsNumber;

  return session;
}

//TODO support discarded in chromium, fix popup open bug in firefox
export async function openWindow(window: Window) {
  const windowId = (await browser?.windows?.create({ focused: window.focused }))
    .id;

  for (const { url, active } of window?.tabs) {
    browser?.tabs?.create({
      url,
      active,
      windowId,
      ...(isFirefox && { discarded: !active }),
    });
  }
}

export async function openSession(session: Session) {
  for (const window of session.windows) {
    openWindow(window);
  }
}
