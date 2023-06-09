<script lang="ts">
  import IconButton from '../IconButton.svelte';
  import type { Session } from '../../types/extension';
  import { sessions } from '@stores/sessions';
  import ListItem from '@components/basic/List/ListItem.svelte';
  import { openSession } from '@utils/browser';
  import { filterOptions } from '@stores/settings';
  import { markResult } from '@utils/markResult';
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

  function handleChange(event) {
    const name = (event?.currentTarget as HTMLInputElement)?.textContent;
    if (name.length < 20) session.title = name;

    event.currentTarget.contentEditable = 'false';
  }

  $: title = $filterOptions.query.trim()
    ? markResult(session?.title, $filterOptions.query, false)
    : session?.title;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<ListItem
  let:hover
  class="session-container {selected ? '!bg-primary-5' : ''}"
  on:click
>
  <div class="item-info">
    <div
      title="Open Session"
      class="item-input"
      on:click={(event) => {
        openSession(session);
        event.currentTarget.contentEditable = 'true';

        //TODO: make it so that it resets after a timeout
        // setTimeout(() => {
        //   console.log('hey');
        //   if (document.activeElement !== event.currentTarget)
        //     event.currentTarget.contentEditable = 'false';
        // }, 200);
      }}
      spellcheck={false}
      on:blur={handleChange}
    >
      {@html title}
    </div>

    {#if hover}
      <IconButton
        icon="delete"
        title="Delete session"
        class="ml-auto text-2xl text-red-500 hover:text-red-800"
        on:click={() => sessions.remove(session)}
      />
    {/if}
  </div>

  <p title="Session Details" class="item-card backdrop-blur-md">
    {session?.windows?.length} Window{session?.windows.length > 1 ? 's' : ''} - {session?.tabsNumber}
    Tab{session?.tabsNumber > 1 ? 's' : ''}
    {#if session?.dateSaved}
      -
      {@const date = new Date(session.dateSaved)}
      {date.toLocaleString([], { timeStyle: 'short', dateStyle: 'short' })}
    {/if}
  </p>
</ListItem>

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
