<script lang="ts">
  import IconButton from './IconButton.svelte';
  import type { Session } from '../types/extension';
  //import { removeSession } from '@utils/actions';

  export let session: Session;
</script>

<div class="w-full px-2 py-1 my-1 rounded-md group/w hover:bg-zinc-600">
  <div class="flex items-center w-full gap-2 mb-1">
    <IconButton
      icon="session"
      title="Session: {session?.title}"
      class="text-2xl"
    />

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      title="Open Session"
      class="w-[90%] overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer hover:underline"
      on:click={() => {}}
    >
      {session?.title}
    </span>

    <IconButton
      icon="delete"
      title="Remove this window from session"
      class="invisible ml-auto text-2xl hover:text-red-600 group-hover/w:visible"
      on:click
    />
  </div>
  <span
    title="Number of Windows"
    class="bg-zinc-700 py-0.5 px-2 rounded text-xs font-bold"
  >
    <!-- {session?.windowsObj?.length} Window{session?.windowsObj?.length > 1
      ? 's'
      : ''}
  </span>
  <span
    title="Number of Tabs"
    class="bg-zinc-700 py-0.5 px-2 rounded text-xs font-bold"
  >
    {session?.tabsNumber} Tab{session?.tabsNumber > 1 ? 's' : ''}
  </span>
  <span
    title="Date of Session"
    class="bg-zinc-700 py-0.5 px-2 rounded text-xs font-bold"
  >
    {session?.dateOfSave?.toLocaleDateString('en-US')}
  </span>
  <span
    title="Time of Session"
    class="bg-zinc-700 py-0.5 px-2 rounded text-xs font-bold"
  >
    {session?.dateOfSave?.toLocaleTimeString('en-US', { timeStyle: 'short' })}
  </span> -->
  </span>
</div>
