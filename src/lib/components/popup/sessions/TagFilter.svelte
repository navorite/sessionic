<script lang="ts">
  import { sessions, settings, tags } from '@/lib/stores';

  let selectEl: HTMLSelectElement | null;
</script>

<select
  name="tagsFilter"
  id="tagsFilter"
  class="min-w-[11rem] rounded-md bg-neutral-3 p-1 text-center text-xs"
  value={$settings.tagsFilter}
  on:change={(ev) => {
    settings.changeSetting('tagsFilter', ev.currentTarget.value);

    console.log($settings.tagsFilter);
  }}
  bind:this={selectEl}
>
  <option value="__all__">All ({$sessions?.length ?? 0})</option>
  {#each Object.keys($tags) as tag}
    {#if $tags[tag]}
      <option value={tag}>{tag} ({$tags[tag]})</option>
    {/if}
  {/each}
</select>
