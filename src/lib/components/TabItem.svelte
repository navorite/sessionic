<script lang="ts">
  import IconButton from './IconButton.svelte';
  import type { Tab } from '../types/browser';

  export let tabInfo: Tab;
</script>

<div
  class="py-1 px-2 flex items-center group/t rounded-md bg-neutral-4 mb-1 hover:bg-primary-5"
>
  <a
    href={tabInfo?.url}
    rel="noreferrer"
    target="_blank"
    title={tabInfo?.title}
    class="w-max flex items-center gap-2 overflow-hidden hover:underline"
  >
    <img
      src={tabInfo?.favIconUrl}
      alt={tabInfo?.title}
      style:width="1em"
      style:height="1em"
    />
    <span class="overflow-hidden whitespace-nowrap text-ellipsis">
      {tabInfo?.title}
    </span>
  </a>
  <IconButton
    icon="delete"
    title="Remove tab from session"
    class="invisible ml-auto text-2xl hover:text-warning-pure-1 group-hover/t:visible"
  />
</div>
