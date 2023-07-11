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
      <img
        src={decompressLZ(tab?.favIconUrl)}
        alt=""
        style:width="1em"
        style:height="1em"
        class="rounded-md"
      />
      <span class="title">
        {tab?.title ?? 'Loading tab name...'}
      </span>
    </button>

    {#if hover}
      <IconButton
        icon={current ? 'close' : 'delete'}
        title="{current ? 'Close' : 'Delete'} tab"
        class="ml-auto text-2xl text-error hover:text-error-focus"
        on:click={() => {
          if (current) browser?.tabs?.remove(tab?.id);
          else dispatch('delete', tab);
        }}
      />
    {/if}
  </ListItem>
{/if}

<style>
  .link {
    @apply w-max max-w-[90%] flex items-center gap-2 overflow-hidden font-semibold;
  }

  .link:hover {
    @apply underline;
  }

  .title {
    @apply overflow-hidden whitespace-nowrap text-ellipsis;
  }
</style>
