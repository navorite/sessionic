import type {
	ESB,
	ESBImport,
	ESession,
	ETSM,
	ETab,
	EWindow
} from '@/lib/types';
import { tabAttr } from '@/lib/constants';
import { compress as compressLZ } from 'lz-string';

export async function convertSessions(target: ETSM[] | ESBImport) {
	if (!target) return;

	const converted = await (isImportESB(target)
		? convertESBSessions(target.sessions)
		: convertETSMSessions(target));

	return converted;
}

async function convertESBSessions(target: ESB[]) {
	const converted: ESession[] = [];

	for (let i = 0; i < target.length; i++)
		converted[i] = await convertESBKeys(target[i]!);

	return converted;
}

async function convertETSMSessions(target: ETSM[]) {
	const converted: ESession[] = [];

	for (let i = 0; i < target.length; i++)
		converted[i] = await convertETSMKeys(target[i]!);

	return converted;
}

async function convertESBKeys(target: ESB): Promise<ESession> {
	const converted = await convertESBWindowsObj(target);

	return {
		title: target.name,
		windows: converted.windows,
		dateSaved: new Date(target.created).getTime(),
		dateModified: new Date(target.modified).getTime(),
		tabsNumber: converted.tabsNumber,
		id: crypto.randomUUID()
	};
}

async function convertETSMKeys(target: ETSM): Promise<ESession> {
	return {
		title: target.name,
		windows: await convertETSMWindowsObj(target),
		dateSaved: target.date,
		dateModified: target.lastEditedTime,
		tabsNumber: target.tabsNumber,
		id: target.id
	};
}

async function convertESBWindowsObj(
	target: ESB
): Promise<{ windows: EWindow[]; tabsNumber: number }> {
	let tabsNumber = 0;

	for (const window of target.windows) {
		if (!window.tabs) continue;

		for (let i = 0; i < window.tabs.length; i++) {
			window.tabs[i] = await sanitizeTab(window.tabs[i]!);
			tabsNumber++;
		}
	}

	return { windows: target.windows, tabsNumber };
}

async function convertETSMWindowsObj(target: ETSM): Promise<EWindow[]> {
	const windowKeys = Object.keys(target.windows);
	const windows: EWindow[] = Array(windowKeys.length);

	for (let i = 0; i < windows.length; i++) {
		const windowKey = windowKeys[i];

		if (!windowKey) continue;

		windows[i] = target.windowsInfo[windowKey] as EWindow;

		const tabKeys = Object.keys(target.windows[windowKey]!);

		windows[i]!.tabs = Array(tabKeys.length);

		for (let t = 0; t < tabKeys.length; t++) {
			const tabKey = tabKeys[t]!;

			const targetTab = target.windows[windowKey]![tabKey]!;

			windows[i]!.tabs![t] = await sanitizeTab(targetTab);
		}
	}

	return windows;
}

export async function sanitizeTab(targetTab: ETab) {
	const tab = {} as ETab;

	for (const key in targetTab) {
		if (checkTabAttr(key)) {
			(tab[key] as ETab[keyof ETab]) = targetTab[key];
		}
	}

	if (tab.favIconUrl && tab.url) {
		// if (compress)
		// 	tab.favIconUrl = await compress.icon(tab.favIconUrl, compress_options); -- TODO: Implement this in a better method

		tab.favIconUrl = compressLZ(tab.favIconUrl);
	}

	return tab;
}

export function checkTabAttr(key: string): key is keyof ETab {
	return tabAttr.includes(key);
}

function isImportESB(target: ESBImport | ETSM[]): target is ESBImport {
	if ('sessions' in target) return true;

	return false;
}
