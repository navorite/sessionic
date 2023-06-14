import browser from 'webextension-polyfill';

declare global {
  type EWindow = browser.Windows.Window;
  type Tab = browser.Tabs.Tab;
  type QueryInfo = browser.Tabs.QueryQueryInfoType;
  type compressOptions = {
    type?: 'image/webp' | 'image/jpeg' | 'image/png';
    quality?: number;
    max_size?: number;
  };
}
