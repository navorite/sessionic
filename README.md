# ![Tabify icon](./public/icons/tabify-48.png) Tabify

A web extension to easily save sessions and manage them.

**Full View**
![Screenshot of the extension in Full View mode](./assets/tabify-fullview.png)

**Popup View**
![Screenshot of the extension in Popup mode](./assets/tabify-popup.png)

## Features

1. Ability to save and manage sessions and
2. Ability to export and import sessions for backup.
3. Built with performance in mind
4. Low memory usage
5. Doesn't consume RAM or CPU when not in use.
6. Cross-browser support. (Firefox, Chrome, Edge, and Opera)

## Build locally

1. Clone the repository `git clone https://github.com/navorite/tabify.git`
2. Run `pnpm install`
3. Configure the extension manifest.json in `./src/public/` folder
4. Run `pnpm run build`

## Adding to browser

For Firefox:

1. Run Developer Edition
2. Go to Remote Debugging
3. Add an unsigned extension
4. Open the `./dist/folder`

For Chromium:

1. Enable Debugging mode
2. Add an unsigned extension
3. Open the `./dist/` folder

## Donate

[![Donate using Ko-fi.com](./public/images/donate_kofi.webp)](https://ko-fi.com/navorite)

[![Donate using Patreon.com](./assets/become-a-patron-button.webp)](https://www.patreon.com/navorite)

[![Donate using PayPal.com](./assets/paypal-donate-button.png)](https://paypal.me/navorite)
