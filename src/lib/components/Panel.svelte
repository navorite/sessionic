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
        <SessionItem
          session={sessionItem}
          on:click={() => {
            log.info('Selected session');
            selection = sessionItem?.windows;
          }}
        />
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
      Select a session to view!
    {/if}
  {:else}
    Start saving a new session!
  {/if}
</div>
