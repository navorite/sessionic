<script lang="ts">
  import Switch from './basic/Switch.svelte';
  import Section from './basic/Section.svelte';
  import { sessionsDB } from '@utils/database';
  import settings from '@stores/settings';

  async function handleExport() {
    const date = new Date();

    const sessions = await sessionsDB.loadSessions();

    const fileName = `[${__EXT_NAME__}]${
      sessions.length ?? 0
    }_session-${date.toLocaleDateString([], {
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
    checked={$settings.popupView}
    on:change={() => {
      settings.changeSetting('popupView', !$settings.popupView);
    }}>Popup view</Switch
  >
  <Switch
    id="darkmode"
    checked={$settings.darkMode}
    on:change={() => settings.changeSetting('darkMode', !$settings.darkMode)}
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

<Section title="Extension Actions">
  <button
    type="button"
    class="bg-error hover:bg-error-focus text-white py-2 px-4 rounded-md max-w-fit"
    on:click={settings.clear}
  >
    Reset All Settings
  </button>

  <!-- TODO: <Switch id="lazyload" checked={$darkMode} on:change={darkMode.switch}
    >Automatically save current session</Switch
  >
  <Switch id="lazyload" checked={$darkMode} on:change={darkMode.switch}
    >Ask for session name before saving</Switch
  >
  <Switch id="lazyload" checked={$darkMode} on:change={darkMode.switch}
    >Hide Sessionic tabs</Switch
  > -->
</Section>

<!-- TODO: <Section title="Browser Actions">
  <Switch id="lazyload" checked={$darkMode} on:change={darkMode.switch}
    >Lazy load tabs</Switch
  >
  <Switch id="lazyload" checked={$darkMode} on:change={darkMode.switch}
    >Restore Window position</Switch
  >
</Section> -->
