<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Modal } from '@/lib/components';
  import { i18n } from 'webextension-polyfill';

  export let open: boolean;

  const dispatch = createEventDispatcher();
</script>

<Modal bind:open>
  <svelte:fragment slot="header"
    >{i18n.getMessage('deleteModalTitle')}</svelte:fragment
  >
  <p slot="content" class="font-semibold">
    {i18n.getMessage('deleteModalContent')}
  </p>
  <button
    slot="footer"
    type="button"
    class="rounded-md bg-error px-4 py-1 hover:bg-error-focus"
    on:click={() => {
      dispatch('deleteAction');
    }}>{i18n.getMessage('labelDelete')}</button
  >
</Modal>
