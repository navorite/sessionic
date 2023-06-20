import { sendMessage } from './messages';

let timeout;

export async function setDarkMode(darkMode: boolean, fade?: boolean) {
  sendMessage({ message: 'setDarkMode', darkMode });

  if (timeout) clearTimeout(timeout);

  if (fade) document.body.classList.add('fade');

  document.body.classList.toggle('dark', darkMode);

  document.documentElement.style.colorScheme = darkMode ? 'dark' : 'normal';

  if (fade)
    timeout = setTimeout(() => {
      document.body.classList.remove('fade');
    }, 200);
}
