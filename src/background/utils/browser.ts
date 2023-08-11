import browser from 'webextension-polyfill';
import { decompress as decompressLZ } from 'lz-string';
import type { EWindow, ESession, ETab } from '@/lib/types';

const isFirefox = !!browser?.runtime?.getBrowserInfo;

export async function openInCurrentWindow(
	window: EWindow,
	discarded?: boolean
) {
	if (!window.tabs?.length) return;

	window.id = (await browser.windows.getCurrent()).id;

	for (const tab of window.tabs) {
		createTab(tab, window.id, discarded);
	}
}

export async function openInNewWindow(window: EWindow, discarded?: boolean) {
	if (!window.tabs?.length) return;

	const windowId = (
		await browser.windows.create({
			incognito: window.incognito,
			...(window.state !== 'normal'
				? { state: window.state }
				: {
						top: window.top,
						left: window.left,
						height: window.height,
						width: window.width
				  })
		})
	).id;

	for (const tab of window.tabs) {
		createTab(tab, windowId, discarded);
	}
}

export async function openSession(
	session: ESession,
	newWindow?: boolean,
	discarded?: boolean
) {
	for (const window of session.windows) {
		if (newWindow) {
			openInNewWindow(window, discarded);
			continue;
		}

		openInCurrentWindow(window, discarded);
	}
}

export async function createTab(
	tab: ETab,
	windowId?: number,
	discarded?: boolean
) {
	const {
		url,
		title,
		favIconUrl,
		active,
		pinned,
		cookieStoreId,
		isInReaderMode,
		mutedInfo,
		incognito
	} = tab;

	if (!url) return;

	return browser?.tabs?.create({
		url:
			isFirefox || active || !discarded
				? url
				: `src/discarded/index.html?title=${encodeURIComponent(
						title!
				  )}&url=${encodeURIComponent(url)}&icon=${encodeURIComponent(
						decompressLZ(favIconUrl ?? '')
				  )}`,
		active,
		windowId: windowId ?? tab.windowId,
		pinned,
		...(isFirefox && {
			title,
			discarded: discarded ?? !active,
			openInReaderMode: isInReaderMode,
			muted: mutedInfo?.muted,
			...(!incognito && { cookieStoreId })
		})
	});
}
