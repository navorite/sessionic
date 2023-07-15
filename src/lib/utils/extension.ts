export function isExtensionViewed() {
  return document.visibilityState === 'visible';
}

export function isExtensionReady() {
  return document.readyState === 'complete';
}
