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

    const elX = window.scrollX + rect.left;
    const elY = window.scrollY + rect.top;

    const spaceX = window.innerWidth - elX;
    const spaceY = window.innerHeight - elY;

    let positionX = rect.width / 2,
      positionY = rect.height * 1.2;

    let noSpace = false;

    if (spaceX < 120) {
      positionX = -8;
      positionY = 0;

      noSpace = true;
    }

    if (spaceY < 40) positionY = -spaceY;

    const x = elX + positionX;
    const y = elY + positionY;

    if (!tooltipComponent)
      tooltipComponent = new Tooltip({
        target: document.body,

        props: {
          title,
          x,
          y,
          delay,
          duration,
          noSpace: positionX < 0,
          show: true,
        },

        intro: true,
      });
    else
      tooltipComponent.$set({
        title,
        x,
        y,
        delay,
        duration,
        noSpace: positionX < 0,
        show: true,
      });
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
