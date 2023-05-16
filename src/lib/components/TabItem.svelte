<script lang="ts">
  import IconButton from './IconButton.svelte';
  import type { Tab } from '../types/browser';

  export let tab: Tab;
</script>

<div
  class="py-1 px-2 flex items-center group/t rounded-md bg-neutral-3 mb-1 hover:bg-primary-4"
>
  <a
    href={tab?.url}
    rel="noreferrer"
    target="_blank"
    title={tab?.title}
    class="w-max max-w-[90%] flex items-center gap-2 overflow-hidden hover:underline"
  >
    <img
      src={tab?.favIconUrl}
      alt={tab?.title}
      style:width="1em"
      style:height="1em"
    />
    <span class="overflow-hidden whitespace-nowrap text-ellipsis">
      {tab?.title}
    </span>
  </a>
  <IconButton
    icon="delete"
    title="Remove tab from session"
    class="invisible ml-auto text-2xl hover:text-warning-pure-1 group-hover/t:visible"
  />
</div>
