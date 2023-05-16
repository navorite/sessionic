<script lang="ts">
  import { sessionList } from '@stores/session';
  import SessionItem from './SessionItem.svelte';
  import WindowItem from './WindowItem.svelte';
  import log from '@utils/log';

  $: selection = $sessionList?.[0];
</script>

<div class="w-full mt-1 flex gap-2 max-h-full">
  {#if $sessionList?.length}
    <ul class="w-[50%] overflow-y-auto">
      {#each $sessionList as sessionItem (sessionItem.id)}
        <li>
          <SessionItem
            session={sessionItem}
            selected={selection === sessionItem}
            on:click={() => {
              log.info('Selected session');
              selection = sessionItem;
            }}
          />
        </li>
      {/each}
    </ul>

    {#if selection}
      <ul class="w-[50%] overflow-y-auto">
        {#each selection.windows as windowInfo}
          <li>
            <WindowItem {windowInfo} />
          </li>
        {/each}
      </ul>
    {:else}
      <p class="font-semibold text-xl">Select a session to view!</p>
    {/if}
  {:else}
    <p class="font-semibold text-xl">Start saving a new session!</p>
  {/if}
</div>
