<script lang="ts">
  import type { Session } from '../types/extension';
  import WindowItem from './WindowItem.svelte';

  export let session: Session;

  let className = '';

  export { className as class };
</script>

{#if session}
  <ul class={className}>
    {#each session.windows as window}
      <li>
        <WindowItem {window} />
      </li>
    {/each}
  </ul>
{/if}
