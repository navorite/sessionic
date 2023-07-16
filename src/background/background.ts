import browser from 'webextension-polyfill';
import { createTab, openInNewWindow, openSession } from './utils/browser';
import { openFullView, openOptions } from './utils/extension';
import { storage } from './utils/constants';
import {
  getDarkMode,
  getIsPopupEnabled,
  getSettings,
} from './utils/getSettings';

// browser.storage.onChanged.addListener(async () => {
//   // console.log(changes, areaName);
//   // const settingsValue = await getSettings();
//   // settings.isPopupEnabled = settingsValue.isPopupEnabled;
//   // settings.darkMode = settingsValue.darkMode;
// });

browser.runtime.onMessage.addListener((request, sender) => {
  switch (request.message) {
    case 'openPopup':
      const isPopupEnabled = getIsPopupEnabled();
      isPopupEnabled.then((result) => {
        if (!result) openFullView();
      });

      return isPopupEnabled;

    case 'openFullView':
      openFullView();
      break;

    case 'openOptions':
      openOptions();
      break;

    case 'openInNewWindow':
      openInNewWindow(request.window);
      break;

    case 'createTab':
      createTab(request.tab);
      break;

    case 'openSession':
      openSession(request.session, true);
      break;

    case 'getDarkMode':
      return getDarkMode();

    case 'getIsPopupEnabled':
      return getIsPopupEnabled();

    case 'setDarkMode':
      storage?.set({ darkMode: request.darkMode });
      break;

    case 'getSettings':
      return getSettings();

    case 'setPopupEnabled':
      storage?.set({ popupView: request.isPopupEnabled });
      break;
  }
});
