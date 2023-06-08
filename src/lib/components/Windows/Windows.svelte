<script lang="ts">
  import ListView from '@components/basic/List/ListView.svelte';
  import type { Session } from '../../types/extension';
  import Window from './Window.svelte';

  export let session: Session;

  let className = '';

  export { className as class };
</script>

{#if session}
  <ListView class={className}>
    {#each session.windows as window}
      <Window {window} on:delete />
    {/each}
  </ListView>
{/if}
