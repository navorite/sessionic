import browser from 'webextension-polyfill';

export type Window = browser.Windows.Window;
export type Tab = browser.Tabs.Tab;
export type QueryInfo = browser.Tabs.QueryQueryInfoType;
export type compressOptions = {
  type?: 'image/webp' | 'image/jpeg' | 'image/png';
  quality?: number;
  max_size?: number;
};
