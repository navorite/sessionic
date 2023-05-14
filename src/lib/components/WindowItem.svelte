<script lang="ts">
  import TabItem from './TabItem.svelte';
  import IconButton from './IconButton.svelte';
  import { openWindow } from '@utils/browser';
  import type { Window } from '../types/browser';

  export let windowInfo: Window;

  let showWindow = true;
  // let tabsURL = [];
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

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      title="Open this Window in a New Window"
      class="w-[90%] overflow-hidden whitespace-nowrap text-ellipsis hover:underline"
      on:click={() => {
        //   if (tabsURL.length) openWindow(tabsURL);
        //   console.log(tabsURL);
      }}
    >
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
        <!-- {@const tabItem = tabsURL.push(tab.url)} -->
        <li>
          <TabItem tabInfo={tab} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
