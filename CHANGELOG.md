# Changelog

## [1.0.0](https://github.com/navorite/sessionic/compare/v0.3.1...v1.0.0) (2023-09-09)

### Sessionic has finally hit v1.0.0! :sparkles:

### :rocket: Enhancements

* Adjust naming of autosave section ([7a2d470](https://github.com/navorite/sessionic/commit/7a2d470c85bb0e1dbe9565c249586334a588f346))
* Adjust naming of save interval input ([1014310](https://github.com/navorite/sessionic/commit/10143103b2ce0e6d941720c1456f6674a5c205fb))
* Scroll to selected session on start ([39c3cdd](https://github.com/navorite/sessionic/commit/39c3cdd586a12e4a20bd671c2443c01488be58bb))


### :bug: Bug Fixes

* Fix importing sessions from other extensions ([a91631c](https://github.com/navorite/sessionic/commit/a91631c0dacee1df2eb5141f075a1c3a385c7166))

## [0.3.1](https://github.com/navorite/sessionic/compare/v0.3.0...v0.3.1) (2023-09-08)

### :bug: Bug Fixes

* Fix Autosave does not remove oldest session after exceeding max session number ([e5aba20](https://github.com/navorite/sessionic/commit/728d37ccd111bbb167043651764c31b9736e5264))

## [0.3.0](https://github.com/navorite/sessionic/compare/v0.2.5...v0.3.0) (2023-09-07)


### :fire: New Features

* Add Autosave for sessions ([#42](https://github.com/navorite/sessionic/issues/42)) ([a55c7e3](https://github.com/navorite/sessionic/commit/a55c7e341c462a65f240709009a78b2ddb425569))


### :rocket: Enhancements

* Improve modal buttons font ([f9f1796](https://github.com/navorite/sessionic/commit/f9f17962fc9ac8612036e0cce25f42b7ce1816d7))


### :bug: Bug Fixes

* Closing a tab doesn't update session properly ([5788608](https://github.com/navorite/sessionic/commit/57886084de8fc7fd15dcb94e77888069e34bb2ef))

## [0.2.5](https://github.com/navorite/sessionic/compare/v0.1.2...v0.3.0) (2023-08-17)


### :rocket: Enhancements

* Change color of delete icons to red ([ae1af62](https://github.com/navorite/sessionic/commit/ae1af623d4c1b9285a4bb891ccecbe110d403a0d))
* Remove unneeded events to reduce memory usage ([131c0b2](https://github.com/navorite/sessionic/commit/131c0b2e5f7024561c6a4b2a0c0541f30c11431f))
* Enhance color contrast of input modal ([ed90b65](https://github.com/navorite/sessionic/commit/ed90b652675a187bae9680873bf2ad0043be0d42))
* Enhance Switch UI ([5047cf7](https://github.com/navorite/sessionic/commit/5047cf74835da73d98024dcf6db502480d0f40e9))
* Greatly reduce memory usage by loading only the session currently viewed ([#34](https://github.com/navorite/sessionic/issues/34)) ([034d9a3](https://github.com/navorite/sessionic/commit/034d9a3bec7e980b882a70c3976e17ec3bad2a16))

## [0.2.4](https://github.com/navorite/sessionic/compare/v0.2.3...v0.2.4) (2023-08-16)


### :bug: Bug Fixes

* Selected session is not in sync sometimes ([c4fcfce](https://github.com/navorite/sessionic/commit/c4fcfce4e40dcaccbfb9f4f10e9afd215065787a))

## [0.2.3](https://github.com/navorite/sessionic/compare/v0.2.2...v0.2.3) (2023-08-15)


### :bug: Bug Fixes

* Fix tabs do not open correctly when active ([0f5710a](https://github.com/navorite/sessionic/commit/0f5710a3c1e1105e94180268213344c86f7f1be1))

## [0.2.2](https://github.com/navorite/sessionic/compare/v0.2.1...v0.2.0) (2023-08-15)


### :rocket: Performance Improvements

* Unload events when not visible ([29fbe0e](https://github.com/navorite/sessionic/commit/29fbe0e31b79893a7597ad1707d23b43f5db4216))


### :bug: Bug Fixes

* Do not load settings at every init call ([3ff2298](https://github.com/navorite/sessionic/commit/3ff22987f50f90f57bc216fbeb291407cd7211a7))
* Fix Chromium window bound size error ([f654d36](https://github.com/navorite/sessionic/commit/f654d36935fdc879e1e22b1b2372fc6d8ff70b40))
* Update tabs when necessary events happen ([728c1da](https://github.com/navorite/sessionic/commit/728c1dacbfab2b80a197ed5ceaacc1e902f5d83b))

## [0.2.1](https://github.com/navorite/sessionic/compare/v0.2.0...v0.2.1) (2023-08-11)


### Bug Fixes

* Tabs don't open when tab lazy loading is off ([b374699](https://github.com/navorite/sessionic/commit/b374699441d7f987fbdc5879404c566074d39b7b))

## [0.2.0](https://github.com/navorite/sessionic/compare/v0.1.2...v0.2.0) (2023-08-11)


### Features

* Support tab lazy loading in Chrome ([4dfe9bc](https://github.com/navorite/sessionic/commit/4dfe9bc05a62a99155dc944dc7fd68b26f926984))
* Add ability to import sessions from other popular extensions ([f5a99ea](https://github.com/navorite/sessionic/commit/f5a99ea6c5c0b4ae53b440cf4ab78f45b2ec443c))
* Reduce size of backups by roughly 90% ([d0053e9](https://github.com/navorite/sessionic/commit/d0053e9ba5c4c9cbf2a61e8f8cd6853c32b8b845))
* Add option to filter URL list ([9cda02c](https://github.com/navorite/sessionic/commit/9cda02c0beb31974752c100986b5766543efa74b))
* Add option to lazy load tabs ([5c9bd97](https://github.com/navorite/sessionic/commit/5c9bd976004e80f681af61f03919d2571c09ee10))
* Improve extension tabs behaviour ([bd1e8a9](https://github.com/navorite/sessionic/commit/bd1e8a9d3c1a5ded81c355e1168810c18bc154a6))
* **UI:** Improve colors ([47516b0](https://github.com/navorite/sessionic/commit/47516b0755088a6cdc422afc4f7bd97c9e6ac414))
* **UI:** Improve section spacing ([4e85ac9](https://github.com/navorite/sessionic/commit/4e85ac9fb9173c2fed0c575f1a1102199fb6b56b))
* **UI:** Improve sessions selected color ([8afbfcd](https://github.com/navorite/sessionic/commit/8afbfcdc3a8b0a6df48242fc5d741eeb6085f9e5))
* **UI:** Improve switch UI ([227f6ab](https://github.com/navorite/sessionic/commit/227f6ab08fb2b2c6fd62d3f200993f211d29a8b5))


### Bug Fixes

* Avoid scenarios where memory leak may occur ([2450613](https://github.com/navorite/sessionic/commit/245061307adf5043ef9f822a34b2f884df9c7879))
* Check for discarded tabs before displaying it ([f78610a](https://github.com/navorite/sessionic/commit/f78610aa31ef5053aa1340c61c6e0c8165138021))
* Detect more tab change events ([2d87e89](https://github.com/navorite/sessionic/commit/2d87e89423b908c31553826871ad0d9995f443e1))
* Do not remove certain tab properties ([36b765c](https://github.com/navorite/sessionic/commit/36b765c745678602b4a34111db968490d79339db))
* Lazy loaded tab has no icon in some cases ([9dfd82d](https://github.com/navorite/sessionic/commit/9dfd82da8f8518c8ca90db28f88fe01e52af037f))
* Provide better defaults to tab filters ([59bbccf](https://github.com/navorite/sessionic/commit/59bbccf6345c964f9917a9feb7e1bb8d3c68ff30))
* Update Current Session tab removals properly ([da68872](https://github.com/navorite/sessionic/commit/da6887237f961017a878206b485f7df40bde2b50))
* Update tab and window deletion properly ([709268f](https://github.com/navorite/sessionic/commit/709268f5516547440bfe9a57f428303c59efe584))
* Use tab title for discarded tabs in Firefox ([30f6474](https://github.com/navorite/sessionic/commit/30f6474bfb315d3a1da36f997536100f252f4c0d))
* **UI:** Fix tab icon not fully rendered ([92b528d](https://github.com/navorite/sessionic/commit/92b528dfa1cff74b0978518e2b747aa82ffadd7c))
* **UI:** Show default icon for other extensions ([fed2a04](https://github.com/navorite/sessionic/commit/fed2a04fcbf50b2a45a171c8c070dbbff20b0faa))
* **UI:** Use intended tab color ([eca3e8d](https://github.com/navorite/sessionic/commit/eca3e8d4f4c836049298c91ee8473b3cf2404843))

## [0.1.2](https://github.com/navorite/sessionic/compare/v0.1.1...v0.1.2) (2023-07-20)

### Bug Fixes

- **UI:** Fix modal and tab UI not showing properly ([84805bf](https://github.com/navorite/sessionic/commit/84805bf0b55e335ba3e9562f081531787455698b))

## [0.1.1](https://github.com/navorite/sessionic/compare/v0.1.0...v0.1.1) (2023-07-20)

### Bug Fixes

- Current Session fails to load with bad tab icons ([5a0c43d](https://github.com/navorite/sessionic/commit/5a0c43dd4270c4ef0e5113eae4ac8b79e06d5122))
- **UI:** Set max size of tab icons ([1320d11](https://github.com/navorite/sessionic/commit/1320d11bc05d1194c0451adb396c9ca8ac031a69))

## [0.1.0](https://github.com/navorite/sessionic/compare/v0.0.2...v0.1.0) (2023-07-19)

### Features

- **UI:** improve Settings UI and accessibility ([d62e883](https://github.com/navorite/sessionic/commit/d62e883b741d7d6c1bc37cc629e67456f3babd23))

### Bug Fixes

- Show pointer on hovering over import sessions ([9259ba4](https://github.com/navorite/sessionic/commit/9259ba4e3853c91d1397354fe20a7b4d885cd815))