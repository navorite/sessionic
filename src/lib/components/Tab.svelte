<script lang="ts">
  import type { Tabs } from 'webextension-polyfill';
  import IconButton from './IconButton.svelte';

  export let tabInfo: Tabs.Tab;
</script>

<div
  class="w-[96%] py-1 px-2 flex items-center group/t rounded-md hover:bg-gray-700"
>
  <a
    href={tabInfo?.url}
    rel="noreferrer"
    target="_blank"
    title={tabInfo?.title}
    class="w-[90%] flex items-center gap-2 overflow-hidden hover:underline"
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
    class="invisible ml-auto text-2xl hover:text-red-600 group-hover/t:visible"
  />
</div>
