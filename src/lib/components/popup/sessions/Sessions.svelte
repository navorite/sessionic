<script lang="ts">
  import { currentSession, filtered, sessions, settings } from '@/lib/stores';
  import {
    VirtualList,
    Windows,
    InputModal,
    ActionModal,
    TagsModal,
    Session,
    CurrentSession
  } from '@/lib/components';
  import { isInputTarget } from '@/lib/utils';

  $: selection = sessions.selection;

  $: if ($selection && typeof scrollToIndex !== 'undefined' && !isScrolled) {
    isScrolled = true;
    scrollToIndex($sessions.indexOf($selection));
  }

  let modalShow = false;
  let modalType: 'Save' | 'Rename' = 'Rename';

  let actionShow = false;

  let scrollToIndex: (index: number) => void;

  let isScrolled = false;

  let tagsShow = false;

  async function saveSession(title: string) {
    $currentSession.title = title;

    await sessions.add($currentSession);

    scrollToIndex($sessions.length);
  }

  export function saveAction() {
    modalType = 'Save';
    if ($settings.doNotAskForTitle) return saveSession('Unnamed session');

    modalShow = true;
  }

  async function handleKeydown(ev: KeyboardEvent) {
    if (
      (ev.target instanceof HTMLElement && isInputTarget(ev.target)) ||
      ev.repeat ||
      ev.ctrlKey ||
      ev.shiftKey ||
      ev.altKey ||
      ev.metaKey
    )
      return;

    switch (ev.code) {
      case 'KeyS':
        saveAction();
        break;

      case 'KeyC':
        selection.select($currentSession);
        break;

      case 'KeyE': {
        const sessions = await $filtered;

        let index =
          sessions.findIndex((session) => session.id === $selection.id) + 1;

        if (index >= sessions.length || index <= 0) index = 0;

        selection.select(sessions[index]!);
        scrollToIndex(index);
        break;
      }

      case 'KeyD': {
        const sessions = await $filtered;

        let index =
          sessions.findIndex((session) => session.id === $selection.id) - 1;

        if (index <= -1) index = sessions.length - 1;

        console.log(index);

        selection.select(sessions[index]!);

        scrollToIndex(index);
        break;
      }

      case 'KeyR':
        modalType = 'Rename';
        modalShow = true;
        break;

      case 'Delete':
        sessions.remove($selection);
        break;

      default:
        return;
    }

    ev.preventDefault();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="mt-2 flex h-full max-h-[90vh] w-full gap-2 overflow-hidden">
  <div class="flex h-full max-w-xs flex-1 flex-col">
    <CurrentSession on:save={saveAction} />

    {#await $filtered}
      <p class="mt-2 text-center font-normal">Looking for sessions...</p>
    {:then filtered}
      {#if filtered}
        <VirtualList
          reversed={true}
          items={filtered}
          let:item
          class="flex-1"
          bind:scrollToIndex
        >
          <Session
            session={item}
            on:renameModal={() => {
              modalType = 'Rename';
              modalShow = true;
            }}
            on:deleteModal={() => (actionShow = true)}
            on:tagsModal={() => (tagsShow = true)}
          />
        </VirtualList>
      {:else}
        <p class="mt-2 text-center font-normal">No sessions were found</p>
      {/if}
    {/await}
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
      saveSession(event.detail);
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

<TagsModal
  bind:open={tagsShow}
  on:tagSubmit={(event) => {
    const tag = event.detail;

    $selection.tags = tag;

    sessions.put($selection);
  }}
/>
