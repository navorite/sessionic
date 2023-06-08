<script lang="ts">
  import IconButton from '../IconButton.svelte';
  import type { Window } from '../../types/browser';
  import Tabs from '../Tabs/Tabs.svelte';
  import ListItem from '@components/basic/List/ListItem.svelte';
  import { openWindow } from '@utils/browser';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let window: Window;

  let show = true;
  // let tabsURL = [];
</script>

{#if !window.tabs.length}
  <h2 class="text-lg font-bold mb-1 text-center">
    Start opening some tabs and windows to view them here!
  </h2>
{:else}
  <ListItem class="mb-2 rounded-md bg-neutral-3">
    <div
      class="flex items-center gap-2 group/w rounded-md hover:bg-primary-4 p-2 mb-1"
    >
      <IconButton
        icon={show ? 'windowon' : 'windowoff'}
        title="Collapse Window"
        class="text-2xl hover:text-primary-pure-1"
        on:click={() => {
          show = !show;
        }}
      />

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span
        title="Open this Window in a New Window"
        class="w-max max-w-[60%] overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer hover:underline"
        on:click={() => {
          openWindow(window);
        }}
      >
        Window
      </span>

      <span
        title="Number of Tabs"
        class="bg-overlay-black-8 py-0.5 px-2 rounded text-xs font-bold"
      >
        {window?.tabs.length} Tab{window?.tabs.length > 1 ? 's' : ''}
      </span>

      <IconButton
        icon="delete"
        title="Delete window"
        class="invisible ml-auto text-2xl text-red-500 hover:text-red-800 group-hover/w:visible"
        on:click={() => {
          dispatch('delete', { tab: null, window });
        }}
      />
    </div>

    {#if show}
      <Tabs
        {window}
        class="pb-1 px-2"
        on:delete={(event) => {
          dispatch('delete', { tab: event.detail.tab, window });
        }}
      />
      <!-- <slot name="tabs" /> -->
    {/if}
  </ListItem>
{/if}
