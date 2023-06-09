export function getViewportData(
  viewport: HTMLElement,
  elementHeight: number,
  maxLength: number
) {
  if (!maxLength) return;

  let first = 0,
    last = maxLength,
    paddingTop = 0,
    paddingBottom = 0;

  if (viewport) {
    const { clientHeight, scrollTop } = viewport;

    first = Math.floor((scrollTop - 300) / elementHeight);
    last = Math.ceil((clientHeight + scrollTop + 300) / elementHeight);

    if (first < 0) first = 0;
    if (last > maxLength) last = maxLength;

    paddingTop = first * elementHeight;
    paddingBottom = (maxLength - last) * elementHeight;

    console.log({
      first,
      last,
      paddingTop,
      paddingBottom,
    });
  }
  return { first, last, paddingTop, paddingBottom };
}
