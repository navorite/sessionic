<div align='center'>

![Sessionic icon](./public/favicons/96.png)

# Sessionic

A web extension to save, manage and restore sessions and tabs.

[![Mozilla Add-on version](https://img.shields.io/amo/v/sessionic?logo=firefoxbrowser&label=Firefox)](https://addons.mozilla.org/en-US/firefox/addon/sessionic/)
[![Chrome Extension version](https://img.shields.io/chrome-web-store/v/mdakbhkahkmdafnfhdikbddkngcbhenc?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI%2BPHBhdGggZmlsbD0iI0ZGRiIgZD0iTTEyOC4wMDMgMTk5LjIxNmMzOS4zMzUgMCA3MS4yMjEtMzEuODg4IDcxLjIyMS03MS4yMjNjMC0zOS4zMzUtMzEuODg2LTcxLjIyMy03MS4yMjEtNzEuMjIzYy0zOS4zMzUgMC03MS4yMjIgMzEuODg4LTcxLjIyMiA3MS4yMjNjMCAzOS4zMzUgMzEuODg3IDcxLjIyMyA3MS4yMjIgNzEuMjIzWiIvPjxwYXRoIGZpbGw9IiMyMjkzNDIiIGQ9Ik0zNS44OSA5Mi45OTdjLTUuMzEzLTkuMjAzLTExLjU1OC0xOC44NjItMTguNzM2LTI4Ljk3N2ExMjcuOTggMTI3Ljk4IDAgMCAwIDExMC44NTcgMTkxLjk4MWMxMS43OC0xNi41MjMgMTkuNzgtMjguNDM3IDIzLjk5Ni0zNS43NGM4LjA5OS0xNC4wMjggMTguNTczLTM0LjExMiAzMS40MjMtNjAuMjUxdi0uMDE1YTYzLjk5MyA2My45OTMgMCAwIDEtMTEwLjg1Ny4wMTdjLTE3LjQ1My0zMi41NDgtMjkuNjgtNTQuODg3LTM2LjY4My02Ny4wMTVaIi8%2BPHBhdGggZmlsbD0iI0ZCQzExNiIgZD0iTTEyOC4wMDggMjU1Ljk5NkExMjcuOTcyIDEyNy45NzIgMCAwIDAgMjU2IDEyNy45OTdBMTI3Ljk4MyAxMjcuOTgzIDAgMCAwIDIzOC44MzcgNjRjLTI0LjI0OC0yLjM5LTQyLjE0My0zLjU4NS01My42ODYtMy41ODVjLTEzLjA4OCAwLTMyLjEzOSAxLjE5NS01Ny4xNTIgMy41ODVsLS4wMTQuMDFhNjMuOTkzIDYzLjk5MyAwIDAgMSA1NS40NDQgMzEuOTg3YTYzLjk5MyA2My45OTMgMCAwIDEtLjAwMSA2NC4wMWwtNTUuNDIgOTUuOTg5WiIvPjxwYXRoIGZpbGw9IiMxQTczRTgiIGQ9Ik0xMjguMDAzIDE3OC42NzdjMjcuOTg0IDAgNTAuNjY5LTIyLjY4NSA1MC42NjktNTAuNjdjMC0yNy45ODYtMjIuNjg1LTUwLjY3LTUwLjY3LTUwLjY3Yy0yNy45ODMgMC01MC42NjkgMjIuNjg2LTUwLjY2OSA1MC42N3MyMi42ODYgNTAuNjcgNTAuNjcgNTAuNjdaIi8%2BPHBhdGggZmlsbD0iI0UzM0IyRSIgZD0iTTEyOC4wMDMgNjQuMDA0SDIzOC44NGExMjcuOTczIDEyNy45NzMgMCAwIDAtMjIxLjY4NS4wMTVsNTUuNDE5IDk1Ljk5bC4wMTUuMDA4YTYzLjk5MyA2My45OTMgMCAwIDEgNTUuNDE1LTk2LjAxNGwtLjAwMi4wMDFaIi8%2BPC9zdmc%2B&label=Chrome)](https://chrome.google.com/webstore/detail/sessionic/mdakbhkahkmdafnfhdikbddkngcbhenc)
[![Microsoft Edge Add-on Version](https://img.shields.io/badge/dynamic/json?label=Edge&logo=microsoftedge&logoColor=%230078d7&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fopniekmiofodaifalpdfoecpcloliico)](https://microsoftedge.microsoft.com/addons/detail/sessionic/opniekmiofodaifalpdfoecpcloliico)
[![License](https://img.shields.io/badge/License-AGPL--3.0-blue?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xMCA2aDEydjJIMTB6bTAgNGgxMnYySDEwem0wIDE0aDZ2MmgtNnptMC0xMGg2djJoLTZ6Ii8%2BPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTI0IDMwSDhhMi4wMDIgMi4wMDIgMCAwIDEtMi0yVjRhMi4wMDIgMi4wMDIgMCAwIDEgMi0yaDE2YTIuMDAyIDIuMDAyIDAgMCAxIDIgMnYyNGEyLjAwMiAyLjAwMiAwIDAgMS0yIDJaTTggNHYyNGgxNlY0WiIvPjwvc3ZnPg%3D%3D)](./LICENSE)
[![Discord Server](https://img.shields.io/badge/Chat-Discord-7289da?logo=discord&logoColor=7289da)](https://discord.gg/m7Xzs6QeBD)

[![Support me using GitHub](https://img.shields.io/badge/Sponsor-GitHub-%23333?logo=githubsponsors)](https://github.com/sponsors/navorite)
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
- Ability to add tags to sessions
- Focused on performance and lower RAM usage
- Cross-browser support (Firefox, Chrome, Edge, and Opera)
- Compatible with Session Buddy, OneTab and Tab Session Manager

## Download

<a href="https://addons.mozilla.org/en-US/firefox/addon/sessionic
"><img src="https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg" alt='Get the Extension on Firefox' height="75">
</a>
<a href="https://chrome.google.com/webstore/detail/sessionic/mdakbhkahkmdafnfhdikbddkngcbhenc"><img src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/iNEddTyWiMfLSwFD6qGq.png" alt="Get the Extesion on Chrome" height="75" style="border: 1px solid transparent; border-radius:6px;">
</a>
<a href="https://microsoftedge.microsoft.com/addons/detail/sessionic/opniekmiofodaifalpdfoecpcloliico"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Get_it_from_Microsoft_Badge.svg/320px-Get_it_from_Microsoft_Badge.svg.png" alt="Get the Extension on Edge" height="75" style="border: 1px solid transparent; border-radius:4px;">
</a>

## Roadmap

You can check the project's [Roadmap](https://github.com/users/navorite/projects/1) for a brief look into upcoming features.

## Localization

You can contribute to the localization of the extension at [Weblate](https://hosted.weblate.org/projects/sessionic/)!

<h3 align="center">Translation status</h3>

<a href="https://hosted.weblate.org/engage/sessionic/">
      <img src="https://hosted.weblate.org/widgets/sessionic/-/multi-auto.svg" alt="Translation status"/>
</a>

## Common Questions and Answers

You can read the extension's Common Questions and Answers [here](https://github.com/navorite/sessionic/discussions/69).

## Build locally

1. Clone the repository `git clone https://github.com/navorite/sessionic.git`
2. Run `pnpm install`
3. Run `pnpm run build` for Chromium `pnpm run build:ff` for Firefox

## Running in browser

1. Build the extension locally using `pnpm run build` for Chromium or `pnpm run build:ff` for Firefox
2. Run `pnpm run open` for Chromium or `pnpm run open:ff` for Firefox
