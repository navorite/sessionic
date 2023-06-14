<script lang="ts">
  import { isExtensionReady } from '@utils/extension';
  import type { Session } from '../../types/extension';
  import Window from './Window.svelte';

  export let session: Session;

  let className = '';

  export { className as class };
</script>

{#if session && isExtensionReady()}
  <ul class={className}>
    {#each session.windows as window}
      <Window {window} on:delete />
    {/each}
  </ul>
{:else}
  <h2 class="text-lg font-bold mb-1 text-center">
    Start opening some tabs to view them here!
  </h2>
{/if}
