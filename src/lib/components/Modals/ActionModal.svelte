<script lang="ts">
  import Modal from '@components/basic/Modal.svelte';
  import { createEventDispatcher } from 'svelte';

  export let type: 'Delete' = 'Delete';

  export let open: boolean;

  const dispatch = createEventDispatcher();
</script>

<Modal bind:open>
  <svelte:fragment slot="header">{type} session</svelte:fragment>
  <p slot="content">
    Are you sure you wanna {type.toLowerCase()} this session?
  </p>
  <button
    slot="footer"
    type="button"
    title="{type} session"
    class="px-4 py-1 bg-error rounded-md hover:bg-error-focus"
    on:click={() => {
      dispatch('deleteAction');
    }}>{type}</button
  >
</Modal>
