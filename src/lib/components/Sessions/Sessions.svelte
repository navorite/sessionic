<script lang="ts">
  import VirtualList from '@components/basic/VirtualList.svelte';
  import Session from './Session.svelte';
  import CurrentSession from './Current.svelte';
  import Windows from '../Windows/Windows.svelte';
  import InputModal from '@components/Modals/InputModal.svelte';
  import ActionModal from '@components/Modals/ActionModal.svelte';
  import sessions from '@stores/sessions';
  import { filterOptions } from '@stores/settings';

  let modalShow = false;
  let actionShow = false;

  $: selected = sessions.selection;

  $: filtered =
    sessions?.filter($filterOptions?.query.trim().toLowerCase()) || $sessions;
</script>

<div class="w-full h-full max-h-[90vh] mt-2 flex gap-2 overflow-hidden">
  <div class="w-[50%] max-w-md h-full flex flex-col">
    <CurrentSession />

    <h2 class="text-lg font-semibold mb-1">
      Sessions ({filtered?.length ?? 'Loading saved sessions...'})
    </h2>

    {#if filtered}
      <VirtualList reversed={true} items={filtered} let:item class="flex-1">
        <Session
          session={item}
          on:renameModal={() => {
            modalShow = true;
          }}
          on:deleteModal={() => {
            actionShow = true;
          }}
        />
      </VirtualList>
    {/if}
  </div>

  <Windows class="flex-1" />
</div>

<InputModal
  bind:open={modalShow}
  type="Rename"
  value={$selected?.title}
  on:inputSubmit={async (event) => {
    if ($selected.title !== event.detail.value) {
      $selected.title = event.detail.value;

      await sessions.put($selected);
    }

    modalShow = false;
  }}
/>

<ActionModal
  bind:open={actionShow}
  on:deleteAction={() => {
    sessions.remove($selected);

    actionShow = false;
  }}
/>
