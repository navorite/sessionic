<script lang="ts">
  export let open = false;

  let dialogEl: HTMLDialogElement;

  $: open ? dialogEl?.showModal() : dialogEl?.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialogEl}
  on:click|self={() => (open = false)}
  class="h-1/3 w-1/2 max-h-lg max-w-lg p-0 bg-transparent backdrop-blur rounded-md border-2 border-solid border-neutral-3"
>
  <div class="h-full w-full p-2" on:click|stopPropagation>
    <div class="flex items-center">
      <h2 class="text-lg font-bold text-neutral-2">
        <slot name="header" />
      </h2>

      <button
        type="button"
        class="px-2 bg-neutral-4 hover:bg-neutral-5 rounded-md ml-auto font-bold"
        title="Close modal"
        on:click={() => (open = false)}>X</button
      >
    </div>
    <slot name="content" />
    <div class="actions absolute bottom-2 right-2">
      <slot name="actions" />
      <button
        class="px-4 py-1 bg-neutral-4 rounded-md font-bold hover:bg-neutral-5"
        type="button"
        title="Close modal"
        on:click={() => {
          open = false;
        }}>Cancel</button
      >
    </div>
  </div>
</dialog>

<style>
  dialog::backdrop {
    backdrop-filter: blur(1px);
    background: rgba(0, 0, 0, 0.5);
  }
</style>
