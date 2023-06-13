<script lang="ts">
  import Modal from '@components/basic/Modal.svelte';
  import { createEventDispatcher } from 'svelte';
  import { tick } from 'svelte';

  export let type: 'Save' | 'Rename';

  export let value = '';

  export let open: boolean;

  export let minlength = 3;
  export let maxlength = 40;

  let inputEl: HTMLInputElement;

  $: if (open)
    tick().then(() => {
      inputEl?.focus();
    });

  const dispatch = createEventDispatcher();
</script>

<Modal bind:open>
  <svelte:fragment slot="header">{type} session</svelte:fragment>
  <input
    bind:this={inputEl}
    class="font-semibold bg-transparent outline-none border-2 border-solid border-neutral-8 rounded-md py-1 px-2 w-[24rem]"
    slot="content"
    type="text"
    name={type}
    id={type}
    placeholder="Enter session name..."
    title="Session name"
    spellcheck={false}
    {minlength}
    {maxlength}
    bind:value
    on:keydown={(event) => {
      if (event.key === 'Enter') dispatch('inputSubmit', { value });
    }}
  />
  <button
    disabled={value?.length < minlength || value?.length > maxlength}
    title="{type} session"
    slot="footer"
    type="button"
    class="px-4 py-1 bg-primary-8 rounded-md hover:bg-primary-9 disabled:bg-neutral-3 disabled:text-neutral-7"
    on:click={() => {
      dispatch('inputSubmit', { value });
      value = '';
    }}>{type}</button
  >
</Modal>
