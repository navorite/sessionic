<script lang="ts">
  import {
    filterOptions,
    finished,
    sessions,
    settings,
    tags
  } from '@/lib/stores';
  import { i18n } from 'webextension-polyfill';

  $: tagsFilter = $settings.tagsFilter;

  $: if (tagsFilter !== '__all__' && finished && !$tags[tagsFilter])
    settings.changeSetting('tagsFilter', '__all__');
</script>

<select
  name="tagsFilter"
  id="tagsFilter"
  class="min-w-[11rem] rounded-md bg-neutral-3 p-1 text-center text-xs"
  bind:value={$filterOptions.tagsFilter}
  on:change={(ev) => {
    settings.changeSetting('tagsFilter', ev.currentTarget.value);
  }}
>
  <option value="__all__"
    >{i18n.getMessage('labelTagsAll')} ({$sessions?.length ?? 0})</option
  >
  {#each Object.keys($tags) as tag}
    <option value={tag}>{tag} ({$tags[tag]})</option>
  {/each}
</select>
