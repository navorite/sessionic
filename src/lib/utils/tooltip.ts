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
    //const spaceY = window.innerHeight - elY;

    let positionX = rect.width / 2,
      positionY = rect.height * 1.2;

    let translate = { X: -50, Y: 0 };

    if (spaceX < 120) {
      //show tooltip on the right side
      positionX = -8;
      positionY = rect.height / 2;

      translate = { X: -100, Y: -50 };
    }

    if (elX < 120) {
      //show tooltip on the left side
      positionX = rect.width + 8;
      positionY = rect.height / 2;

      translate = { X: 0, Y: -50 };
    }

    const x = elX + positionX;
    const y = elY + positionY;

    // TODO: add 5 full states of tooltip positions

    if (!tooltipComponent)
      tooltipComponent = new Tooltip({
        target: document.body,

        props: {
          title,
          x,
          y,
          translate,
          delay,
          duration,
        },

        intro: true,
      });
  }

  function mouseLeave() {
    tooltipComponent?.$destroy();

    tooltipComponent = null;
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
