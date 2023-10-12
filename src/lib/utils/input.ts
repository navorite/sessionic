export function isInputTarget(target: HTMLElement) {
  return (
    ['INPUT', 'TEXTAREA'].includes(target.tagName) || target.isContentEditable
  );
}
