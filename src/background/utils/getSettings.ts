import { storage } from './constants';

export async function getDarkMode() {
  return (await storage?.get('darkMode'))?.darkMode;
}

export async function getIsPopupEnabled() {
  return (await storage.get('popupView'))?.popupView ?? true;
}

export async function getSettings() {
  const darkMode = (await getDarkMode()) ?? true;
  const isPopupEnabled = (await getIsPopupEnabled()) ?? true;

  return { isPopupEnabled, darkMode };
}
