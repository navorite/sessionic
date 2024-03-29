import type { ESession, ETab, QueryInfo, compressOptions } from '@/lib/types';
import browser from 'webextension-polyfill';
import { compress as compressLZ } from 'lz-string';
import { compress_options, tabAttr } from '@/lib/constants/shared';
import { getExtensionURL } from '@/lib/utils/extension';
import { compress } from '@utils/compress';

// Get current active tab
export async function getCurrentTab() {
  return (await getWindowTabs({ active: true }))[0];
}

// Get all tabs of current window
export async function getWindowTabs(
  optionalQuery: QueryInfo = {}
): Promise<ETab[]> {
  return getTabs({ ...optionalQuery, currentWindow: true });
}

// Get all tabs that match a query obj - TODO: (Firefox) => compress favicon string even further?
export async function getTabs(
  queryInfo: QueryInfo = {},
  options?: compressOptions
): Promise<ETab[]> {
  const tabs = await browser?.tabs?.query(queryInfo);

  for (const tab of tabs) {
    if (!tab.url) continue;

    if (tab.url.startsWith(getExtensionURL('discarded')))
      tab.url = replaceDiscardedURL(tab.url);

    if (tab.favIconUrl) {
      if (compress)
        tab.favIconUrl = await compress.icon(tab.favIconUrl, options);

      tab.favIconUrl = compressLZ(tab.favIconUrl);
    }

    for (const prop in tab) {
      if (!tabAttr.includes(prop)) delete tab[prop as keyof ETab];
    }
  }

  return tabs;
}

// Get current session - TODO: arg: options?: compressOptions goes undefined after 1st call
export async function getSession(queryInfo?: QueryInfo) {
  const session: ESession = {
    title: 'Current Session',
    windows: [],
    id: 'current',
    dateSaved: undefined,
    dateModified: undefined,
    tabsNumber: 0
  };

  if (!queryInfo) queryInfo = {};

  session.windows = await browser?.windows?.getAll();

  for (const window of session.windows) {
    queryInfo.windowId = window.id;

    window.tabs = await getTabs(queryInfo, compress_options);

    session.tabsNumber += window.tabs.length;
  }

  return session;
}

function replaceDiscardedURL(url: string) {
  const searchParams = new URLSearchParams(new URL(url).search);

  return decodeURIComponent(searchParams.get('url')!);
}
