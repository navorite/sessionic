<script lang="ts">
  import VirtualList from '@components/basic/VirtualList.svelte';
  import Session from './Session.svelte';
  import CurrentSession, { currentSession } from './Current.svelte';
  import Windows from '../Windows/Windows.svelte';
  import InputModal from '@components/Modals/InputModal.svelte';
  import ActionModal from '@components/Modals/ActionModal.svelte';
  import sessions from '@stores/sessions';
  import { filterOptions } from '@stores/settings';
  import { notification } from '@stores/notification';
  import { notifications } from '@constants/notifications';

  let modalShow = false;
  let modalType: 'Save' | 'Rename' = 'Rename';

  let actionShow = false;

  let scrollTo: (x: number, y: number) => void;

  $: selection = sessions.selection;

  $: filtered =
    sessions?.filter($filterOptions?.query.trim().toLowerCase()) || $sessions;
</script>

<div class="w-full h-full max-h-[90vh] mt-2 flex gap-2 overflow-hidden">
  <div class="w-[50%] max-w-md h-full flex flex-col">
    <CurrentSession
      on:click={() => {
        modalType = 'Save';
        modalShow = true;
      }}
    />

    <h2 class="text-lg font-semibold mb-1">
      Sessions ({filtered?.length ?? 'Loading saved sessions...'})
    </h2>

    {#if filtered}
      <VirtualList
        reversed={true}
        items={filtered}
        let:item
        class="flex-1"
        bind:scrollTo
      >
        <Session
          session={item}
          on:renameModal={() => {
            modalType = 'Rename';
            modalShow = true;
          }}
          on:deleteModal={() => (actionShow = true)}
        />
      </VirtualList>
    {/if}
  </div>

  <Windows class="flex-1" />
</div>

<InputModal
  bind:open={modalShow}
  type={modalType}
  on:inputSubmit={async (event) => {
    if (modalType === 'Rename' && $selection.title !== event.detail) {
      $selection.title = event.detail;
      await sessions.put($selection);

      $notification = notifications.rename.success;
    } else if (modalType === 'Save') {
      $currentSession.title = event.detail;

      await sessions.add($currentSession);
      scrollTo(0, 0);

      $notification = notifications.save.success;
    }

    modalShow = false;
  }}
/>

<ActionModal
  bind:open={actionShow}
  on:deleteAction={async () => {
    await sessions.remove($selection);

    $notification = notifications.remove.success;

    selection.select($currentSession);

    actionShow = false;
  }}
/>
