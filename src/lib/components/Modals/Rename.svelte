<script>
  import Modal from '@components/basic/Modal.svelte';

  export let open;
</script>

<Modal bind:open>
  <svelte:fragment slot="header">Rename session</svelte:fragment>
  <button
    type="button"
    slot="actions"
    class="px-4 py-1 bg-primary-4 rounded-md font-bold hover:bg-primary-5"
    >Rename</button
  >
</Modal>
