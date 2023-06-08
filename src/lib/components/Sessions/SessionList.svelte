<script lang="ts">
  import SessionItem from './SessionItem.svelte';
  import type { Session } from 'src/lib/types/extension';

  export let sessions: Session[];
</script>

{#if sessions}
  {#each sessions as _, i (i)}
    <SessionItem session={sessions[sessions.length - i - 1]} />
  {/each}
{/if}
