let elementHeight: number, clientHeight: number;

export function getAvailableViewport(viewport: HTMLElement, length: number) {
  if (!length) return;

  let first = 0,
    last = length,
    paddingTop = 0,
    paddingBottom = 0;

  if (viewport) {
    const { scrollTop, scrollHeight } = viewport;

    if (!clientHeight) clientHeight = viewport.clientHeight;

    if (scrollHeight > clientHeight) {
      if (!elementHeight) elementHeight = scrollHeight / length;

      first = Math.floor((scrollTop - 500) / elementHeight);

      last = Math.ceil((clientHeight + scrollTop + 500) / elementHeight);

      if (first < 0) first = 0;
      if (last > length) last = length;

      paddingTop = first * elementHeight;

      paddingBottom = (length - last) * elementHeight;
    }
  }

  return { first, last, paddingTop, paddingBottom };
}
