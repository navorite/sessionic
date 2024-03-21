<script lang="ts">
  import { Modal } from '@/lib/components';
  import { createEventDispatcher, tick } from 'svelte';
  import { i18n } from 'webextension-polyfill';

  export let type: 'Save' | 'Rename';

  export let value = '';

  export let minlength = 1;
  export let maxlength = 120;

  let disabled = true;
  let errMsg = '';

  export let open = false;

  $: if (value?.length < minlength || value?.length > maxlength) {
    disabled = true;
    errMsg = i18n.getMessage('inputModalErrorLength', [
      minlength.toString(),
      maxlength.toString()
    ]);
  } else if (/[<>]/.test(value)) {
    disabled = true;
    errMsg = i18n.getMessage('inputModalErrorChar');
  } else disabled = false;

  let inputEl: HTMLInputElement;

  $: if (open) {
    tick().then(() => {
      inputEl?.focus();
    });
  } else {
    value = '';
  }

  const dispatch = createEventDispatcher<{ inputSubmit: string }>();

  async function submit() {
    dispatch('inputSubmit', value);

    value = '';
  }
</script>

<Modal bind:open height="12rem">
  <svelte:fragment slot="header"
    >{i18n.getMessage(
      type === 'Save' ? 'saveModalTitle' : 'renameModalTitle'
    )}</svelte:fragment
  >
  <svelte:fragment slot="content">
    <input
      bind:this={inputEl}
      class="w-[24rem] rounded-md border-2 border-solid border-neutral-4 bg-transparent px-2 py-1 font-semibold outline-none placeholder:font-normal placeholder:text-gray-200"
      type="text"
      name={type}
      id={type}
      placeholder={i18n.getMessage('inputModalPlaceholder')}
      title="Session name"
      spellcheck={false}
      {minlength}
      {maxlength}
      bind:value
    />

    {#if disabled}
      <p
        class="mx-auto w-max rounded-md bg-error p-1 px-2 text-sm font-semibold"
      >
        {errMsg}
      </p>
    {/if}
  </svelte:fragment>

  <button
    {disabled}
    title="{type} session"
    slot="footer"
    type="button"
    class="{type === 'Rename'
      ? 'px-4'
      : 'px-6'} rounded-md bg-primary py-1 text-center font-medium text-white hover:bg-primary-focus disabled:cursor-not-allowed disabled:bg-neutral-2 disabled:text-neutral-6"
    on:click={submit}>{i18n.getMessage(`label${type}`)}</button
  >
</Modal>
