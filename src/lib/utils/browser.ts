import browser from 'webextension-polyfill';

type Window = browser.Windows.Window;
type Tab = browser.Tabs.Tab;
type QueryInfo = browser.Tabs.QueryQueryInfoType;
type WindowInfo = browser.Windows.GetAllGetInfoType;

// Get current active tab

export async function getCurrentTab(): Promise<Tab> {
  return (await getCurrentWindowTabs({ active: true }))[0];
}

// Get all tabs of current window

export async function getCurrentWindowTabs(
  optionalQuery: QueryInfo = {}
): Promise<Tab[]> {
  return getTabs({ ...optionalQuery, currentWindow: true });
}

// Get all tabs that match a query obj

export async function getTabs(queryInfo: QueryInfo = {}): Promise<Tab[]> {
  return browser?.tabs?.query?.(queryInfo);
}

// Get windows object that match that obj values

export async function getAllWindows(
  getInfo: WindowInfo = { populate: true, windowTypes: ['normal'] }
) {
  return browser?.windows?.getAll?.(getInfo);
}
