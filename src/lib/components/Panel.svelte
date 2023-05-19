<script lang="ts">
  import {
    currentSession,
    selectedSession,
    sessionList,
  } from '@stores/session';
  import { loadSessions } from '@utils/actions';
  import { getAllWindows, getTabsNumber } from '@utils/browser';
  import Sessions from './Sessions.svelte';
  import Windows from './Windows.svelte';

  loadSessions();

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
    sessions={$sessionList?.filteredSessions}
    currentSession={$currentSession}
    bind:selectedSession={$selectedSession}
  />
  <Windows class="w-[50%] overflow-y-auto pr-4" session={$selectedSession} />
</div>
