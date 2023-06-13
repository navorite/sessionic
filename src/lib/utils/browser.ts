import browser from 'webextension-polyfill';
import type { QueryInfo, Tab, Window, compressOptions } from '../types/browser';
import type { Session } from '../types/extension';
import {
  compress_options,
  isFirefox,
  tabAttr,
  tabAttr_env,
} from '@constants/env';
import compress from './compress';
import { compress as compressLZ } from 'lz-string';

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

// Get all tabs that match a query obj - TODO: (Firefox) => compress favicon string even further?
export async function getTabs(
  queryInfo: QueryInfo = {},
  options?: compressOptions
): Promise<Tab[]> {
  const tabs = await browser?.tabs?.query(queryInfo);

  for (const tab of tabs) {
    if (tab.favIconUrl) {
      if (isFirefox) {
        tab.favIconUrl = await compress.icon(tab.favIconUrl, options);
      }

      tab.favIconUrl = compressLZ(tab.favIconUrl);
    }
    for (const prop in tab) {
      if (!tabAttr.includes(prop) && !tabAttr_env.includes(prop))
        delete tab[prop];
    }
  }

  return tabs;
}

// Get current session (Either all windows or current window) - TODO: arg: options?: compressOptions goes undefined after 1st call
export async function getSession() {
  let session = { title: 'Current Session', windows: [] } as Session;
  let tabsNumber = 0;

  const windows = await browser?.windows?.getAll();

  for (const window of windows) {
    window.tabs = await getTabs(
      { windowId: window.id, url: '*://*/*' },
      compress_options
    );

    tabsNumber += window.tabs.length;
    session.windows.push(window);
  }

  session.tabsNumber = tabsNumber;

  return session;
}

//TODO support discarded in chromium, fix popup open bug in firefox
export async function openWindow(window: Window) {
  const windowId = (
    await browser?.windows?.create({
      focused: window.focused,
      height: window.height,
      width: window.width,
      incognito: window.incognito,
      top: window.top,
      left: window.left,
    })
  ).id;

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
