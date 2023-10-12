import type { Icon, Page } from '@/lib/types';
import browser from 'webextension-polyfill';
import { isFirefox, runtimeURL } from '@constants/shared';
import { tabType } from '@constants/shared';

export function isExtensionViewed() {
	return document.visibilityState === 'visible';
}

export function isExtensionReady() {
	return document.readyState === 'complete';
}

// Open the Options page
export function openOptions() {
	return openExtensionPage('options');
}

// Open the Popup page
export function openFullView() {
	return openExtensionPage('popup', '?tab=true');
}

// Open an extension page, under a unique ID to prevent duplicate tabs
// candidate: close already open full view pages if it exists
export async function openExtensionPage(page: Page, query?: string) {
	const [t1, t2] = await Promise.all([
		browser.tabs.query({ active: true, currentWindow: true }),
		browser.tabs.query({
			url: getExtensionURL(page, query)
		})
	]);

	if (!t1.length) return;

	const currentTab = t1[0]!;

	if (!t2.length)
		browser.tabs.create({
			url: getExtensionURL(page, query),
			index: currentTab.index
		});
	else {
		const extensionTab = t2[0]!;

		if (
			(Math.abs(currentTab.index - extensionTab.index) >= 15 && isFirefox) ||
			extensionTab.windowId !== currentTab.windowId
		)
			browser.tabs.move(extensionTab.id!, {
				index: currentTab.index,
				windowId: currentTab.windowId
			});

		browser.tabs.update(extensionTab.id, { active: true, highlighted: true });
	}
}

// Get runtime URL for a page in the extension
export function getExtensionURL(page?: Page, query: string = '') {
	return `${runtimeURL}src/${page}/index.html${query}`;
}

export function getTabType(url: string): Icon {
	for (const tab in tabType) {
		if (url.includes(tab)) return tabType[tab] as Icon;
	}

	return 'tab';
}
