<script lang="ts" context="module">
  export const filtered: Writable<ESession[]> = writable();
</script>

<script lang="ts">
  import VirtualList from '@components/basic/VirtualList.svelte';
  import Session from './Session.svelte';
  import CurrentSession, { currentSession } from './Current.svelte';
  import Windows from '../Windows/Windows.svelte';
  import InputModal from '@components/Modals/InputModal.svelte';
  import ActionModal from '@components/Modals/ActionModal.svelte';
  import sessions from '@stores/sessions';
  import { filterOptions } from '@stores/settings';
  import { writable, type Writable } from 'svelte/store';

  let modalShow = false;
  let modalType: 'Save' | 'Rename' = 'Rename';

  let actionShow = false;

  let scrollTo: (x: number, y: number) => void;

  $: selection = sessions.selection;

  $: $filtered =
    sessions?.filter($filterOptions?.query.trim().toLowerCase()) || $sessions;
</script>

<div class="w-full h-full max-h-[90vh] mt-2 flex gap-2 overflow-hidden">
  <div class="max-w-xs flex-1 h-full flex flex-col">
    <CurrentSession
      on:click={() => {
        modalType = 'Save';
        modalShow = true;
      }}
    />

    {#if $filtered}
      <VirtualList
        reversed={true}
        items={$filtered}
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
    } else if (modalType === 'Save') {
      $currentSession.title = event.detail;

      await sessions.add($currentSession);
      scrollTo(0, 0);
    }

    modalShow = false;
  }}
/>

<ActionModal
  bind:open={actionShow}
  on:deleteAction={async () => {
    await sessions.remove($selection);

    selection.select($currentSession);

    actionShow = false;
  }}
/>
