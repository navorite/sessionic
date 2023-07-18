import browser from 'webextension-polyfill';
import { createTab, openInNewWindow, openSession } from './utils/browser';

browser.runtime.onMessage.addListener((request) => {
  switch (request.message) {
    case 'openInNewWindow':
      openInNewWindow(request.window);
      break;

    case 'createTab':
      createTab(request.tab);
      break;

    case 'openSession':
      openSession(request.session, true);
      break;
  }
});
