<script lang="ts">
  import { sessionList } from '@stores/session';
  import SessionItem from './SessionItem.svelte';
  import WindowItem from './WindowItem.svelte';
  import { initDB } from '@utils/storage';
  import log from '@utils/log';

  let selection = $sessionList?.[0]?.windows;
</script>

<div class="w-full mt-1 flex overflow-y-auto flex-1 gap-2">
  {#if $sessionList?.length}
    <ul class="w-[50%] h-full">
      {#each $sessionList as sessionItem (sessionItem.id)}
        <li>
          <SessionItem
            session={sessionItem}
            on:click={() => {
              log.info('Selected session');
              selection = sessionItem?.windows;
            }}
          />
        </li>
      {/each}
    </ul>

    {#if selection}
      <ul class="w-[50%] h-full overflow-y-auto">
        {#each selection as windowInfo}
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
