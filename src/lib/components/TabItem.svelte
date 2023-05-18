<script lang="ts">
  import IconButton from './IconButton.svelte';
  import type { Tab } from '../types/browser';

  export let tab: Tab;

  let hover = false;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
  class="tab__container"
  on:mouseover={() => {
    hover = true;
  }}
  on:mouseleave={() => {
    hover = false;
  }}
>
  <a
    href={tab?.url}
    rel="noreferrer"
    target="_blank"
    title={tab?.title}
    class="tab__link"
  >
    <img
      src={tab?.favIconUrl}
      alt={tab?.title}
      style:width="1em"
      style:height="1em"
    />
    <span class="tab__title">
      {tab?.title}
    </span>
  </a>
  {#if hover}
    <IconButton
      icon="delete"
      title="Remove tab from session"
      class="ml-auto text-2xl hover:text-warning-pure-1"
    />
  {/if}
</div>

<style>
  .tab__container {
    @apply py-1 px-2 flex items-center rounded-md bg-neutral-3 mb-1;
  }

  .tab__container:hover {
    @apply bg-primary-4;
  }

  .tab__link {
    @apply w-max max-w-[90%] flex items-center gap-2 overflow-hidden;
  }

  .tab__link:hover {
    @apply underline;
  }

  .tab__title {
    @apply overflow-hidden whitespace-nowrap text-ellipsis;
  }
</style>
