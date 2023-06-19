import { sendMessage } from '@utils/messages';
import { setDarkMode } from '@utils/theme';
import { writable } from 'svelte/store';

const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;

export default (() => {
  const { subscribe, set, update } = writable(isDarkSystem);

  async function init() {
    const darkMode = await sendMessage({ message: 'getDarkMode' });

    setDarkMode(darkMode ?? isDarkSystem, true);

    set(darkMode ?? isDarkSystem);
  }

  init();

  return {
    subscribe,
    switch() {
      update((darkMode: boolean) => {
        darkMode = !darkMode;
        setDarkMode(darkMode, true);
        return darkMode;
      });
    },
  };
})();
