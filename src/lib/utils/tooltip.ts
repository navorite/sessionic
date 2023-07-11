import Tooltip from '@components/basic/Tooltip.svelte';
import type { Action } from 'svelte/action';

export const tooltip: Action<
  HTMLElement,
  { title: string; delay?: number; duration?: number }
> = (element: HTMLElement, { title, delay, duration }) => {
  if (!title) return;

  let tooltipComponent: Tooltip;

  element.addEventListener('mouseover', mouseOver);
  element.addEventListener('mouseleave', mouseLeave);

  function mouseOver() {
    const rect = element.getBoundingClientRect();

    let x = rect.left + window.scrollX + rect.width / 2;
    let y = rect.top + window.scrollY + rect.height * 1.2;

    if (!tooltipComponent)
      tooltipComponent = new Tooltip({
        target: document.body,

        props: { title, x, y, delay, duration, show: true },

        intro: true,
      });
    else tooltipComponent.$set({ show: true });
  }

  function mouseLeave() {
    tooltipComponent?.$set({ show: false });
  }

  return {
    update(parameter) {
      tooltipComponent?.$set(parameter);
    },

    destroy() {
      element.removeEventListener('mouseover', mouseOver);
      element.removeEventListener('mouseleave', mouseLeave);

      tooltipComponent?.$destroy();
      tooltipComponent = null;
    },
  };
};
