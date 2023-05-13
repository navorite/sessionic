<script lang="ts">
  import IconButton from '@components/IconButton.svelte';
  import InputBar from '@components/InputBar.svelte';
  import { openOptions, openPopup } from '@utils/extension';

  let searchValue = '';
  let saveValue = '';
</script>

<div class="flex items-center w-full h-8 text-slate-200">
  <h1>Tabify</h1>
  <div class="w-full h-full flex justify-end items-center gap-2">
    <InputBar
      icon="search"
      title="Search for session or tab"
      placeholder="Session or Tab name..."
      value={searchValue}
    />
    <InputBar
      icon="save"
      title="Save current session"
      value={saveValue}
      placeholder="Session name"
    />
    <IconButton
      icon="open"
      class="text-2xl hover:text-sky-400"
      title="View extension in a new tab"
      on:click={openPopup}
    />
    <IconButton
      icon="options"
      class="text-2xl hover:text-sky-400"
      title="Open extension Options in a new tab"
      on:click={openOptions}
    />
  </div>
</div>
