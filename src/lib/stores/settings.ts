import { i18n, storage, type Storage } from 'webextension-polyfill';
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

export const filterOptions: Writable<FilterOptions> = writable({
  query: '',
  sortMethod: 'newest',
  tagsFilter: '__all__'
});

export const settings = (() => {
  let loaded: Promise<ESettings>;

  const defaultSettings: ESettings = {
    popupView: true,
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    selectionId: 'current',
    discarded: true,
    urlFilterList: undefined,
    autoSave: autoSaveDefaults.autoSave,
    autoSaveMaxSessions: autoSaveDefaults.autoSaveMaxSessions,
    autoSaveTimer: autoSaveDefaults.autoSaveTimer,
    tags: {},
    doNotAskForTitle: true,
    exportCompressed: true,
    excludePinned: true,
    sortMethod: 'newest',
    tagsFilter: '__all__'
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

    filterOptions.set({
      sortMethod: settings.sortMethod,
      tagsFilter: settings.tagsFilter,
      query: ''
    });

    loaded = Promise.resolve({} as ESettings);

    const updated = await getStorageItem('updated' as keyof ESettings, false);

    if (updated) {
      notification.set({
        msg: i18n.getMessage('notifyExtUpdate', __EXT_VER__),
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

        if (change === 'sortMethod' || change === 'tagsFilter')
          filterOptions.update((val) => {
            (val[
              change as keyof FilterOptions
            ] as FilterOptions[keyof FilterOptions]) = settings[change];

            return val;
          });
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
