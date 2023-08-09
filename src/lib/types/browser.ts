import browser from 'webextension-polyfill';

export type EWindow = browser.Windows.Window;
export type ETab = browser.Tabs.Tab;
export type QueryInfo = browser.Tabs.QueryQueryInfoType;
export type compressOptions = {
	type?: 'image/webp' | 'image/jpeg' | 'image/png';
	quality?: number;
	max_size?: number;
};
