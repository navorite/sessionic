<script lang="ts">
  import { sessions, currentSession } from '@stores/sessions';
  import SessionItem, { selected } from './SessionItem.svelte';
  import Windows from '../Windows/Windows.svelte';

  $: sessionList = $sessions?.filtered;
</script>

<div class="w-full h-full max-h-[90vh] mt-1 flex gap-2">
  <div class="w-[50%] overflow-y-auto pr-4">
    <SessionItem current session={$currentSession} />

    {#await sessions.load()}
      <h2 class="text-lg font-bold mt-4 mb-1">Loading saved sessions...</h2>
    {:then}
      <h2 class="text-lg font-bold mt-4 mb-1">
        Sessions ({sessionList.length ?? 0})
      </h2>

      {#each sessionList as _, i (i)}
        <SessionItem session={sessionList[sessionList.length - i - 1]} />
      {/each}
    {/await}
  </div>

  <Windows class="w-[50%] overflow-y-auto pr-4" session={$selected} />
</div>
