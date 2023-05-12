import browser from 'webextension-polyfill';

type Tab = browser.Tabs.Tab;
type QueryInfo = browser.Tabs.QueryQueryInfoType;

// Get current active tab

export async function getCurrentTab(): Promise<Tab[]> {
  return await getWindowTabs({ active: true });
}

// Get all tabs of current window

export async function getWindowTabs(optionalQuery?: QueryInfo): Promise<Tab[]> {
  return await getTabs({ ...optionalQuery, currentWindow: true });
}

// Get all tabs that match a query obj

export async function getTabs(queryInfo?: QueryInfo): Promise<Tab[]> {
  return await browser?.tabs?.query(queryInfo);
}
