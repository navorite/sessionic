let elementHeight: number, clientHeight: number;

export function getAvailableViewport(viewport: HTMLElement, length: number) {
  if (!length) return;

  let first = 0,
    last = length,
    paddingTop = 0,
    paddingBottom = 0;

  if (viewport) {
    const { scrollTop, scrollHeight } = viewport;

    if (!elementHeight) elementHeight = scrollHeight / length;

    if (!clientHeight) clientHeight = viewport.clientHeight;

    first = Math.floor((scrollTop - 300) / elementHeight);
    last = Math.ceil((clientHeight + scrollTop + 300) / elementHeight);

    if (first < 0) first = 0;
    if (last > length) last = length;

    paddingTop = first * elementHeight;
    paddingBottom = (length - last) * elementHeight;
  }

  console.log({ elementHeight, first, last });
  return { first, last, paddingTop, paddingBottom };
}
