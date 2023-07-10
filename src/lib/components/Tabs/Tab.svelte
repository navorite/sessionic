<script lang="ts">
  import IconButton from '@components/IconButton.svelte';
  import ListItem from '@components/basic/ListItem.svelte';
  import { createEventDispatcher } from 'svelte';
  import { decompress as decompressLZ } from 'lz-string';
  import { sendMessage } from '@utils/messages';
  import browser, { tabs } from 'webextension-polyfill';

  export let tab: ETab;
  export let current = false;

  const dispatch = createEventDispatcher<{ delete: ETab }>();
</script>

{#if tab}
  <ListItem class="tab-container" let:hover>
    <button
      type="button"
      title={tab?.title}
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

    {#if hover && current}
      <button
        type="button"
        title="Close tab"
        class="font-bold ml-auto hover:text-error-focus"
        on:click={() => {
          browser?.tabs?.remove(tab?.id);
        }}>X</button
      >
    {/if}

    {#if hover && !current}
      <IconButton
        icon="delete"
        title="Delete tab"
        class="ml-auto text-2xl text-red-500 hover:text-red-800"
        on:click={() => {
          dispatch('delete', tab);
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
