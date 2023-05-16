<script lang="ts">
  import IconButton from '@components/IconButton.svelte';
  import SearchBar from '@components/SearchBar.svelte';

  import { dark } from '@stores/settings';
  import { openOptions, openPopup } from '@utils/extension';

  let searchValue = '';
</script>

<div class="flex items-center w-full h-8">
  <h1>Tabify</h1>
  <div class="flex items-center justify-end w-full h-full gap-2">
    <SearchBar bind:value={searchValue} />

    <IconButton
      icon="open"
      class="text-2xl hover:text-primary-pure-1"
      title="View extension in a new tab"
      on:click={openPopup}
    />

    <IconButton
      icon={$dark ? 'light' : 'dark'}
      class="text-2xl hover:text-primary-pure-1"
      title="Switch to {dark ? 'light' : 'dark'} mode"
      on:click={() => {
        $dark = !$dark;
      }}
    />

    <IconButton
      icon="options"
      class="text-2xl hover:text-primary-pure-1"
      title="Open extension Options in a new tab"
      on:click={openOptions}
    />
  </div>
</div>
