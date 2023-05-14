import browser from 'webextension-polyfill';
import type { QueryInfo, Tab, WindowInfo } from '../types/browser';
import type { Session } from '../types/extension';

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

export async function openWindow(tabsURL: string[]) {
  return browser?.windows?.create({ url: tabsURL });
}
