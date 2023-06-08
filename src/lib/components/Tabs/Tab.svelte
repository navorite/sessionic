<script lang="ts">
  import IconButton from '@components/IconButton.svelte';
  import type { Tab } from '../../types/browser';
  import ListItem from '@components/basic/List/ListItem.svelte';
  import { createEventDispatcher } from 'svelte';

  export let tab: Tab;

  const dispatch = createEventDispatcher();
</script>

{#if tab}
  <ListItem class="tab-container" let:hover>
    <a
      href={tab?.url}
      title={tab?.title}
      class="link"
      rel="noreferrer"
      target="_blank"
    >
      <img
        src={tab?.favIconUrl}
        alt=""
        style:width="1em"
        style:height="1em"
        class="rounded-md"
      />
      <span class="title">
        {tab?.title}
      </span>
    </a>

    {#if hover}
      <IconButton
        slot="actions"
        icon="delete"
        title="Delete tab"
        on:click={() => {
          dispatch('delete', { tab });
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
    @apply overflow-hidden whitespace-nowrap text-ellipsis;
  }
</style>
