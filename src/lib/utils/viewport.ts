let elementHeight: number, clientHeight: number;

export function getAvailableViewport(
  parent: HTMLElement,
  length: number,
  buffer: number = 0
) {
  let start = 0,
    end = length ?? 0,
    paddingTop = 0,
    paddingBottom = 0;

  if (length) {
    if (parent) {
      const { scrollTop, scrollHeight } = parent;

      if (!clientHeight) clientHeight = parent.clientHeight;

      if (scrollHeight >= clientHeight) {
        if (!elementHeight) elementHeight = scrollHeight / length;

        start = Math.floor((scrollTop - buffer) / elementHeight);

        end = Math.ceil((clientHeight + scrollTop + buffer) / elementHeight);

        if (start < 0) start = 0;
        if (end > length) end = length;

        paddingTop = start * elementHeight;

        paddingBottom = (length - end) * elementHeight;
      }
    }
  }

  return { start, end, paddingTop, paddingBottom };
}
