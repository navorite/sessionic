<script lang="ts">
  import ListItem from '@components/basic/ListItem.svelte';
  import IconButton from '../IconButton.svelte';
  import Tabs from '../Tabs/Tabs.svelte';
  import { createEventDispatcher } from 'svelte';
  import { sendMessage } from '@utils/messages';
  import { isExtensionViewed } from '@utils/extension';
  import Card from '@components/basic/Card.svelte';
  import browser from 'webextension-polyfill';

  const dispatch = createEventDispatcher<{
    delete: ETab | undefined;
  }>();

  export let window: EWindow;

  export let current = false;

  let collapsed = false;
</script>

{#if window.tabs.length && isExtensionViewed()}
  <ListItem let:hover class="mb-2 rounded-md bg-neutral-2">
    <div
      class="flex items-center gap-2 rounded-md hover:bg-neutral-3 p-2 mb-1 group"
    >
      <IconButton
        icon={window?.incognito ? 'incognito' : 'window'}
        title="{window?.incognito ? 'Private' : ''} Window"
        class="text-xl"
        on:click={() => (collapsed = !collapsed)}
      />

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span
        title="Open this Window in a New Window"
        class="w-max max-w-[60%] font-semibold overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer hover:underline"
        on:click={() => {
          sendMessage({ message: 'openInNewWindow', window });
          //openInNewWindow(window);
        }}
      >
        {window.incognito ? 'Private' : ''} Window
      </span>

      <Card class="text-xs bg-primary text-white">
        {window?.tabs.length} Tab{window?.tabs.length > 1 ? 's' : ''}
      </Card>

      {#if hover}
        <IconButton
          icon={current ? 'close' : 'delete'}
          title="{current ? 'Close' : 'Delete'} tab"
          class="ml-auto text-2xl text-error hover:text-error-focus"
          on:click={() => {
            if (current) browser?.windows?.remove(window?.id);
            else dispatch('delete');
          }}
        />
      {/if}

      <IconButton
        icon={collapsed ? 'expand' : 'collapse'}
        title="{collapsed ? 'Show' : 'Hide'} window tabs"
        class="text-2xl hover:text-primary-focus {hover ? '' : 'ml-auto'}"
        on:click={() => (collapsed = !collapsed)}
      />
    </div>

    {#if !collapsed}
      <Tabs {window} {current} class="pb-1 px-2" on:delete />
      <!-- <slot name="tabs" /> -->
    {/if}
  </ListItem>
{/if}
