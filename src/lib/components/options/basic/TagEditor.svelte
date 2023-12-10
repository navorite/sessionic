<script lang="ts">
  import { settings } from '@/lib/stores';
  import { ColorInput, IconButton, Tag } from '@/lib/components';
  import { i18n } from 'webextension-polyfill';

  $: tags = $settings.tags;

  let addedTag = { name: '', bgColor: 'royalblue', textColor: 'white' };

  function onInput(
    ev: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    },
    tagName: keyof typeof tags
  ) {
    const value = ev.currentTarget.value;

    if (value.length < 1 || value.length > 15)
      return (ev.currentTarget.value = tags[tagName]!.name!);

    tags[tagName]!.name = value;
  }

  function onChange(
    ev: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    },
    tagName: keyof typeof tags
  ) {
    const value = ev.currentTarget.value;

    tags[value] = tags[tagName]!;

    delete tags[tagName];

    settings.changeSetting('tags', tags);
  }
</script>

<table class="w-full table-fixed rounded-md">
  <thead>
    <tr class="border-b border-b-neutral-4/50 text-neutral-content/50">
      <td>{i18n.getMessage('settingsTagsTag')}</td>
      <td>{i18n.getMessage('settingsTagsBackground')}</td>
      <td>{i18n.getMessage('settingsTagsText')}</td>
      <td>{i18n.getMessage('settingsTagsPreview')}</td>
      <td class="flex items-center gap-2"
        >{i18n.getMessage('settingsTagsAction')}</td
      >
    </tr>
  </thead>
  <tbody>
    {#each Object.keys(tags) as tagName}
      <tr
        class="rounded-md border-b border-b-neutral-4/50 last:border-b-0 hover:bg-neutral-3"
      >
        <td class="flex items-center gap-2">
          <input
            type="text"
            value={tagName}
            minlength="1"
            maxlength="12"
            on:input={(ev) => onInput(ev, tagName)}
            on:change={(ev) => onChange(ev, tagName)}
            class="flex w-10 flex-1 rounded-md bg-neutral-4 p-1 text-center"
          />
        </td>
        <td>
          <ColorInput
            bind:color={tags[tagName].bgColor}
            on:change={() => settings.changeSetting('tags', tags)}
          />
        </td>
        <td>
          <ColorInput
            bind:color={tags[tagName].textColor}
            on:change={() => settings.changeSetting('tags', tags)}
          />
        </td>
        <td>
          <Tag
            name={tags[tagName].name || tagName}
            bgColor={tags[tagName]?.bgColor}
            textColor={tags[tagName]?.textColor}
          />
        </td>
        <td>
          <IconButton
            icon="delete"
            class="text-2xl text-error hover:text-error-focus"
            title="Delete tag"
            on:click={() => {
              delete tags[tagName];

              settings.changeSetting('tags', tags);
            }}
          />
        </td>
      </tr>
    {/each}

    <tr
      class="rounded-md border-b border-b-neutral-4/50 last:border-b-0 hover:bg-neutral-3"
    >
      <td class="flex items-center gap-2">
        <input
          type="text"
          bind:value={addedTag.name}
          minlength="1"
          maxlength="12"
          class="flex w-10 flex-1 rounded-md bg-neutral-4 p-1 text-center"
        />
      </td>
      <td>
        <ColorInput
          bind:color={addedTag.bgColor}
          on:change={() => settings.changeSetting('tags', tags)}
        />
      </td>
      <td>
        <ColorInput
          bind:color={addedTag.textColor}
          on:change={() => settings.changeSetting('tags', tags)}
        />
      </td>
      <td>
        <Tag
          name={addedTag.name ?? ''}
          bgColor={addedTag.bgColor}
          textColor={addedTag.textColor}
        />
      </td>
      <td>
        <button
          class="max-w-max rounded-md bg-primary px-2 py-1 text-white hover:bg-primary-focus"
          on:click={() => {
            if (addedTag.name.length < 1 || addedTag.name.length > 15) return;

            tags[addedTag.name] = {
              bgColor: addedTag.bgColor,
              textColor: addedTag.textColor
            };

            settings.changeSetting('tags', tags);

            addedTag = { name: '', bgColor: 'royalblue', textColor: 'white' };
          }}>{i18n.getMessage('labelAddTag')}</button
        >
      </td>
    </tr>
  </tbody>
</table>

<style>
  td {
    padding: theme('padding.2');
  }
</style>
