<script lang="ts">
  import IconButton from './IconButton.svelte';
  import type { Session } from '../types/extension';
  import { currentSession } from '@stores/session';
  import { saveSession, removeSession } from '@utils/actions';
  import log from '@utils/log';

  export let session: Session;
  export let selected: boolean = false;
  export let current = false;

  function handleChange(event) {
    session.title = (event.currentTarget as HTMLInputElement)?.textContent;
    event.currentTarget.contentEditable = 'false';
  }

  async function handleSave() {
    if (session.title === '') return;

    log.info('handleSave(): inside');

    const date = new Date().getTime();

    await saveSession({
      ...$currentSession,
      title: session.title,
      dateSaved: date,
      dateModified: date,
      id: crypto.randomUUID(),
    });

    log.info('handleSave(): saved to DB');
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  class="w-full px-2 py-1 mb-2 rounded-md group/w bg-neutral-3 {selected
    ? 'bg-primary-5'
    : 'hover:bg-primary-4'} cursor-pointer"
  tabindex="0"
  on:click
>
  <div class="flex items-center w-full gap-2 mb-1">
    <IconButton
      icon="session"
      title="Session: {session?.title}"
      class="text-2xl"
    />

    <!-- svelte-ignore a11y-click-events-h  ave-key-events -->
    <div
      title="Open Session"
      class="w-max max-w-[60%] overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer hover:underline p-1"
      on:click={(event) => (event.currentTarget.contentEditable = 'true')}
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
    {:else}
      <IconButton
        icon="delete"
        title="Remove this window from session"
        class="invisible ml-auto text-2xl hover:text-warning-pure-1 group-hover/w:visible"
        on:click={() => removeSession(session.id)}
      />
    {/if}
  </div>

  <span
    title="Number of Windows"
    class="bg-overlay-black-8 py-0.5 px-2 rounded text-xs font-bold"
  >
    {session?.windowsNumber} Window{session?.windowsNumber > 1 ? 's' : ''}
  </span>

  <span
    title="Number of Tabs"
    class="bg-overlay-black-8 py-0.5 px-2 rounded text-xs font-bold"
  >
    {session?.tabsNumber} Tab{session?.tabsNumber > 1 ? 's' : ''}
  </span>

  {#if session?.dateSaved && !current}
    {@const date = new Date(session?.dateSaved)}
    <span
      title="Date of Session"
      class="bg-overlay-black-8 py-0.5 px-2 rounded text-xs font-bold"
    >
      {date.toLocaleDateString('en-US')}
    </span>

    <span
      title="Time of Session"
      class="bg-overlay-black-8 py-0.5 px-2 rounded text-xs font-bold"
    >
      {date.toLocaleTimeString('en-US', {
        timeStyle: 'short',
      })}
    </span>
  {/if}
</div>
