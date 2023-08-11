import { storage, type Storage } from 'webextension-polyfill';
import type { ESettings, FilterOptions } from '@/lib/types';
import { writable, type Writable } from 'svelte/store';
import { sessions } from '@/lib/stores';
import { getStorage, setStorage } from '@utils/storage';
import { log, applyTheme } from '@/lib/utils';

export const filterOptions: Writable<FilterOptions> = writable({ query: '' });

let loaded = false;

const defaultSettings: ESettings = {
	popupView: true,
	darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
	selectionId: 'current',
	discarded: true,
	urlFilterList: null
};

export const settings = (() => {
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
				(settings[change as keyof ESettings] as ESettings[keyof ESettings]) =
					changes[change]?.newValue ??
					defaultSettings[change as keyof ESettings];

				if (change === 'darkMode') applyTheme(settings[change], true);

				if (change === 'selectionId')
					sessions.selection.selectById(settings[change]);
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
})();
