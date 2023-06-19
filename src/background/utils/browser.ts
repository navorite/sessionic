import browser from 'webextension-polyfill';
import { compress as compressLZ } from 'lz-string';
import { isFirefox, tabAttr } from './constants';

export const compress_options: compressOptions = {
  type: 'image/webp',
  quality: 0.7,
  max_size: 20,
};

// Get current active tab
export async function getCurrentTab(): Promise<ETab> {
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
    if (tab.favIconUrl) {
      //isFirefox &&
      // (tab.favIconUrl = await compress.icon(tab.favIconUrl, options));

      tab.favIconUrl = compressLZ(tab.favIconUrl);
    }

    for (const prop in tab) {
      if (!tabAttr.includes(prop)) delete tab[prop];
    }
  }

  return tabs;
}

// Get current session - TODO: arg: options?: compressOptions goes undefined after 1st call
export async function getSession() {
  const session: ESession = {
    title: 'Current Session',
    windows: [],
    id: 'current',
    dateSaved: null,
    dateModified: null,
    tabsNumber: 0,
  };

  session.windows = await browser?.windows?.getAll();

  for (const window of session.windows) {
    window.tabs = await getTabs(
      {
        windowId: window.id,
        url: ['*://*/*', 'file:///*/*', 'ftp://*/*', 'chrome://*/*'],
      },
      compress_options
    ); //TODO: firefox New Tab doesn't show - add filter option to urls

    session.tabsNumber += window.tabs.length;
  }

  return session;
}

//TODO support discarded in chromium, fix popup open bug in firefox
export async function openInCurrentWindow(window: EWindow) {
  window.id = (await browser?.windows?.getCurrent()).id;

  for (const tab of window?.tabs) {
    createTab(tab, window.id);
  }
}

export async function openInNewWindow(window: EWindow) {
  const windowId = (
    await browser?.windows?.create({
      incognito: window.incognito,
      ...(window.state !== 'normal'
        ? { state: window.state }
        : {
            top: window.top,
            left: window.left,
            height: window.height,
            width: window.width,
          }),
    })
  ).id;

  for (const tab of window?.tabs) {
    createTab(tab, windowId);
  }
}

export async function openSession(session: ESession, newWindow?: boolean) {
  for (const window of session.windows) {
    if (newWindow) {
      openInNewWindow(window);
      continue;
    }

    openInCurrentWindow(window);
  }
}

export async function createTab(
  tab: ETab,
  windowId?: number,
  discarded?: boolean
) {
  const {
    url,
    active,
    pinned,
    cookieStoreId,
    isInReaderMode,
    mutedInfo,
    incognito,
  } = tab;

  return browser?.tabs?.create({
    url,
    active,
    windowId: windowId ?? tab.windowId,
    pinned,
    ...(isFirefox && {
      discarded: discarded ?? !active,
      openInReaderMode: isInReaderMode,
      muted: mutedInfo.muted,
      ...(!incognito && { cookieStoreId }),
    }),
  });
}
