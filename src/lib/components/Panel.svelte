<script lang="ts">
  import { getAllWindows, getTabsNumber } from '@utils/browser';
  import Sessions from './Sessions.svelte';
  import Windows from './Windows.svelte';
  import {
    currentSession,
    selectedSession,
    sessionList,
  } from '@stores/session';

  getAllWindows().then((windows) => {
    $currentSession = {
      ...$currentSession,
      title: 'Current Session',
      windows,
      windowsNumber: windows.length,
      tabsNumber: getTabsNumber(windows),
    };
  });
</script>

<div class="w-full mt-1 flex gap-2 max-h-full">
  <Sessions
    class="w-[50%] overflow-y-auto"
    sessions={$sessionList}
    currentSession={$currentSession}
    bind:selectedSession={$selectedSession}
  />
  <Windows class="w-[50%] overflow-y-auto" session={$selectedSession} />
</div>
