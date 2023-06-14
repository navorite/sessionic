let elementHeight: number, clientHeight: number;

export function getAvailableViewport(
  parent: HTMLElement,
  length: number,
  safe: number = 0
) {
  if (!length) return;

  let start = 0,
    end = length,
    paddingTop = 0,
    paddingBottom = 0;

  if (parent) {
    const { scrollTop, scrollHeight } = parent;

    if (!clientHeight) clientHeight = parent.clientHeight;

    if (scrollHeight > clientHeight) {
      if (!elementHeight) elementHeight = scrollHeight / length;

      start = Math.floor((scrollTop - safe) / elementHeight);

      end = Math.ceil((clientHeight + scrollTop + safe) / elementHeight);

      if (start < 0) start = 0;
      if (end > length) end = length;

      paddingTop = start * elementHeight;

      paddingBottom = (length - end) * elementHeight;
    }
  }

  return { start, end, paddingTop, paddingBottom };
}
