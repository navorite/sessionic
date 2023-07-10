<script lang="ts">
  import { fade } from 'svelte/transition';

  export let open = false;

  export let height = '10rem';

  let dialogEl: HTMLDialogElement;

  $: open ? dialogEl?.showModal() : dialogEl?.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialogEl}
  on:mousedown|self={() => (open = false)}
  on:keydown={(event) => {
    if (event.key === 'Escape') open = false;
  }}
  class="max-h-lg max-w-lg p-0 bg-transparent backdrop-blur rounded-md border-2 border-solid border-neutral-5 outline-none"
>
  <div
    style:height
    class="min-w-[16rem] min-h-[10rem] w-full h-full py-2 px-4 flex flex-col gap-4"
    on:click|stopPropagation
  >
    {#if $$slots.header}
      <div class="flex items-center">
        <h3 class="text-lg font-semibold text-neutral">
          <slot name="header" />
        </h3>

        <button
          type="button"
          class="px-2 border-2 border-neutral-3 text-neutral rounded-md ml-auto font-bold hover:text-error-focus"
          title="Close modal"
          on:click={() => (open = false)}>X</button
        >
      </div>
    {/if}

    <slot name="content" />

    {#if $$slots.footer}
      <div class="ml-auto mt-auto font-semibold flex gap-2">
        <button
          class="px-4 py-1 bg-neutral-4 rounded-md hover:bg-neutral-5"
          type="button"
          title="Cancel"
          on:click={() => {
            open = false;
          }}>Cancel</button
        >
        <slot name="footer" />
      </div>
    {/if}
  </div>
</dialog>

<style>
  dialog::backdrop {
    backdrop-filter: blur(1px);
    background: rgba(0, 0, 0, 0.5);
  }
</style>
