export function isExtensionViewed() {
  return (
    document.visibilityState === 'visible' && document.readyState === 'complete'
  );
}
