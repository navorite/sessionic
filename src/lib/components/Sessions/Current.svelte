<script lang="ts">
  import IconButton from '../IconButton.svelte';
  import type { Session } from '../../types/extension';
  import { sessions } from '@stores/sessions';

  export let session: Session;
  export let selected = true;

  function handleChange(event) {
    session.title = (event?.currentTarget as HTMLInputElement)?.textContent;
    event.currentTarget.contentEditable = 'false';
  }

  async function handleSave() {
    if (session.title === '') return;

    const date = new Date().getTime();

    await sessions.add({
      ...session,
      title: session.title,
      dateSaved: date,
      dateModified: date,
      id: crypto.randomUUID(),
    });
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="session-container {selected ? '!bg-primary-5' : ''}" on:click>
  <div class="item-info">
    <div
      title="Current Session"
      class="item-input"
      on:click={(event) => (event.currentTarget.contentEditable = 'true')}
      spellcheck={false}
      on:blur={handleChange}
    >
      {session?.title}
    </div>

    <IconButton
      icon="save"
      title="Save session"
      class="ml-auto text-2xl hover:text-primary-pure-1"
      on:click={handleSave}
    />
  </div>

  <p title="Session Details" class="item-card">
    {session?.windows.length} Window{session?.windows.length > 1 ? 's' : ''} - {session?.tabsNumber}
    Tab{session?.tabsNumber > 1 ? 's' : ''}
  </p>
</div>

<style>
  .item-info {
    @apply flex items-center w-full gap-2 mb-1;
  }

  .item-input {
    @apply w-max max-w-[60%] p-1 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer;
  }

  .item-input:hover {
    @apply underline;
  }

  .item-card {
    @apply max-w-max bg-overlay-black-8 p-2 rounded text-xs font-bold m-0.5;
  }
</style>
