<script lang="ts">
  import browser, { i18n } from 'webextension-polyfill';
  import type { ETab, EWindow } from '@/lib/types';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { settings } from '@/lib/stores';
  import { IconButton, TabItem } from '@/lib/components';
  import { tooltip, sendMessage } from '@/lib/utils';

  const dispatch = createEventDispatcher<{
    delete: ETab | undefined;
  }>();

  export let window: EWindow;

  export let current = false;

  let collapsed = false;

  $: active = window?.focused ? 'text-link' : '';
</script>

{#if window?.tabs?.length}
  <li class="rounded-md bg-neutral-2">
    <button
      class="group flex items-center gap-2 p-2 {collapsed
        ? 'rounded-md'
        : 'rounded-t-md'} w-full bg-neutral-3 hover:bg-neutral-4"
      on:click|self|stopPropagation={() => (collapsed = !collapsed)}
      aria-expanded={!collapsed}
    >
      <IconButton
        role="img"
        icon={window?.incognito ? 'incognito' : 'window'}
        class="{active} text-lg"
        on:click={() => (collapsed = !collapsed)}
      />

      <button
        use:tooltip={{ title: i18n.getMessage('popupTipOpen') }}
        aria-label="Open in a New Window"
        class="{active} w-max max-w-[60%] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium hover:underline"
        on:click={() => {
          sendMessage({
            message: 'openInNewWindow',
            window,
            discarded: $settings.discarded
          });
        }}
      >
        {i18n.getMessage(
          window?.incognito ? 'labelPrivateWindow' : 'labelWindow'
        )}
      </button>

      <div
        class="card bg-info text-white hover:bg-info-focus"
        aria-label="Number of window tabs"
      >
        {window?.tabs?.length}
        {i18n.getMessage(
          window?.tabs?.length ?? 0 > 1 ? 'labelTabs' : 'labelTab'
        )}
      </div>

      <IconButton
        icon={current ? 'close' : 'delete'}
        title={i18n.getMessage(current ? 'labelClose' : 'labelDelete')}
        class="ml-auto hidden text-xl text-error hover:text-error-focus group-hover:block"
        on:click={() => {
          if (current && window.id) browser.windows.remove(window.id);
          else dispatch('delete');
        }}
      />

      <IconButton
        icon={collapsed ? 'expand' : 'collapse'}
        class="ml-auto text-xl hover:text-primary-focus group-hover:ml-0"
        title={i18n.getMessage(collapsed ? 'labelExpand' : 'labelCollapse')}
        on:click={() => (collapsed = !collapsed)}
      />
    </button>

    {#if !collapsed && window && window.tabs}
      <ul class="flex flex-col gap-1 p-2" transition:fade={{ duration: 250 }}>
        {#each window.tabs as tab}
          <TabItem {tab} on:delete {current} />
        {/each}
      </ul>
      <!-- <slot name="tabs" /> -->
    {/if}
  </li>
{/if}
