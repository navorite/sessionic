<script lang="ts">
  import {
    currentSession,
    selectedSession,
    sessionList,
  } from '@stores/session';
  import SessionItem from './SessionItem.svelte';
  import WindowItem from './WindowItem.svelte';
  import { getAllWindows } from '@utils/browser';
  import log from '@utils/log';

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
      selected={$selectedSession?.id === $currentSession?.id}
      on:click={() => {
        $selectedSession = $currentSession;
      }}
    />

    <h2 class="text-lg font-bold mt-4 mb-1">Saved Sessions</h2>

    {#if $sessionList?.length}
      <ul>
        {#each $sessionList as sessionItem (sessionItem.id)}
          <li>
            <SessionItem
              session={sessionItem}
              selected={$selectedSession?.id === sessionItem?.id}
              on:click={() => {
                $selectedSession = sessionItem;
              }}
            />
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  {#if $selectedSession}
    <ul class="w-[50%] overflow-y-auto">
      {#each $selectedSession.windows as windowInfo}
        <li>
          <WindowItem {windowInfo} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
