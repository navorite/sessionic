<script lang="ts">
  import IconButton from '../IconButton.svelte';
  import type { Session } from '../../types/extension';
  import ListItem from '@components/basic/ListItem.svelte';
  import { openSession } from '@utils/browser';
  import { filterOptions } from '@stores/settings';
  import { markResult } from '@utils/markResult';
  import { createEventDispatcher } from 'svelte';
  //import { afterUpdate } from 'svelte';

  // import { beforeUpdate } from 'svelte/internal';

  // // TODO: optimize updates
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
  export let selected = false;

  const dispatch = createEventDispatcher();

  $: title = $filterOptions.query.trim()
    ? markResult(session?.title, $filterOptions.query, false, false)
    : session?.title;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<ListItem
  let:hover
  class="session-container {selected ? '!bg-primary-5' : ''}"
  on:click
>
  <div class="session-info">
    <span
      title="Open Session"
      class="session-name"
      on:click={() => {
        openSession(session);
      }}
    >
      {@html title}
    </span>

    {#if hover}
      <IconButton
        icon="options"
        title="Rename session"
        class="ml-auto text-2xl hover:text-primary-9"
        on:click={() => {
          dispatch('renameModal');
        }}
      />

      <IconButton
        icon="delete"
        title="Delete session"
        class="text-2xl text-red-500 hover:text-red-800"
        on:click={() => dispatch('deleteModal')}
      />
    {/if}
  </div>

  <p title="Session Details" class="session-card">
    {session?.windows?.length} Window{session?.windows.length > 1 ? 's' : ''} - {session?.tabsNumber}
    Tab{session?.tabsNumber > 1 ? 's' : ''}
    {#if session?.dateSaved}
      -
      {@const date = new Date(session.dateSaved)}
      {date.toLocaleString([], { timeStyle: 'short', dateStyle: 'short' })}
    {/if}
  </p>
</ListItem>
