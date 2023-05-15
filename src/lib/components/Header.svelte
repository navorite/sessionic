<script lang="ts">
  import IconButton from '@components/IconButton.svelte';
  import InputBar from '@components/InputBar.svelte';
  import { currentSession, sessionList } from '@stores/session';
  import { dark } from '@stores/settings';
  //import { saveSession } from '@utils/actions';
  import { getAllWindows } from '@utils/browser';
  import { openOptions, openPopup } from '@utils/extension';

  let searchValue = '';
  let saveValue = '';

  async function handleSave() {
    if (saveValue === '') return;

    /*$currentSession = {
      title: '',
      windowsObj: undefined,
      tabsNumber: 0,
      dateOfSave: new Date(),
    };

    $currentSession.windowsObj = await getAllWindows();
    $currentSession.title = saveValue;

    await saveSession($currentSession);

    $sessionList.push($currentSession);
    $sessionList = $sessionList;*/
  }
</script>

<div class="flex items-center w-full h-8">
  <h1>Tabify</h1>
  <div class="flex items-center justify-end w-full h-full gap-2">
    <InputBar
      icon="search"
      title="Search for session or tab"
      placeholder="Session or Tab name..."
      bind:value={searchValue}
    />

    <InputBar
      icon="save"
      title="Save current session"
      bind:value={saveValue}
      placeholder="Session name"
      on:click={handleSave}
    />

    <IconButton
      icon="open"
      class="text-2xl hover:text-icon"
      title="View extension in a new tab"
      on:click={openPopup}
    />

    <IconButton
      icon={$dark ? 'light' : 'dark'}
      class="text-2xl hover:text-icon"
      title="Switch to {dark ? 'light' : 'dark'} mode"
      on:click={() => {
        $dark = !$dark;
      }}
    />

    <IconButton
      icon="options"
      class="text-2xl hover:text-icon"
      title="Open extension Options in a new tab"
      on:click={openOptions}
    />
  </div>
</div>
