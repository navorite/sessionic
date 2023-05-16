<script lang="ts">
  import { currentSession, sessionList } from '@stores/session';
  import SessionItem from './SessionItem.svelte';
  import WindowItem from './WindowItem.svelte';
  import log from '@utils/log';
  import { getAllWindows } from '@utils/browser';

  let selection = $currentSession;
  getAllWindows().then((windows) => {
    let tabsNumber = 0;

    for (const window of windows) {
      tabsNumber += window?.tabs?.length;
    }

    $currentSession = {
      ...$currentSession,
      title: 'Current Session',
      windows,
      windowsNumber: windows.length,
      tabsNumber,
    };
  });
</script>

<div class="w-full mt-1 flex gap-2 max-h-full">
  <div class="w-[50%] overflow-y-auto">
    <SessionItem
      current
      session={$currentSession}
      selected={selection?.id === $currentSession?.id}
      on:click={() => {
        selection = $currentSession;
      }}
    />

    <h2 class="text-lg font-bold mt-4 mb-1">Saved Sessions</h2>

    {#if $sessionList?.length}
      <ul>
        {#each $sessionList as sessionItem (sessionItem.id)}
          <li>
            <SessionItem
              session={sessionItem}
              selected={selection?.id === sessionItem?.id}
              on:click={() => {
                selection = sessionItem;
              }}
            />
          </li>
        {/each}
      </ul>
    {/if}
  </div>

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
</div>
