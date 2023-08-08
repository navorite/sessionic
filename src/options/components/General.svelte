<script lang="ts">
  import Switch from './basic/Switch.svelte';
  import Section from './basic/Section.svelte';
  import { sessionsDB } from '@utils/database';
  import settings from '@stores/settings';

  $: urlList =
    $settings.urlFilterList[0] === '<all_urls>'
      ? ''
      : $settings.urlFilterList.join('\n');

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

  function handleFilterListChange(
    ev: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
  ) {
    //TODO: sanitize for duplicates and verify url structure

    const value = ev.currentTarget.value;

    const urls = value.match(
      /(\b(https?|ftp|file)|\B\*):\/{2}(\*|(\*\.)?[^*/\s:]*)\/[^\s]*/g
    ) ?? ['<all_urls>'];

    settings.changeSetting('urlFilterList', urls);

    ev.currentTarget.value = urlList;
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
  <label class="flex flex-col gap-2 font-medium">
    URL Filter List
    <textarea
      name="filter-list"
      id="filter-list"
      rows="7"
      placeholder={'e.g. track only the following URL match patterns:\n*://*/*\nfile:///*/*\nftp://*/*\nchrome://*/*\nhttps://*.google.com/\nhttps://www.youtube.com/*\n'}
      class="bg-neutral-4 p-2 rounded-md placeholder:text-neutral-content/40 text-sm"
      inputmode="url"
      value={urlList}
      on:change={handleFilterListChange}
    />
  </label>

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
