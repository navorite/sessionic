<script lang="ts">
  import type { Session } from '../types/extension';
  import WindowItem from './WindowItem.svelte';

  export let session: Session;

  let className = '';

  export { className as class };
</script>

{#if session}
  <div class={className}>
    {#each session.windows as window}
      <WindowItem {window} />
    {/each}
  </div>
{/if}
