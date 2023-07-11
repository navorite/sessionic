<script lang="ts">
  import IconButton from '@components/IconButton.svelte';

  export let open = false;

  export let height = '10rem';

  let dialogEl: HTMLDialogElement;

  $: open ? dialogEl?.showModal() : dialogEl?.close();
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialogEl}
  class="max-h-lg max-w-lg p-0 bg-transparent backdrop-blur rounded-md border-2 border-solid border-neutral-5 outline-none"
  on:mousedown|self={() => (open = false)}
  on:keydown={(event) => {
    if (event.key === 'Escape') open = false;
  }}
>
  <div
    role="none"
    style:height
    class="min-w-[16rem] min-h-[10rem] w-full h-full py-2 px-4 flex flex-col gap-4"
    on:click|stopPropagation
  >
    {#if $$slots.header}
      <div class="flex items-center">
        <h3 class="text-lg font-semibold text-neutral">
          <slot name="header" />
        </h3>

        <IconButton
          icon="close"
          title="Close"
          class="ml-auto text-2xl hover:text-error-focus"
          on:click={() => (open = false)}
        />
      </div>
    {/if}

    <slot name="content" />

    {#if $$slots.footer}
      <div class="ml-auto mt-auto font-semibold flex gap-2">
        <button
          class="px-4 py-1 bg-neutral-4 rounded-md hover:bg-neutral-5"
          type="button"
          title="Cancel"
          on:click={() => (open = false)}>Cancel</button
        >
        <slot name="footer" />
      </div>
    {/if}
  </div>
</dialog>

<style>
  dialog::backdrop {
    backdrop-filter: blur(1px);
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>
