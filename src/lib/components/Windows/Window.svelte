<script lang="ts">
  import ListItem from '@components/basic/ListItem.svelte';
  import IconButton from '../IconButton.svelte';
  import Tabs from '../Tabs/Tabs.svelte';
  import type { Window } from '../../types/browser';
  import { openInNewWindow } from '@utils/browser';
  import { createEventDispatcher } from 'svelte';
  import type { Icon } from 'src/lib/types/extension';

  const dispatch = createEventDispatcher();

  export let window: Window;

  let show = true;

  let icon: Icon;

  $: {
    if (!show) icon = window.incognito ? 'incognito_off' : 'window_off';
    else icon = window.incognito ? 'incognito' : 'window';
  }
</script>

{#if window.tabs.length}
  <ListItem let:hover class="mb-2 rounded-md bg-neutral-3">
    <div
      class="flex items-center gap-2 rounded-md hover:bg-primary-4 p-2 mb-1 group"
    >
      <IconButton
        {icon}
        title="Collapse Window"
        class="text-2xl hover:text-primary-pure-1"
        on:click={() => {
          show = !show;
        }}
      />

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span
        title="Open this Window in a New Window"
        class="w-max max-w-[60%] font-semibold overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer hover:underline"
        on:click={() => {
          openInNewWindow(window);
        }}
      >
        {window.incognito ? 'Private' : ''} Window
      </span>

      <span
        title="Number of Tabs"
        class="bg-overlay-black-8 py-0.5 px-2 rounded text-xs font-semibold"
      >
        {window?.tabs.length} Tab{window?.tabs.length > 1 ? 's' : ''}
      </span>

      {#if hover}
        <IconButton
          icon="delete"
          title="Delete window"
          class="ml-auto text-2xl text-red-500 hover:text-red-800 invisible group-hover:visible"
          on:click={() => {
            dispatch('delete', { tab: null, window });
          }}
        />
      {/if}
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
