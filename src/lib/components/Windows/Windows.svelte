<script lang="ts">
  import { isExtensionReady } from '@utils/extension';
  import Window from './Window.svelte';
  import { createEventDispatcher } from 'svelte';

  export { className as class };
  let className = '';

  export let session: ESession;
  export let current = false;

  const dispatch = createEventDispatcher();

  function deleteTab(window: EWindow, tab: Tab, windowIndex: number) {
    if (!window) return;

    if (tab) {
      const tabIndex = window.tabs.indexOf(tab);

      if (tabIndex === -1) return;

      window.tabs.splice(tabIndex, 1);

      if (!window.tabs.length) session.windows.splice(windowIndex, 1);

      session.tabsNumber--;
    } else {
      session.windows.splice(windowIndex, 1);
      session.tabsNumber -= window.tabs.length;
    }
  }
</script>

{#if session && isExtensionReady()}
  <ul class="overflow-y-auto pr-1 {className} ">
    {#each session.windows as window, i}
      <Window
        {window}
        {current}
        on:delete={(event) => {
          deleteTab(window, event.detail?.tab, i);
          dispatch('delete');
        }}
      />
    {/each}
  </ul>
{:else}
  <h2 class="text-lg font-bold mb-1 text-center">
    Start opening some tabs to view them here!
  </h2>
{/if}
