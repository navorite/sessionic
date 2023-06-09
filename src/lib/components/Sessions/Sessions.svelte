<script lang="ts">
  import Session from './Session.svelte';
  import Windows from '../Windows/Windows.svelte';
  import type { Session as SessionType } from '../../types/extension';
  import { currentSession, sessions } from '@stores/sessions';
  import { filterOptions } from '@stores/settings';
  import ListView from '@components/basic/List/ListView.svelte';
  import CurrentSession from './Current.svelte';
  import InputModal from '@components/Modals/InputModal.svelte';
  import { generateSession } from '@utils/generateSession';

  let selected: SessionType;

  currentSession.load().then(() => {
    selectSession($currentSession);
  });

  function selectSession(session: SessionType) {
    selected = session;
  }

  let modalSession: SessionType;
  let modalType: 'Save' | 'Rename' = 'Save';
  let modalShow = false;

  $: filtered =
    sessions?.filter($filterOptions?.query.trim().toLowerCase()) || $sessions;
</script>

<InputModal
  bind:open={modalShow}
  type={modalType}
  value={modalSession?.title}
  on:inputSubmit={async (event) => {
    modalSession.title = event.detail.value;

    if (modalSession === $currentSession)
      sessions.add(await generateSession(modalSession));
    else await sessions.put(modalSession);

    modalShow = false;
  }}
/>

<div class="w-full h-full max-h-[90vh] mt-1 flex gap-2">
  <div class="w-[50%] h-full flex flex-col">
    <CurrentSession
      session={$currentSession}
      selected={$currentSession === selected}
      on:click={() => selectSession($currentSession)}
      on:saveModal={() => {
        modalType = 'Save';
        modalShow = true;
        modalSession = $currentSession;
      }}
    />

    <h2 class="text-lg font-bold mb-1">
      Sessions ({filtered?.length ?? 'Loading saved sessions...'})
    </h2>

    {#await sessions?.load() then}
      <ListView class="flex-1 overflow-y-auto pr-4">
        {#if filtered}
          {#each filtered as _, i (i)}
            {@const session = filtered[filtered.length - i - 1]}

            <Session
              {session}
              on:click={() => selectSession(session)}
              selected={session === selected}
              on:renameModal={() => {
                modalShow = true;
                modalType = 'Rename';
                modalSession = session;
              }}
            />
          {/each}
        {/if}
      </ListView>
    {/await}
  </div>

  <Windows
    class="w-[50%] overflow-y-auto pr-4"
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

      if (selected === $currentSession) return;

      selected.dateModified = new Date().getTime();

      await sessions.put(selected);
    }}
  />
</div>
