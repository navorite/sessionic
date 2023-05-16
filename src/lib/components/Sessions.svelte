<script lang="ts">
  import type { Session } from '../types/extension';
  import SessionItem from './SessionItem.svelte';

  export let sessions: Session[];
  export let currentSession: Session;
  export let selectedSession: Session;

  let className = '';
  export { className as class };
</script>

<ul class={className}>
  <li>
    <SessionItem
      current
      session={currentSession}
      selected={selectedSession?.id === currentSession?.id}
      on:click={() => {
        selectedSession = currentSession;
      }}
    />
  </li>

  <h2 class="text-lg font-bold mt-4 mb-1">
    Saved Sessions ({sessions?.length || 0})
  </h2>
  {#if sessions?.length}
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
  {/if}
</ul>
