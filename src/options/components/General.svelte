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
    const file = (event.target as HTMLInputElement).files![0]!;

    const fileReader = new FileReader();

    fileReader.onloadend = (ev) => {
      const sessions = JSON.parse(ev.target!.result as string) as ESession[];

      sessionsDB.saveSessions(sessions);
    };

    fileReader.readAsText(file);
  }
</script>

<Section title="User Interface">
  <Switch
    title="Popup View"
    checked={$settings.popupView}
    on:change={() => {
      settings.changeSetting('popupView', !$settings.popupView);
    }}
  />

  <Switch
    title="Dark Mode"
    checked={$settings.darkMode}
    on:change={() => settings.changeSetting('darkMode', !$settings.darkMode)}
  />
</Section>

<Section title="Extension Actions">
  <Switch
    title="Lazy load tabs"
    description="Greatly reduce memory usage by not loading tab until selected"
    checked={$settings.discarded}
    on:change={() => settings.changeSetting('discarded', !$settings.discarded)}
  />
  <button
    type="button"
    class="bg-error hover:bg-error-focus text-white py-2 px-4 rounded-md max-w-fit"
    on:click={settings.clear}
  >
    Reset All Settings
  </button>
</Section>

<Section title="Session Actions">
  <div class="flex gap-2">
    <label
      class="bg-neutral-4 p-2 max-w-max rounded-md hover:bg-neutral-5 cursor-pointer"
    >
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
