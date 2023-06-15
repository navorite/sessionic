<script lang="ts">
  import sessions from '@stores/sessions';
  import Modal from './Modal.svelte';
  import { selectedSession } from '@components/Sessions/Sessions.svelte';
  import { currentSession } from '@components/Sessions/Current.svelte';
  //export { className as class };
  //let className = '';

  export let open = false;

  const commands = [
    {
      title: 'Save current session',
      action: async () =>
        selectedSession.select(await sessions.add($currentSession)),
    },
    {
      title: 'Delete selected session',
      action: () =>
        $selectedSession !== $currentSession &&
        sessions.remove($selectedSession),
    },
    { title: 'Delete all sessions', action: sessions.removeAll },
  ];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<Modal bind:open>
  <ul slot="content" class="flex flex-col gap-2 font-semibold">
    {#each commands as command}
      <li
        class="py-2 px-4 rounded-md cursor-pointer hover:bg-primary-5"
        on:click={() => {
          command.action();
          open = false;
        }}
      >
        {command.title}
      </li>
    {/each}
  </ul>
</Modal>
