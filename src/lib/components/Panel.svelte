<script lang="ts">
  import { sessionList } from '@stores/session';
  import SessionItem from './SessionItem.svelte';
  import WindowItem from './WindowItem.svelte';
<<<<<<< Updated upstream
  import { initDB, loadDB } from '@utils/storage';
=======
  //import { initDB } from '@utils/storage';
  import log from '@utils/log';
>>>>>>> Stashed changes

  /* initDB('sessions', (r) => {
    $sessionList = r;
  });

  $: current = $sessionList?.length - 1;

  $: selection = $sessionList?.[current]?.windowsObj;*/
</script>

<!-- <div class="w-full mt-1 flex overflow-y-auto flex-1">
  {#if $sessionList?.length}
    <ul class="w-[50%] h-full">
      {#each $sessionList as sessionItem, idx (idx)}
        <SessionItem
          session={sessionItem}
          on:click={() => {
            current = idx;
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
</div> -->
