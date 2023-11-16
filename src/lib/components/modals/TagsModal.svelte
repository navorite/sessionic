<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Modal, ColorInput, Tag } from '@/lib/components';
  import { getStorageItem } from '@/lib/utils';
  import { settings } from '@/lib/stores';
  import { i18n } from 'webextension-polyfill';

  export let open = false;

  let tags: Record<string, { bgColor: string; textColor: string }>;

  let selectVal = 'createANewTag';

  const defualtNewTag = { name: '', bgColor: 'royalblue', textColor: 'white' };

  let tag = defualtNewTag;

  $: selectVal === 'createANewTag'
    ? defualtNewTag
    : (tag = {
        name: selectVal,
        bgColor: $settings.tags[selectVal]?.bgColor ?? 'royalblue',
        textColor: $settings.tags[selectVal]?.textColor ?? 'white'
      });

  $: if (open) {
    getStorageItem('tags', {}).then((value) => {
      tags = value;
    });
  } else {
    tag = defualtNewTag
  }

  const dispatch = createEventDispatcher<{ tagSubmit: string }>();
</script>

<Modal bind:open height="full">
  <svelte:fragment slot="header"
    >{i18n.getMessage('labelAddTag')}</svelte:fragment
  >
  <svelte:fragment slot="content">
    <form
      class="flex h-full w-full flex-col justify-around gap-2"
      on:submit|preventDefault={() => {
        if (selectVal === 'createANewTag') {
          const tags = $settings.tags;
          tags[tag.name] = {
            bgColor: tag.bgColor,
            textColor: tag.textColor
          };

          settings.changeSetting('tags', tags);

          dispatch('tagSubmit', tag.name);
        } else dispatch('tagSubmit', selectVal);

        open = false;
      }}
    >
      <label class="flex items-center gap-2">
        {i18n.getMessage('tagsModalSelectTag')}:
        <select
          name="tags"
          id="tags"
          class="flex-1 rounded-md border-2 border-neutral-4 bg-transparent p-1 outline-none"
          bind:value={selectVal}
        >
          <option
            value={'createANewTag'}
            class="bg-neutral-6 text-neutral-content"
            >{i18n.getMessage('labelAddTag')}</option
          >
          {#if tags}
            {#each Object.keys(tags) as tag}
              <option
                style:background-color={tags[tag]?.bgColor}
                style:color={tags[tag]?.textColor}
                value={tag}>{tag}</option
              >
            {/each}
          {/if}
        </select>
      </label>

      {#if selectVal === 'createANewTag'}
        <div class="flex flex-col gap-2">
          <label>
            {i18n.getMessage('labelSortName')}:
            <input
              type="text"
              minlength="1"
              maxlength="15"
              placeholder={i18n.getMessage('NewTagInputPlaceholder')}
              class="rounded-md border-2 border-neutral-4 bg-transparent px-2 py-1 outline-none"
              value={tag.name}
              on:input={(event) => {
                const value = event.currentTarget.value;

                if (value.length > 15)
                  return (event.currentTarget.value = tag.name);

                tag.name = value;
              }}
            /></label
          >
          <ColorInput bind:color={tag.bgColor}
            >{i18n.getMessage('settingsTagsBackground')}:</ColorInput
          >
          <ColorInput bind:color={tag.textColor}
            >{i18n.getMessage('settingsTagsText')}:</ColorInput
          >
        </div>
      {/if}

      <span class="flex gap-2">
        {i18n.getMessage('settingsTagsPreview')}:
        <Tag
          bind:name={tag.name}
          bind:bgColor={tag.bgColor}
          bind:textColor={tag.textColor}
        />
      </span>

      <button
        class="rounded-md bg-primary px-2 py-1 hover:bg-primary-focus disabled:bg-neutral-3/50 disabled:text-neutral-content/50"
        disabled={!tag.name.length}>{i18n.getMessage('labelAddTag')}</button
      >
    </form>
  </svelte:fragment>
</Modal>
