<script lang="ts">
  import type { Session } from '../types/extension';
  import SessionItem from './SessionItem.svelte';

  export let sessions: Session[];
  export let currentSession: Session;
  export let selectedSession: Session;

  let className = '';
  export { className as class };
</script>

<div class={className}>
  <SessionItem
    current
    session={currentSession}
    selected={selectedSession?.id === currentSession?.id}
    on:click={() => {
      selectedSession = currentSession;
    }}
  />

  <h2 class="text-lg font-bold mt-4 mb-1">Saved Sessions</h2>

  {#if sessions?.length}
    <ul>
      {#each sessions as session (session.id)}
        <li>
          <SessionItem
            {session}
            selected={selectedSession?.id === session?.id}
            on:click={() => {
              selectedSession = session;
            }}
          />
        </li>
      {/each}
    </ul>
  {/if}
</div>
