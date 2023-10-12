import type { ESettings } from '@/lib/types';
import { storage } from 'webextension-polyfill';

export async function getStorageItem<K extends keyof ESettings>(
  key: K,
  defaultVal: ESettings[K]
) {
  return ((await storage.local.get(key))[key] as ESettings[K]) ?? defaultVal;
}

export async function getStorage<T extends ESettings>(
  keys: T | null | undefined
) {
  return (await storage.local.get(keys)) as T;
}

export function setStorage<T>(items: Partial<T>) {
  return storage.local.set(items);
}
