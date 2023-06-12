import { getDarkMode, setDarkMode } from '@utils/extension';
import storage from '@utils/storage';
import { writable } from 'svelte/store';

const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;

export default (() => {
  const { subscribe, set, update } = writable(isDarkSystem);

  return {
    subscribe,
    init() {
      getDarkMode().then((dark: boolean) => {
        if (typeof dark === 'undefined') storage?.set({ dark: isDarkSystem });
        setDarkMode(dark ?? isDarkSystem);
        set(dark ?? isDarkSystem);
      });
    },
    switch() {
      update((dark: boolean) => {
        dark = !dark;
        setDarkMode(dark);
        storage?.set({ dark });
        return dark;
      });
    },
  };
})();
