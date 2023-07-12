<script lang="ts">
  import ListItem from '@components/basic/ListItem.svelte';
  import IconButton from '../IconButton.svelte';
  import Tab from '@components/Tabs/Tab.svelte';
  import { tooltip } from '@utils/tooltip';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { isExtensionViewed } from '@utils/extension';
  import { sendMessage } from '@utils/messages';
  import browser from 'webextension-polyfill';

  const dispatch = createEventDispatcher<{
    delete: ETab | undefined;
  }>();

  export let window: EWindow;

  export let current = false;

  let collapsed = false;
</script>

{#if window.tabs.length && isExtensionViewed()}
  <ListItem let:hover class="rounded-md bg-neutral-2">
    <div
      class="flex items-center gap-2 rounded-md hover:bg-neutral-3 p-2 mb-1 group"
    >
      <IconButton
        icon={collapsed ? 'expand' : 'collapse'}
        title="{collapsed ? 'Expand' : 'Collapse'} window"
        class="text-2xl hover:text-primary-focus"
        on:click={() => (collapsed = !collapsed)}
      />
      <IconButton
        icon={window?.incognito ? 'incognito' : 'window'}
        title="{window?.incognito ? 'Private' : ''} Window"
        class="text-xl"
        on:click={() => (collapsed = !collapsed)}
      />

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span
        use:tooltip={{ title: 'Open in a New Window' }}
        tabindex="0"
        role="button"
        aria-label="Open in a New Window"
        class="w-max max-w-[60%] font-semibold overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer hover:underline"
        on:click={() => {
          sendMessage({ message: 'openInNewWindow', window });
        }}
      >
        {window?.incognito ? 'Private' : ''} Window
      </span>

      <div
        class="card bg-primary text-white"
        aria-label="Number of window tabs: {window?.tabs.length}"
      >
        {window?.tabs.length} Tab{window?.tabs.length > 1 ? 's' : ''}
      </div>

      {#if hover}
        <IconButton
          icon={current ? 'close' : 'delete'}
          title="{current ? 'Close' : 'Delete'} window"
          class="ml-auto text-2xl hover:text-error-focus"
          on:click={() => {
            if (current) browser?.windows?.remove(window?.id);
            else dispatch('delete');
          }}
        />
      {/if}
    </div>

    {#if !collapsed && window}
      <ul class="pb-1 px-2" transition:fade={{ duration: 250 }}>
        {#each window?.tabs as tab}
          <Tab {tab} on:delete {current} />
        {/each}
      </ul>
      <!-- <slot name="tabs" /> -->
    {/if}
  </ListItem>
{/if}
