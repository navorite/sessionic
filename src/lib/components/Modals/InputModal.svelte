<script lang="ts">
  import Modal from '@components/basic/Modal.svelte';
  import { createEventDispatcher } from 'svelte';
  import { tick } from 'svelte';

  export let type: 'Save' | 'Rename';

  export let value = '';

  export let minlength = 3;
  export let maxlength = 40;

  let isSubmit = false;
  let disabled = true;
  let errMsg = '';

  export let open = false;

  $: if (value?.length < minlength || value?.length > maxlength) {
    disabled = true;
    errMsg = `Session name must be between ${minlength} and ${maxlength} characters.`;
  } else if (/[<>]/.test(value)) {
    disabled = true;
    errMsg = "Session name must not contain '<' or '>' characters.";
  } else disabled = false;

  let inputEl: HTMLInputElement;

  $: if (open)
    tick().then(() => {
      isSubmit = false;
      inputEl?.focus();
    });

  const dispatch = createEventDispatcher<{ inputSubmit: string }>();

  async function submit() {
    dispatch('inputSubmit', value);

    isSubmit = true;
    value = '';
  }
</script>

<Modal bind:open height="12rem">
  <svelte:fragment slot="header">{type} session</svelte:fragment>
  <svelte:fragment slot="content">
    <input
      bind:this={inputEl}
      class="bg-transparent outline-none font-semibold border-2 border-solid border-neutral-4 rounded-md py-1 px-2 w-[24rem] placeholder:text-gray-200 placeholder:font-normal"
      type="text"
      name={type}
      id={type}
      placeholder="Enter session name..."
      title="Session name"
      spellcheck={false}
      {minlength}
      {maxlength}
      bind:value
      on:keydown={(event) => {
        event.key === 'Enter' && submit();
      }}
    />

    {#if disabled && !isSubmit}
      <p
        class="font-semibold rounded-md p-1 px-2 text-sm w-max mx-auto bg-error"
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
      : 'px-6'} py-1 text-center text-neutral-1 bg-primary rounded-md hover:bg-primary-focus disabled:bg-neutral-2 disabled:text-neutral-content-disabled disabled:cursor-not-allowed"
    on:click={submit}>{type}</button
  >
</Modal>
