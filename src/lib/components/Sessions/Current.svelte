<script lang="ts">
  import IconButton from '../IconButton.svelte';
  import type { Session } from '../../types/extension';
  import { createEventDispatcher } from 'svelte';

  export let session: Session;
  export let selected = true;

  const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="session-container {selected ? '!bg-primary-5' : ''}" on:click>
  <div class="session-info">
    <p title="Current Session" class="session-name">
      {session?.title}
    </p>

    <IconButton
      icon="save"
      title="Save session"
      class="ml-auto text-2xl hover:text-primary-9"
      on:click={() => {
        dispatch('saveModal');
      }}
    />
  </div>

  <p title="Session Details" class="session-card">
    {session?.windows.length} Window{session?.windows.length > 1 ? 's' : ''} - {session?.tabsNumber}
    Tab{session?.tabsNumber > 1 ? 's' : ''}
  </p>
</div>
