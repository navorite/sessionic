<script lang="ts">
  import type { ENotification } from '@/lib/types';
  import { slide } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import { IconButton } from '@/lib/components';

  export let detail: ENotification;

  export let slideDuration = 400;

  $: show = !!detail;

  let timeout: NodeJS.Timeout;

  let color: string;

  $: {
    if (detail?.type === 'info') color = 'bg-info text-white';
    else if (detail?.type === 'success') color = 'bg-success text-black';
    else if (detail?.type === 'warning') color = 'bg-warning text-black';
    else color = 'bg-error text-white';
  }

  $: if (show) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      show = false;
    }, detail?.duration ?? 4000);
  }
</script>

{#if show && detail}
  {#key detail}
    <div
      class="flex h-max max-h-full w-max items-center gap-2 rounded-md px-2 py-1 {color} text-sm font-semibold"
      transition:slide|global={{ duration: slideDuration, easing: cubicInOut }}
    >
      <h2 class="whitespace-nowrap">
        {detail.msg}
      </h2>

      <div class="bg-overlay-black rounded-md p-0.5">
        <IconButton
          icon="close"
          class="ml-auto text-lg hover:text-error-focus"
          on:click={() => (show = false)}
        />
      </div>
    </div>
  {/key}
{/if}
