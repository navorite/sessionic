<script lang="ts" context="module">
  import { writable, type Writable } from 'svelte/store';

  export const selected: Writable<Session> = writable();
</script>

<script lang="ts">
  import IconButton from '../IconButton.svelte';
  import type { Session } from '../../types/extension';
  import { sessions, currentSession } from '@stores/sessions';
  import { fade } from 'svelte/transition';

  // TODO: optimize updates
  // function flash(element) {
  //   let timeout;
  //   const color = element.style.backgroundColor;
  //   beforeUpdate(() => {
  //     requestAnimationFrame(() => {
  //       element.style.backgroundColor = 'red';

  //       if (timeout) clearTimeout(timeout);

  //       timeout = setTimeout(() => {
  //         element.style.backgroundColor = color;
  //       }, 600);
  //     });
  //   });
  // }

  export let session: Session;
  export let current = false;

  let hover = false;

  function handleChange(event) {
    session.title = (event?.currentTarget as HTMLInputElement)?.textContent;
    event.currentTarget.contentEditable = 'false';
  }

  async function handleSave() {
    if (session.title === '') return;

    const date = new Date().getTime();

    await sessions.add({
      ...$currentSession,
      title: session.title,
      dateSaved: date,
      dateModified: date,
      id: crypto.randomUUID(),
    });
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
  transition:fade
  class="session__container {$selected === session ? '!bg-primary-5' : ''}"
  tabindex="0"
  on:click={() => {
    if ($selected !== session) {
      $selected = session;
    }
  }}
  on:mouseover={() => {
    hover = true;
  }}
  on:mouseleave={() => {
    hover = false;
  }}
>
  <div class="session__info">
    <div
      title="Open Session"
      class="session__input"
      on:click={(event) => (event.currentTarget.contentEditable = 'true')}
      spellcheck={false}
      on:blur={handleChange}
    >
      {session?.title}
    </div>

    {#if current}
      <IconButton
        icon="save"
        title="Save session"
        class="ml-auto text-2xl hover:text-primary-pure-1"
        on:click={handleSave}
      />
    {:else if !current && hover}
      <IconButton
        icon="delete"
        title="Remove this window from session"
        class="ml-auto text-2xl text-red-500 hover:text-red-800"
        on:click={() => sessions.remove(session)}
      />
    {/if}
  </div>

  <p title="Session Details" class="session__card">
    {session?.windowsNumber} Window{session?.windowsNumber > 1 ? 's' : ''} - {session?.tabsNumber}
    Tab{session?.tabsNumber > 1 ? 's' : ''}
    {#if session?.dateSaved && !current}
      -
      {@const date = new Date(session.dateSaved)}
      {date.toLocaleString([], { timeStyle: 'short', dateStyle: 'short' })}
    {/if}
  </p>
</div>

<style>
  .session__container {
    @apply w-full px-2 py-1 mb-2 rounded-md bg-neutral-3 cursor-pointer;
  }

  .session__container:hover {
    @apply bg-primary-4;
  }

  .session__info {
    @apply flex items-center w-full gap-2 mb-1;
  }

  .session__input {
    @apply w-max max-w-[60%] p-1 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer;
  }

  .session__input:hover {
    @apply underline;
  }

  .session__card {
    @apply max-w-max bg-overlay-black-8 p-2 rounded text-xs font-bold m-0.5;
  }
</style>
