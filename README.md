<div align='center'>

![Sessionic icon](./public/favicons/96.png)

# Sessionic

A web extension to easily save sessions and manage them.

[![Latest GitHub release](https://img.shields.io/github/v/release/navorite/sessionic?logo=github&label=Release)](https://github.com/navorite/sessionic/releases)
[![Mozilla Add-on Version](https://img.shields.io/amo/v/sessonic%40navorite?logo=firefox&label=Firefox)](https://addons.mozilla.org/en-US/firefox/addon/sessionic)
[![License](https://img.shields.io/badge/License-AGPL--3.0-blue)](./LICENSE)
[![Discord Server](https://img.shields.io/badge/Chat-Discord-7289da?logo=discord&logoColor=7289da)](https://discord.gg/HwZ65UBg)
[![Support me using Ko-fi](https://img.shields.io/badge/Sponsor-Ko--fi-FF5E5B?logo=kofi&logoColor=FF5E5B)](https://ko-fi.com/navorite)
[![Support me using Patreon](https://img.shields.io/badge/Sponsor-Patreon-FF424D?logo=patreon)](https://www.patreon.com/navorite)
[![Support me using PayPal](https://img.shields.io/badge/Sponsor-Paypal-00457C?logo=paypal)](https://www.paypal.me/navorite)

**Popup View**
| Light | Dark |
| :------------------------------------------------------: | :-------------------------------------------------------------: |
| ![Screenshot of the extension popup in Light mode](.github/popup-light.png) | ![Screenshot of the extension popup in Dark mode](.github/popup.png) |

**Full View**
| Light | Dark |
| :------------------------------------------------------: | :-------------------------------------------------------------: |
| ![Screenshot of the extension Full View in Light mode](.github/fullview-light.png) | ![Screenshot of the extension Full View in Dark mode](.github/fullview.png) |

</div>

---

## Features

- Save and manage sessions
- Import and export sessions
- Save sessions automatically based on an interval
- Filter URL list to track using [match patterns](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns)
- Modern UI with Light and Dark mode support
- Focused on performance and lower RAM usage
- Cross-browser support (Firefox, Chrome, Edge, and Opera)
- Compatible with Session Buddy and Tab Session Manager

## Download

[![Firefox Add-on Link](https://extensionworkshop.com/assets/img/documentation/publish/get-the-addon-178x60px.dad84b42.png)](https://addons.mozilla.org/en-US/firefox/addon/sessionic)

## Build locally

1. Clone the repository `git clone https://github.com/navorite/sessionic.git`
2. Run `pnpm install`
3. Run `pnpm run build` for Chromium `pnpm run build-ff` for Firefox

## Running in browser

1. Build the extension locally
2. Run `pnpm run open` for Chromium or `pnpm run open:ff` for Firefox
