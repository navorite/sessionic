<script lang="ts">
  import ListItem from '@components/basic/ListItem.svelte';
  import IconButton from '../IconButton.svelte';
  import Card from '@components/basic/Card.svelte';
  import { filterOptions } from '@stores/settings';
  import { markResult } from '@utils/markResult';
  import { createEventDispatcher } from 'svelte';
  import sessions from '@stores/sessions';
  import { sendMessage } from '@utils/messages';
  import { tooltip } from '@utils/tooltip';

  export let session: ESession;

  $: selected = sessions.selection;

  const dispatch = createEventDispatcher();

  $: title = $filterOptions?.query.trim()
    ? markResult(session?.title, $filterOptions?.query, {
        case_sensitive: false,
      })
    : session?.title;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<ListItem
  let:hover
  class="session-container {$selected === session
    ? '!bg-neutral-4 !text-neutral-content'
    : ''}"
  on:click={() => {
    selected.select(session);
  }}
>
  <div class="session-info">
    <span
      tabindex="0"
      role="button"
      use:tooltip={{ title: 'Open Session' }}
      aria-label="Open Session"
      class="session-name"
      on:click={() => {
        sendMessage({ message: 'openSession', session });
      }}
    >
      {@html title}
    </span>

    {#if hover}
      <IconButton
        icon="rename"
        title="Rename session"
        class="ml-auto text-2xl hover:text-primary-focus"
        on:click={() => {
          dispatch('renameModal');
        }}
      />

      <IconButton
        icon="delete"
        title="Delete session"
        class="text-2xl hover:text-error-focus"
        on:click={() => dispatch('deleteModal')}
      />
    {/if}
  </div>

  <div class="flex items-center">
    <Card
      title="{session?.windows.length ?? 0} Window{session?.windows.length > 1
        ? 's'
        : ''} and {session?.tabsNumber ?? 0} Tab{session?.tabsNumber > 1
        ? 's'
        : ''}"
    >
      <IconButton icon="window" class="text-base" />
      {session?.windows?.length}

      <IconButton icon="tab" class="text-base ml-2" />
      {session?.tabsNumber}
    </Card>
    {#if session?.dateSaved}
      {@const date = new Date(session.dateSaved)}
      <Card title="Session save date">
        {date.toLocaleDateString([], { dateStyle: 'short' })}
        -
        {date.toLocaleTimeString([], { timeStyle: 'short' })}
      </Card>
    {/if}
  </div>
</ListItem>
