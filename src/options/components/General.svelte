<script lang="ts">
  import darkMode from '@stores/theme';
  import Switch from './basic/Switch.svelte';
  import Section from './basic/Section.svelte';
  import { sendMessage } from '@utils/messages';
  import { sessionsDB } from '@utils/database';

  export let isPopupEnabled: boolean;

  async function handleExport() {
    const date = new Date();

    const sessions = await sessionsDB.loadSessions();

    const fileName = `tabify-${date.toLocaleDateString([], {
      dateStyle: 'short',
    })}-${date.toLocaleTimeString([], {
      timeStyle: 'short',
    })}.json`;

    const blob = new Blob([JSON.stringify(sessions)]);

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a') as HTMLAnchorElement;

    anchor.style.display = 'none';

    anchor.href = url;
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();

    URL.revokeObjectURL(url);

    anchor.remove();
  }

  async function handleImport(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    const fileReader = new FileReader();

    fileReader.onloadend = (ev) => {
      const sessions = JSON.parse(ev.target.result as string) as ESession[];

      sessionsDB.saveSessions(sessions);
    };

    fileReader.readAsText(file);
  }
</script>

<h1 class="text-xl">General</h1>

<Section title="User Interface">
  <Switch
    id="popup"
    bind:checked={isPopupEnabled}
    on:change={() => {
      sendMessage({ message: 'setPopupEnabled', isPopupEnabled });
    }}>Popup view</Switch
  >
  <Switch id="darkmode" checked={$darkMode} on:change={darkMode.switch}
    >Dark Mode</Switch
  >
</Section>

<Section title="Session Actions">
  <div class="flex gap-2">
    <label class="bg-neutral-4 p-2 max-w-max rounded-md hover:bg-neutral-5">
      Import Sessions
      <input
        type="file"
        class="hidden"
        on:change={handleImport}
        accept=".json"
      />
    </label>

    <button
      class="bg-neutral-4 p-2 max-w-max rounded-md hover:bg-neutral-5"
      on:click={handleExport}>Export Sessions</button
    >
  </div>
</Section>

<!-- TODO: <Section title="Browser Actions">
  <Switch id="lazyload" checked={$darkMode} on:change={darkMode.switch}
    >Lazy load tabs</Switch
  >
  <Switch id="lazyload" checked={$darkMode} on:change={darkMode.switch}
    >Restore Window position</Switch
  >
</Section>

<Section title="Extension Actions">
  <Switch id="lazyload" checked={$darkMode} on:change={darkMode.switch}
    >Automatically save current session</Switch
  >
  <Switch id="lazyload" checked={$darkMode} on:change={darkMode.switch}
    >Ask for session name before saving</Switch
  >
  <Switch id="lazyload" checked={$darkMode} on:change={darkMode.switch}
    >Hide Tabify tabs</Switch
  >
</Section> -->
