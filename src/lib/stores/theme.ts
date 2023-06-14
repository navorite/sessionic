import { getDarkMode, setDarkMode } from '@utils/extension';
import storage from '@utils/storage';
import { writable } from 'svelte/store';

const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;

export default (() => {
  const { subscribe, set, update } = writable(isDarkSystem);

  getDarkMode().then((dark: boolean) => {
    if (typeof dark === 'undefined') storage?.set({ dark: isDarkSystem });
    setDarkMode(dark ?? isDarkSystem, true);
    set(dark ?? isDarkSystem);
  });

  return {
    subscribe,
    switch() {
      update((dark: boolean) => {
        dark = !dark;
        setDarkMode(dark, true);
        storage?.set({ dark });
        return dark;
      });
    },
  };
})();
