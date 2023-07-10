<script lang="ts">
  import darkMode from '@stores/theme';
  import Switch from './basic/Switch.svelte';
  import Section from './basic/Section.svelte';
  import { sendMessage } from '@utils/messages';

  export let isPopupEnabled;
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

<Section title="Browser Actions">
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
</Section>
