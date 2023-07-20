<script lang="ts">
  import IconButton from '@components/IconButton.svelte';
  import ListItem from '@components/basic/ListItem.svelte';
  import { createEventDispatcher } from 'svelte';
  import { decompress as decompressLZ } from 'lz-string';
  import { sendMessage } from '@utils/messages';
  import browser from 'webextension-polyfill';

  export let tab: ETab;
  export let current = false;

  const dispatch = createEventDispatcher<{ delete: ETab }>();
</script>

{#if tab}
  <ListItem class="tab-container" let:hover>
    <button
      type="button"
      class="link"
      on:click={() => {
        sendMessage({ message: 'createTab', tab });
      }}
    >
      {#if tab.favIconUrl}
        <!-- TODO: fix layout shift on certain favicons -->
        <img
          style:width="1rem"
          style:height="1rem"
          style:max-width="1rem"
          style:max-height="1rem"
          class="rounded-md"
          src={decompressLZ(tab.favIconUrl)}
          alt=""
        />
      {:else}
        <IconButton
          icon="tab"
          class="text-neutral-content text-base w-[1rem] h-[1rem] max-w-[1rem]"
        />
      {/if}
      <span class="title">
        {tab.title}
      </span>
    </button>

    {#if hover}
      <IconButton
        icon={current ? 'close' : 'delete'}
        title={current ? 'Close' : 'Delete'}
        class="ml-auto text-xl hover:text-error-focus"
        on:click={() => {
          if (current && tab.id) browser.tabs.remove(tab.id);
          else dispatch('delete', tab);
        }}
      />
    {/if}
  </ListItem>
{/if}

<style>
  .link {
    @apply w-max max-w-[90%] flex items-center gap-2 overflow-hidden;
  }

  .link:hover {
    @apply underline;
  }

  .title {
    @apply overflow-hidden whitespace-nowrap text-ellipsis text-sm font-medium;
  }
</style>
