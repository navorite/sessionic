import { runtimeURL } from '@constants/env';
import browser from 'webextension-polyfill';

export function isExtensionViewed() {
	return document.visibilityState === 'visible';
}

export function isExtensionReady() {
	return document.readyState === 'complete';
}

// Get runtime URL for a page in the extension
export function getExtensionURL(page?: Page, query: string = '') {
	return `${runtimeURL}src/${page}/index.html${query}`;
}

// Open the extension Options page, under a unique ID to prevent duplicate tabs
export function openOptions() {
	return browser?.runtime?.openOptionsPage();
}

// Open the extension Popup page, under a unique ID to prevent duplicate tabs
export async function openFullView() {
	const tabs = await browser.tabs.query({
		url: [browser.runtime.getURL('src/popup/index.html?tab=true')]
	});

	if (!tabs.length)
		browser.tabs.create({
			url: browser.runtime.getURL('src/popup/index.html?tab=true')
		});
	else {
		browser.windows.update(tabs[0].windowId, { focused: true });
		browser.tabs.update(tabs[0].id, {
			active: true,
			highlighted: true
		});
	}
}
