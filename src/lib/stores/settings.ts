import log from '@utils/log';
import { getStorage, setStorage } from '@utils/storage';
import { applyTheme } from '@utils/theme';
import { writable, type Writable } from 'svelte/store';
import { storage, type Storage } from 'webextension-polyfill';
import sessions from './sessions';

export const filterOptions: Writable<FilterOptions> = writable({ query: '' });

let loaded = false;

const defaultSettings: ESettings = {
	popupView: true,
	darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
	selectionId: 'current',
	discarded: true,
	urlFilterList: ['<all_urls>']
};

const settings = () => {
	const { subscribe, set, update } = writable(defaultSettings);

	init();

	if (!storage.local.onChanged.hasListener(onStorageChange))
		storage.local.onChanged.addListener(onStorageChange);

	async function init() {
		if (loaded) return log.info('[settings.init] already called');

		const settings = await getStorage(defaultSettings);

		set(settings);

		loaded = true;

		applyTheme(settings.darkMode, false);
	}

	function onStorageChange(changes: Storage.StorageAreaOnChangedChangesType) {
		update((settings) => {
			for (const change in changes) {
				settings[change] = changes[change]?.newValue ?? defaultSettings[change];

				if (change === 'darkMode') applyTheme(settings[change], true);

				if (change === 'selectionId') sessions.selection.selectById(settings[change]);
			}
			return settings;
		});
	}

	function clear() {
		return storage.local.clear();
	}

	return {
		subscribe,
		init,
		changeSetting<K extends keyof ESettings>(key: K, value: ESettings[K]) {
			setStorage({ [key]: value });

			update((settings: ESettings) => {
				settings[key] = value;

				return settings;
			});
		},
		clear
	};
};

export default settings();
