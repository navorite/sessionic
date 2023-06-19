export function isExtensionReady() {
  return (
    document.visibilityState === 'visible' && document.readyState === 'complete'
  );
}
