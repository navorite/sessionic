import browser from 'webextension-polyfill';
import type { Page } from '../types/navigation';

const ROOT_PAGE = './src/';

// Get the URL of the extension page(ex. popup becomes /src/popup)

function getExtensionURL(page?: Page) {
  return `${ROOT_PAGE}${page}/index.html`;
}

// Get runtime URL for a page in the extension - Ex. /src/popup/ becomes moz:ext-identifier/src/popup/

export function getExtensionRuntimeURL(page?: Page) {
  return browser?.runtime?.getURL(getExtensionURL(page));
}
