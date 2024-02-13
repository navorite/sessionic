<div align='center'>

![Sessionic icon](./public/favicons/96.png)

# Sessionic

A web extension to save, manage and restore sessions, windows and tabs.

<a href="https://addons.mozilla.org/en-US/firefox/addon/sessionic
"><img src="https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg" alt='Get the Extension on Firefox' height="75">
</a>
<a href="https://chrome.google.com/webstore/detail/sessionic/mdakbhkahkmdafnfhdikbddkngcbhenc"><img src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/iNEddTyWiMfLSwFD6qGq.png" alt="Get the Extesion on Chrome" height="75" style="border: 1px solid transparent; border-radius:6px;">
</a>
<a href="https://microsoftedge.microsoft.com/addons/detail/sessionic/opniekmiofodaifalpdfoecpcloliico"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Get_it_from_Microsoft_Badge.svg/320px-Get_it_from_Microsoft_Badge.svg.png" alt="Get the Extension on Edge" height="75" style="border: 1px solid transparent; border-radius:4px;">
</a>

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
