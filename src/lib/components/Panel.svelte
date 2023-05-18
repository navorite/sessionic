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

    $selectedSession = $currentSession;
  });
</script>

<div class="w-full h-full max-h-[90vh] mt-1 flex gap-2">
  <Sessions
    class="w-[50%] overflow-y-auto pr-4"
    sessions={$sessionList}
    currentSession={$currentSession}
    bind:selectedSession={$selectedSession}
  />
  <Windows class="w-[50%] overflow-y-auto pr-4" session={$selectedSession} />
</div>
