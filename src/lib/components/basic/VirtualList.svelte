<script lang="ts">
  import { getAvailableViewport } from '@utils/viewport';

  export { className as class };
  let className: string = '';

  type T = $$Generic;

  export let items: T[];

  export let start: number = 0;
  export let end: number = 0;

  export let reversed = false;

  let divEl: HTMLDivElement;
  let timeout: string | number | NodeJS.Timeout;

  $: viewport = getAvailableViewport(divEl, items?.length);
  $: (start = viewport.start), (end = viewport.end);

  function handleScroll() {
    //TODO: enhance scrolling performance and memory usage
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      viewport = getAvailableViewport(divEl, items?.length);
      clearTimeout(timeout);
    }, 5);
  }
</script>

{#if items && items.length}
  <div
    bind:this={divEl}
    class="overflow-y-auto {className}"
    on:scroll={handleScroll}
  >
    <ul
      style:padding-top="{viewport.paddingTop}px"
      style:padding-bottom="{viewport.paddingBottom}px"
    >
      {#each { length: end - start } as _, i}
        {@const item = reversed
          ? items[items.length - 1 - i - start]
          : items[i + start]}
        <slot {item} />
      {/each}
    </ul>
  </div>
{/if}
