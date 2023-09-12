import { storage, type Storage } from 'webextension-polyfill';
import type { ESettings, FilterOptions } from '@/lib/types';
import { writable, type Writable } from 'svelte/store';
import { notification, sessions } from '@/lib/stores';
import {
	getStorage,
	setStorage,
	applyTheme,
	log,
	getStorageItem
} from '@/lib/utils';
import { autoSaveDefaults } from '@/lib/constants';
import browser from 'webextension-polyfill';

export const filterOptions: Writable<FilterOptions> = writable({ query: '' });

export const settings = (() => {
	let loaded: Promise<ESettings>;

	const defaultSettings: ESettings = {
		popupView: true,
		darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
		selectionId: 'current',
		discarded: true,
		urlFilterList: null,
		autoSave: autoSaveDefaults.autoSave,
		autoSaveMaxSessions: autoSaveDefaults.autoSaveMaxSessions,
		autoSaveTimer: autoSaveDefaults.autoSaveTimer
	};

	const { subscribe, set, update } = writable(defaultSettings);

	init();

	storage.local.onChanged.addListener(onStorageChange);

	async function init() {
		if (loaded) {
			await loaded;
			return;
		}

		log.info('[settings.init]');

		loaded = getStorage(defaultSettings);

		const settings = await loaded;

		set(settings);

		applyTheme(settings.darkMode, false);

		loaded = Promise.resolve({} as ESettings);

		const updated = await getStorageItem('updated' as keyof ESettings, false);

		if (updated) {
			notification.set({
				msg: `Sessionic was updated to v${
					browser.runtime.getManifest().version
				}`,
				type: 'info'
			});

			setStorage({ updated: false });
		}
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
