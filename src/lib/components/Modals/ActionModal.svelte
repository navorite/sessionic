<script lang="ts">
  import Modal from '@components/basic/Modal.svelte';
  import { createEventDispatcher } from 'svelte';

  export let type: 'Delete' = 'Delete';

  export let open: boolean;

  const dispatch = createEventDispatcher();
</script>

<Modal bind:open>
  <svelte:fragment slot="header">{type} session</svelte:fragment>
  <p slot="content" class="font-semibold">
    Are you sure you wanna {type.toLowerCase()} this session?
  </p>
  <button
    slot="actions"
    type="button"
    title="{type} session"
    class="px-4 py-1 bg-red-700 rounded-md hover:bg-red-800"
    on:click={() => {
      dispatch('deleteAction');
    }}>{type}</button
  >
</Modal>
