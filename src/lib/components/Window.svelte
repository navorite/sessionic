<script lang="ts">
  import type { Windows } from 'webextension-polyfill';
  import Tab from './Tab.svelte';
  import IconButton from './IconButton.svelte';

  export let windowInfo: Windows.Window;

  let showWindow = true;
</script>

<div class="w-full h-full">
  <div
    class="w-[96%] flex items-center gap-2 cursor-pointer group/w rounded-md hover:bg-gray-700 py-1 px-2"
  >
    <IconButton
      icon={showWindow ? 'windowon' : 'windowoff'}
      title="Window: {windowInfo?.title}"
      class="text-2xl"
      on:click={() => {
        showWindow = !showWindow;
      }}
    />

    <span class="w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">
      {windowInfo?.title}
    </span>

    <IconButton
      icon="delete"
      title="Remove this window from session"
      class="invisible ml-auto text-2xl hover:text-red-600 group-hover/w:visible"
    />
  </div>

  {#if showWindow}
    <ul class="h-full pl-6">
      {#each windowInfo?.tabs as tab}
        <li>
          <Tab tabInfo={tab} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
