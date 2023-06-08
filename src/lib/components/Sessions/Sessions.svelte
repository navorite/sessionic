<script lang="ts">
  import SessionsList from './SessionList.svelte';
  import SessionItem, { selected } from './SessionItem.svelte';
  import Windows from '../Windows/Windows.svelte';
  import { currentSession, sessions } from '@stores/sessions';
  import { filterOptions } from '@stores/settings';

  $: filtered = sessions?.filter($filterOptions?.query.trim()) || $sessions;
</script>

<div class="w-full h-full max-h-[90vh] mt-1 flex gap-2">
  <div class="w-[50%] overflow-y-auto pr-4">
    <SessionItem current session={$currentSession} />
    {#await sessions?.load()}
      <h2 class="text-lg font-bold mt-4 mb-1">Loading saved sessions...</h2>
    {:then}
      <h2 class="text-lg font-bold mt-4 mb-1">
        Sessions ({filtered?.length ?? 0})
      </h2>

      <SessionsList sessions={filtered} />
    {/await}
  </div>

  <Windows class="w-[50%] overflow-y-auto pr-4" session={$selected} />
</div>
