import { sendMessage } from './messages';

export async function setDarkMode(darkMode: boolean, fade?: boolean) {
  if (fade) document.body.classList.add('fade'); // Subject to change
  document.body.classList.toggle('dark', darkMode);
  document.documentElement.style.colorScheme = darkMode ? 'dark' : 'normal';

  sendMessage({ message: 'setDarkMode', darkMode });
}
