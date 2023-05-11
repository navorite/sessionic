import browser from 'webextension-polyfill';

type QueryInfo = browser.Tabs.QueryQueryInfoType;

// Get current active tab
export async function getCurrentTab() {
  return await getCurrentTabs({ active: true });
}

// Get all tabs of current window
export async function getCurrentTabs(optionalQuery?: QueryInfo) {
  return await getTabs({ ...optionalQuery, currentWindow: true });
}

// Get all tabs matched using a query obj
export async function getTabs(queryInfo?: QueryInfo) {
  return await browser?.tabs?.query(queryInfo);
}
