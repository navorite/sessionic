<script lang="ts">
  import Modal from '@components/basic/Modal.svelte';
  import { createEventDispatcher } from 'svelte';

  export let type: 'Save' | 'Rename';

  export let value = '';

  export let open;

  const dispatch = createEventDispatcher();
</script>

<Modal bind:open>
  <svelte:fragment slot="header">{type} session</svelte:fragment>
  <input
    class="font-semibold bg-transparent outline-none border-2 border-solid border-neutral-8 rounded-md py-1 px-2 w-[24rem]"
    slot="content"
    type="text"
    name={type}
    id={type}
    placeholder="Session name..."
    spellcheck={false}
    minlength="5"
    maxlength="40"
    bind:value
  />
  <button
    disabled={value.length < 5 || value.length > 40}
    slot="actions"
    type="button"
    class="px-4 py-1 bg-primary-8 rounded-md hover:bg-primary-9 disabled:bg-neutral-3 disabled:text-neutral-7"
    on:click={() => {
      dispatch('inputSubmit', { value });
    }}>{type}</button
  >
</Modal>
