<script lang="ts">
  import { fade } from 'svelte/transition';

  export let title: string;

  export let x: number;
  export let y: number;

  export let delay = 100;
  export let duration = 100;

  export let show = false;

  export let noSpace = false;
</script>

{#if show}
  {#key title}
    <div
      style="position:absolute;top:{y}px;left:{x}px;translate:{noSpace
        ? '-100%'
        : '-50%'} 0%"
      class="whitespace-nowrap bg-[rgba(0,0,0,0.85)] text-white font-semibold text-sm border-neutral-5 border-solid border rounded-md py-1 px-2"
      transition:fade|global={{ delay, duration }}
    >
      {title}
    </div>
  {/key}
{/if}
