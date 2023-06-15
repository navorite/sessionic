<script lang="ts" context="module">
  import { writable, type Writable } from 'svelte/store';

  export const selectedSession = (() => {
    const { subscribe, set }: Writable<ESession> = writable();

    return {
      subscribe,
      select(session: ESession) {
        set(session);
      },
    };
  })();
</script>

<script lang="ts">
  import Session from './Session.svelte';
  import CurrentSession from './Current.svelte';
  import Windows from '../Windows/Windows.svelte';
  import InputModal from '@components/Modals/InputModal.svelte';
  import ActionModal from '@components/Modals/ActionModal.svelte';
  import VirtualList from '@components/basic/VirtualList.svelte';
  import sessions from '@stores/sessions';
  import { currentSession } from '@components/Sessions/Current.svelte';
  import { filterOptions } from '@stores/settings';

  sessions.load();

  let modalShow = false;
  let actionShow = false;

  $: filtered =
    sessions?.filter($filterOptions?.query.trim().toLowerCase()) || $sessions;
</script>

<div class="w-full h-full max-h-[90vh] mt-1 flex gap-2 overflow-hidden">
  <div class="w-[50%] max-w-md h-full flex flex-col">
    <CurrentSession
      selected={$currentSession === $selectedSession}
      on:click={() => {
        selectedSession.select($currentSession);
      }}
    />

    <h2 class="text-lg font-semibold mb-1">
      Sessions ({filtered?.length ?? 'Loading saved sessions...'})
    </h2>

    {#if filtered}
      <VirtualList reversed={true} items={filtered} let:item class="flex-1">
        <Session
          session={item}
          on:click={async () => {
            selectedSession.select(item);
          }}
          selected={item === $selectedSession}
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

  <Windows
    class="flex-1"
    session={$selectedSession}
    current={$selectedSession === $currentSession}
    on:delete={async () => {
      $selectedSession.dateModified = Date.now();

      await sessions.put($selectedSession);

      if (!($selectedSession.windows.length && $selectedSession.tabsNumber))
        $selectedSession = $currentSession;
    }}
  />
</div>

<InputModal
  bind:open={modalShow}
  type="Rename"
  value={$selectedSession?.title}
  on:inputSubmit={async (event) => {
    if ($selectedSession.title !== event.detail.value) {
      $selectedSession.title = event.detail.value;

      await sessions.put($selectedSession);
    }

    modalShow = false;
  }}
/>

<ActionModal
  bind:open={actionShow}
  on:deleteAction={() => {
    sessions.remove($selectedSession);

    selectedSession.select($currentSession);
    actionShow = false;
  }}
/>

<!-- <InputModal
  bind:open={modalShow}
  type={modalType}
  value={modalSession?.title}
  on:inputSubmit={async (event) => {
    if (
      modalSession.title !== event.detail.value ||
      modalSession === $currentSession
    ) {
      modalSession.title = event.detail.value;

      if (modalSession === $currentSession) {
        await sessions.add(await generateSession(modalSession));
        selectSession(filtered[filtered.length - 1]);
      } else await sessions.put(modalSession);
    }

    modalShow = false;
  }}
/>  -->
