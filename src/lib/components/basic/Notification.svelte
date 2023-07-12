<script lang="ts">
  import { slide } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import IconButton from '@components/IconButton.svelte';

  export let detail: ENotification;

  export let slideDuration = 400;

  $: show = !!detail;

  let timeout: number | NodeJS.Timeout;

  let color: string;

  $: {
    if (detail?.type === 'info') color = 'bg-primary text-white';
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
      class="h-max w-max max-h-full py-1 px-2 rounded-md flex items-center gap-2 {color}"
      transition:slide|global={{ duration: slideDuration, easing: cubicInOut }}
    >
      <h2 class="font-semibold">
        {detail.msg}
      </h2>

      <div class="bg-overlay-black p-0.5 rounded-md">
        <IconButton
          icon="close"
          class="ml-auto text-xl hover:text-error-focus"
          on:click={() => (show = false)}
        />
      </div>
    </div>
  {/key}
{/if}
