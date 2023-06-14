<script lang="ts">
  import Session from './Session.svelte';
  import CurrentSession from './Current.svelte';
  import Windows from '../Windows/Windows.svelte';
  import InputModal from '@components/Modals/InputModal.svelte';
  import ActionModal from '@components/Modals/ActionModal.svelte';
  import sessions from '@stores/sessions';
  import { filterOptions } from '@stores/settings';
  import { session as currentSession } from '@components/Sessions/Current.svelte';
  import VirtualList from '@components/basic/VirtualList.svelte';

  let selected: ESession;

  sessions.load();

  function selectSession(session: ESession) {
    selected = session;
  }

  let modalShow = false;
  let actionShow = false;

  $: filtered =
    sessions?.filter($filterOptions?.query.trim().toLowerCase()) || $sessions;
</script>

<div class="w-full h-full max-h-[90vh] mt-1 flex gap-2 overflow-hidden">
  <div class="w-[50%] max-w-md h-full flex flex-col">
    <CurrentSession
      selected={$currentSession === selected}
      on:click={() => {
        selectSession($currentSession);
      }}
      on:change={(event) => {
        event.detail.selected && selectSession($currentSession);
      }}
      on:save={(event) => {
        selectSession(event.detail.session);
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
        class="flex-1 pr-4"
      >
        <Session
          session={item}
          on:click={async () => {
            selectSession(item);
          }}
          selected={item === selected}
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
    class="flex-1 overflow-y-auto pr-4"
    session={selected}
    on:delete={async (event) => {
      const target = event.detail.window;
      const index = selected.windows.indexOf(target);

      if (index === -1) return;

      selected.windows = selected.windows.slice(0);
      selected.windows[index] = { ...selected.windows[index] };

      if (event.detail.tab) {
        const tabIndex = selected.windows[index].tabs.indexOf(event.detail.tab);

        if (tabIndex === -1) return;

        selected.windows[index].tabs = selected.windows[index].tabs.slice(0);
        selected.windows[index].tabs.splice(tabIndex, 1);

        if (!selected.windows[index].tabs.length)
          selected.windows.splice(index, 1);

        selected.tabsNumber--;
      } else {
        selected.windows.splice(index, 1);
        selected.tabsNumber -= event.detail.window.tabs.length;
      }

      if (selected === $currentSession) {
        $currentSession = $currentSession;
        return;
      }

      selected.dateModified = new Date().getTime();

      await sessions.put(selected);
    }}
  />
</div>

<InputModal
  bind:open={modalShow}
  type="Rename"
  value={selected?.title}
  on:inputSubmit={async (event) => {
    if (selected.title !== event.detail.value) {
      selected.title = event.detail.value;

      await sessions.put(selected);
    }

    modalShow = false;
  }}
/>

<ActionModal
  bind:open={actionShow}
  on:deleteAction={() => {
    sessions.remove(selected);

    selectSession($currentSession);
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
