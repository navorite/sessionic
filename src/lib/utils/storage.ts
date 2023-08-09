import { storage } from 'webextension-polyfill';
import type { ESettings } from '../types';

export async function getStorageItem<K extends keyof ESettings>(key: K) {
	return (await storage.local.get(key))[key] as ESettings[K];
}

export async function getStorage<T extends ESettings>(keys: T) {
	return (await storage.local.get(keys)) as T;
}

export function setStorage<T>(items: Partial<T>) {
	return storage.local.set(items);
}
