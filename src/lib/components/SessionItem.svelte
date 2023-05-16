<script lang="ts">
  import IconButton from './IconButton.svelte';
  import type { Session } from '../types/extension';
  import { removeSession } from '@utils/actions';

  export let session: Session;
  export let selected: boolean = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  class="w-full px-2 py-1 mb-2 rounded-md group/w bg-neutral-3 {selected
    ? 'bg-primary-5'
    : 'hover:bg-primary-4'}"
  tabindex="0"
  on:click
>
  <div class="flex items-center w-full gap-2 mb-1">
    <IconButton
      icon="session"
      title="Session: {session?.title}"
      class="text-2xl"
    />

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      title="Open Session"
      class="w-max overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer hover:underline"
      on:click={() => {}}
    >
      {session?.title}
    </span>

    <IconButton
      icon="delete"
      title="Remove this window from session"
      class="invisible ml-auto text-2xl hover:text-warning-pure-1 group-hover/w:visible"
      on:click={() => removeSession(session.id)}
    />
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
  <span
    title="Date of Session"
    class="bg-overlay-black-8 py-0.5 px-2 rounded text-xs font-bold"
  >
    {session?.dateSaved?.toLocaleDateString('en-US')}
  </span>
  <span
    title="Time of Session"
    class="bg-overlay-black-8 py-0.5 px-2 rounded text-xs font-bold"
  >
    {session?.dateSaved?.toLocaleTimeString('en-US', { timeStyle: 'short' })}
  </span>
</div>
